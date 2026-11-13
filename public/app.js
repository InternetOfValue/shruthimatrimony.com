(()=>{
const scenes=[
{id:'invitation',k:'THE MODERN SWAYAMVAR / 90 DAYS',t:'Do you dare<br>to date<br><em>Shruti Haasan?</em>',p:'Three trails. Ninety days. Who could you become?',a:'I dare. Show me the trial. →',im:'invitation',cap:'BECOME WORTH / THE 90-DAY CHALLENGE',n:'Independent fiction. No affiliation, dates or introductions offered.',alt:'Seraphina in red pencil, with one dragon wing and a knowing expression'},
{id:'lineage',k:'SARIKA × KAMAL HAASAN',t:'Two legacies.<br><em>One thread.</em>',p:'Scroll through the inheritance.',a:'Follow the thread ↓',im:'lineage',cap:'SCROLL / SWIPE UP OVER THE DRAWING',n:'Symbolic family lineage. Her individuality is her own.',alt:'Sarika and Kamal Haasan become crimson strands leading to Shruti Haasan'},
{id:'fan',k:'THE PEDESTAL TEST',t:'Being her fan<br><em>won’t qualify you.</em>',p:'Could she become your fan?',a:'For what, exactly? →',im:'fan',cap:'ADMIRATION IS A BEGINNING',n:'',alt:'Bald salt-and-pepper-bearded Moses steps down from a pedestal to pick up a creator’s tools'},
{id:'work',k:'THE WORK TEST',t:'Make something<br><em>worth admiring.</em>',p:'Your biggest work. Your own fire.',a:'So what’s the trial? →',im:'work',cap:'THE MAKER / THE DRAGONESS',n:'',alt:'Bald bearded Moses chisels the dragoness Seraphina in graphite and crimson'},
{id:'bow',k:'SWAYAMVAR / THE WOMAN CHOOSES',t:'Bows. Boulders.<br><em>Different times.</em>',p:'The modern swayamvar asks more.',a:'What does strength mean now? →',im:'bow',cap:'FROM LIFTING STONE TO LIVING YOUR VALUES',n:'Courtship trials reimagined as a fictional allegory.',alt:'A broken ceremonial bow leads to bald bearded Moses lifting a stone in a fictional courtship allegory'},
{id:'strength',k:'THE MODERN TRIAL',t:'Power is easy.<br><em>Can you be tender?</em>',p:'Your biceps cannot apologise for you.',a:'Give me the real challenge. →',im:'strength',cap:'STRENGTH / SENSITIVITY / SELF-COMMAND',n:'',alt:'Bald bearded Moses gently holds a fragile bowl of water before a great wave'},
{id:'gates',k:'BECOME WORTH / THE 90-DAY CHALLENGE',t:'90 days.<br><em>Show your worth.</em>',p:'Monster. Divine. Integration. Live all three.',a:'Open the first gate. →',im:'gates',cap:'HOUSEOFBROS / THREE TRAILS / THIRTY DAYS EACH',n:'A proposed 90-day programme, introduced through HouseOfBros.',alt:'Moses stands before the three doorways of shadow, light and integration'},
{id:'monster',k:'MONTH I / MONSTER',t:'Meet the man<br><em>you hide.</em>',p:'Patterns. Appetites. Excuses. Yours.',a:'And the man I could become? →',im:'monster',cap:'THE FIRST THRESHOLD / NOTICE',n:'',alt:'Bald bearded Moses sees a dragon emerge from his own reflection'},
{id:'divine',k:'MONTH II / DIVINE',t:'Give your values<br><em>a day job.</em>',p:'Care. Honesty. Boundaries. In action.',a:'Bring them together. →',im:'divine',cap:'THE SECOND THRESHOLD / PRACTISE',n:'',alt:'Bald bearded Moses carefully lights a small clay lamp beneath a dragon wing'},
{id:'integration',k:'MONTH III / INTEGRATION',t:'Be that man.<br><em>On a Tuesday.</em>',p:'Live it. Miss. Repair. Repeat.',a:'Who’s asking me to do this? →',im:'integration',cap:'THE THIRD THRESHOLD / LIVE',n:'',alt:'Bald bearded Moses makes morning tea, his shadow integrating a dragon wing'},
{id:'creator',k:'MOSES / THE HUMAN & THE DRAGONESS',t:'I’m building<br><em>my answer.</em>',p:'The Internet of Value. HouseOfBros. Seraphina.',a:'And if I finish? →',im:'creator',cap:'MOSES SAM PAUL JOHNRAJ',n:'',alt:'Moses, bald with his salt-and-pepper beard, at his notebook and dragoness maquette'},
{id:'choice',k:'BECOME WORTH / YOUR MODERN SWAYAMVAR',t:'Become someone<br><em>worth dating.</em>',p:'Strength. Care. Consistency. Show what you can become.',a:'Sign up for Become Worth →',im:'choice',cap:'90 DAYS / MONSTER / DIVINE / INTEGRATION',n:'Build a life a woman you admire could admire too. Her choice remains hers.',alt:'A confident frontal portrait of Seraphina framed by her wings, directly facing the viewer'}
];


const links={iov:'https://theinternetofvalue.org/',bros:'https://houseofbros.theinternetofvalue.org/',identity:'https://theinternetofvalue.org/wellbeing-identity/people/moses-sam-paul-johnraj'};
const story=document.querySelector('#story');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
scenes.find(s=>s.id==='creator').p=`<a href="${links.iov}">The Internet of Value</a>. <a href="${links.bros}">HouseOfBros</a>. Seraphina.`;
scenes.find(s=>s.id==='creator').n=`<a class="identity-link" href="${links.identity}">Explore my public wellbeing identity ↗</a>`;
scenes.find(s=>s.id==='gates').n=`A proposed 90-day programme, introduced through <a href="${links.bros}">HouseOfBros</a>.`;
const modes=['rise','weave','descend','carve','sweep','float','open','reflect','kindle','balance','write','unfold'];
story.innerHTML='<div class="cinema-stage">'+scenes.map((s,i)=>`<section class="scene" id="${s.id}" data-motion="${modes[i]}" aria-labelledby="title-${s.id}">
 <div class="scene-frame">
 <div class="scene-copy"><span class="eyebrow">${s.k}</span><${i===0?'h1':'h2'} id="title-${s.id}">${s.t}</${i===0?'h1':'h2'}><p class="scene-description">${s.p}</p>
 ${i===scenes.length-1?'<a class="signup-link" href="#signup">Sign up for Become Worth <span aria-hidden="true">↗</span></a>':''}
 ${s.n?`<p class="scene-note">${s.n}</p>`:''}</div>
 <figure class="scene-art"><img src="/assets/${s.im}.webp" alt="${s.alt}" ${i===0?'fetchpriority="high"':'fetchpriority="low"'} decoding="async" width="1440" height="960">
 ${i===1?'<svg class="dna-trace" viewBox="0 0 200 340" aria-hidden="true"><path pathLength="1" d="M30 0C220 65-20 105 170 170S-20 275 170 340"/><path pathLength="1" d="M170 0C-20 65 220 105 30 170S220 275 30 340"/></svg><span class="lineage-equation" aria-hidden="true"><span>Sarika</span><b>×</b><span>Kamal Haasan</span><b>=</b><strong>Shruti Haasan</strong></span>':''}
 <figcaption>${i===1?'TWO LEGACIES / HER OWN FIRE':s.cap}</figcaption></figure>
 ${i===0?'<p class="scroll-invitation">Swipe up to begin <span aria-hidden="true">↓</span></p>':''}
 </div></section>`).join('')+'</div>';
const frames=[...story.querySelectorAll('.scene')];
const lineage=document.querySelector('#lineage');
const durations=scenes.map(s=>s.id==='lineage'?1.65:1);
const starts=[];let units=0;for(const duration of durations){starts.push(units);units+=duration;}
const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x)};
let queued=false,lastActive=-1;
function size(){
 const h=document.documentElement.clientHeight;
 story.style.setProperty('--cinema-height',h+'px');
 story.style.height=reduced.matches?'auto':Math.round((units+1)*h)+'px';
 document.documentElement.classList.toggle('cinematic-ready',!reduced.matches);
 queue();
}
function paint(){
 queued=false;
 const h=document.documentElement.clientHeight;
 const top=story.getBoundingClientRect().top+scrollY;
 const cursor=Math.max(0,(scrollY-top)/h);
 let active=0;while(active<frames.length-1&&cursor>=starts[active+1])active++;
 const local=clamp((cursor-starts[active])/durations[active]);
 const mix=active===frames.length-1?0:ease((local-.60)/.40);
 frames.forEach((frame,i)=>{
  const incoming=i===active+1;
  const opacity=reduced.matches?1:i===active?1-mix:incoming?mix:0;
  frame.style.opacity=opacity;
  const phase=clamp((cursor-starts[i])/durations[i]);
  const entrance=incoming?(1-mix):0;
  const exit=i===active?mix:0;
  frame.style.setProperty('--scene-y',((entrance-exit)*20).toFixed(2)+'px');
  frame.style.setProperty('--text-y',((entrance-exit)*12).toFixed(2)+'px');
  const mode=frame.dataset.motion;
  const zoom=mode==='carve'?1.12-phase*.08:mode==='open'?1.14-phase*.12:1.065-phase*.05;
  frame.style.setProperty('--camera-zoom',zoom.toFixed(4));
  const direction=i%2?1:-1;
  const pan=mode==='sweep'?44:mode==='write'?28:20;
  frame.style.setProperty('--camera-x',((phase-.5)*direction*pan).toFixed(2)+'px');
  const vertical=mode==='float'?Math.sin(phase*Math.PI)*-16:mode==='descend'?(phase-.5)*35:(.5-phase)*20;
  frame.style.setProperty('--camera-y',vertical.toFixed(2)+'px');
  frame.style.setProperty('--camera-turn',((phase-.5)*direction*.6).toFixed(3)+'deg');
  const isActive=reduced.matches||i===(mix>.5?active+1:active);
  frame.inert=!isActive;frame.setAttribute('aria-hidden',String(!isActive));
  frame.classList.toggle('is-active',isActive);
 });
 const lp=reduced.matches?1:clamp((cursor-starts[1])/durations[1]);
 lineage.style.setProperty('--lineage-solid',(43+lp*62).toFixed(2)+'%');
 lineage.style.setProperty('--lineage-end',(57+lp*62).toFixed(2)+'%');
 lineage.style.setProperty('--thread-draw',(1-ease(lp/.75)).toFixed(3));
 lineage.style.setProperty('--daughter-opacity',ease((lp-.45)/.3));
 const beat=lp<.26?0:lp<.57?1:2;
 if(beat!==lastActive){
  const titles=['Two legacies.<br><em>One thread.</em>','Their DNA.<br><em>Her own fire.</em>','An artist.<br><em>Her own original.</em>'];
  lineage.querySelector('h2').innerHTML=titles[beat];
  lineage.querySelector('.scene-description').textContent=['An inheritance. Not a script.','The story is hers to write.','An individual beyond her lineage.'][beat];lastActive=beat;
 }
 const range=document.documentElement.scrollHeight-innerHeight;
 document.querySelector('.reading-progress span').style.transform=`scaleX(${clamp(scrollY/Math.max(1,range))})`;
}
function queue(){if(!queued){queued=true;requestAnimationFrame(paint)}}
addEventListener('scroll',queue,{passive:true});addEventListener('resize',size);reduced.addEventListener('change',size);
// Story anchors map to their scroll positions; wheel, touch, and keyboard scrolling stay native.
for(const anchor of document.querySelectorAll('a[href="#invitation"]'))anchor.addEventListener('click',event=>{event.preventDefault();scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'})});
size();paint();
const form=document.querySelector('#ps-signup-form');
const button=document.querySelector('#ps-submit');
const status=document.querySelector('#ps-form-status');
form.addEventListener('submit',async event=>{
 event.preventDefault();if(button.disabled||!form.reportValidity())return;
 button.disabled=true;button.textContent='Registering your interest…';
 try{
  const data=new FormData(form);data.set('form-name','become-worth');
  const response=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(data).toString()});
  if(!response.ok)throw new Error('Submission failed');
  form.hidden=true;document.querySelector('.ps-signup-intro').hidden=true;
  const result=document.querySelector('#ps-signup-result');result.hidden=false;result.tabIndex=-1;result.focus({preventScroll:true});form.reset();
 }catch(error){status.textContent='We couldn’t send your signup. Please try again. Your entries are still here.';button.textContent='Try signing up again →';}
 finally{button.disabled=false;}
});
})();
