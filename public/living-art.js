/* A single small GPU canvas deforms pencil marks locally. No videos, trackers, or image downloads. */
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const supported=new Map([['invitation',0],['choice',1],['divine',2],['bow',3],['lineage',4]]);
 const canvas=document.createElement('canvas');canvas.className='live-drawing';canvas.setAttribute('aria-hidden','true');
 const gl=canvas.getContext('webgl',{alpha:false,antialias:false,depth:false,stencil:false,preserveDrawingBuffer:false,powerPreference:'low-power'});
 let scene=null,phase=0,paused=false,raf=0,last=0,clock=0,ticks=0,owner=null,texture=null;
 const cache=new Map();let program,locations;
 function detach(){if(owner)owner.classList.remove('has-live-drawing');canvas.remove();owner=null;}
 if(!gl){window.LivingArt={setScene(){},setPaused(){}};return;}
 const vertex='attribute vec2 a;varying vec2 uv;void main(){uv=a*.5+.5;gl_Position=vec4(a,0.,1.);}';
 const fragment=`precision mediump float;varying vec2 uv;uniform sampler2D image;uniform float time;uniform float phase;uniform int mode;
 float oval(vec2 p,vec2 center,vec2 radius){return 1.-smoothstep(.55,1.,length((p-center)/radius));}
 void main(){vec2 p=vec2(uv.x,1.-uv.y);vec2 q=p;float t=time;float glow=0.;
 if(mode==0){float w=(1.-smoothstep(.48,.60,p.x))*smoothstep(.015,.09,p.x)*(1.-smoothstep(.55,.68,p.y));float reach=max(0.,.59-p.x);q.x+=sin(t*1.5)*reach*.075*w;q.y+=cos(t*1.5)*reach*.023*w;}
 if(mode==1){float wings=smoothstep(.20,.35,abs(p.x-.5))*(1.-smoothstep(.65,.8,p.y));q.x+=sin(t*1.35)*(p.x-.5)*.055*wings;q.y+=sin(t*1.35+.7)*.012*wings;}
 if(mode==2){float flame=oval(p,vec2(.77,.526),vec2(.027,.078));q.x+=sin(t*11.+p.y*85.)*.006*flame;q.y+=cos(t*8.+p.x*65.)*.008*flame;glow=oval(p,vec2(.77,.56),vec2(.10,.13))*(.025+.018*sin(t*8.3));float wing=oval(p,vec2(.78,.13),vec2(.45,.18));q.y+=sin(t*1.3)*.008*wing;}
 if(mode==3){float rock=oval(p,vec2(.76,.60),vec2(.235,.25));float lift=smoothstep(.14,.64,phase)*.024+sin(t*1.9)*.002;q.y+=lift*rock;float left=oval(p,vec2(.11,.39),vec2(.16,.12));float right=oval(p,vec2(.33,.43),vec2(.12,.12));float release=smoothstep(.08,.35,phase);q.x+=.012*release*(left-right);q.y-=.009*release*left;q.y+=.009*release*right;}
 if(mode==4){float y=smoothstep(.34,.43,p.y)*(1.-smoothstep(.91,1.,p.y));float center=.49+.16*sin((p.y-.36)*11.);float ribbon=1.-smoothstep(.018,.075,abs(p.x-center));float face=oval(p,vec2(.49,.71),vec2(.18,.19));float w=y*ribbon*(1.-face);q.x+=sin(t*1.7+p.y*15.)*.012*w;q.y+=cos(t*1.4+p.y*12.)*.004*w;}
 vec3 color=texture2D(image,vec2(clamp(q.x,.001,.999),1.-clamp(q.y,.001,.999))).rgb;color+=vec3(glow,glow*.37,0.);gl_FragColor=vec4(color,1.);}`;
 function shader(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('Art shader unavailable');return s;}
 try{
  program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Art renderer unavailable');gl.useProgram(program);
  const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const a=gl.getAttribLocation(program,'a');gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);
  locations=Object.fromEntries(['image','time','phase','mode'].map(k=>[k,gl.getUniformLocation(program,k)]));gl.uniform1i(locations.image,0);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
 }catch(error){window.LivingArt={setScene(){},setPaused(){}};return;}
 function prepare(frame){
  const img=frame.querySelector('.scene-art > img');if(!img.complete||!img.naturalWidth)return false;
  const figure=img.parentElement;
  const source=img.currentSrc||img.src;
  if(owner!==figure||canvas.dataset.source!==source){
   detach();owner=figure;figure.appendChild(canvas);
   const sourceWidth=Number((img.currentSrc||img.src).match(/-(\d+)\.webp/)?.[1])||img.naturalWidth;canvas.width=Math.min(960,sourceWidth);canvas.height=Math.round(canvas.width*2/3);canvas.dataset.source=source;gl.viewport(0,0,canvas.width,canvas.height);
  }
  let item=cache.get(source);
  if(!item){
   item=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,item);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);cache.set(source,item);
   if(cache.size>3){const [key,old]=cache.entries().next().value;gl.deleteTexture(old);cache.delete(key);}
  }
  texture=item;return true;
 }
 function weave(frame,t){
  const svg=frame.querySelector('.dna-weave');if(!svg)return;
  const progress=Math.min(1,phase*1.7);const paths=svg.querySelectorAll('path');
  for(let strand=0;strand<2;strand++){
   let d='';for(let i=0;i<=65*progress;i++){
    const v=i/65,sign=strand?1:-1;
    const x=720+sign*((1-v)*300+Math.sin(v*Math.PI)*Math.cos(v*3*Math.PI+t*.75)*150);
    const y=350+v*190;d+=(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1);
   }
   paths[strand].setAttribute('d',d);
  }
 }
 function loop(now){
  raf=0;if(!scene||paused||reduced.matches||document.hidden)return;
  raf=requestAnimationFrame(loop);if(now-last<1000/30)return;
  const elapsed=last?Math.min(.1,(now-last)/1000):0;clock+=elapsed;last=now;
  if(!supported.has(scene.id)||!prepare(scene))return;
  gl.bindTexture(gl.TEXTURE_2D,texture);gl.uniform1f(locations.time,clock);gl.uniform1f(locations.phase,phase);gl.uniform1i(locations.mode,supported.get(scene.id));gl.drawArrays(gl.TRIANGLES,0,6);
  owner.classList.add('has-live-drawing');canvas.dataset.frames=String(++ticks);canvas.dataset.scene=scene.id;
  if(scene.id==='lineage')weave(scene,clock);
 }
 function wake(){if(!raf&&!paused&&!reduced.matches&&!document.hidden&&scene){last=0;raf=requestAnimationFrame(loop);}}
 window.LivingArt={
  available:true,
  setScene(frame,p){phase=p;const next=frame&&supported.has(frame.id)?frame:null;if(scene!==next){detach();scene=next;}if(!next||reduced.matches){if(raf)cancelAnimationFrame(raf);raf=0;detach();return;}wake();},
  setPaused(value){paused=value;if(paused){if(raf)cancelAnimationFrame(raf);raf=0;detach();}else wake();}
 };
 document.addEventListener('visibilitychange',()=>{if(document.hidden){if(raf)cancelAnimationFrame(raf);raf=0;}else wake();});
 canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();scene=null;detach();if(raf)cancelAnimationFrame(raf);raf=0;});
 reduced.addEventListener('change',()=>{if(reduced.matches){if(raf)cancelAnimationFrame(raf);raf=0;detach();}else wake();});
})();
