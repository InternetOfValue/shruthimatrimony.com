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

const story=document.querySelector('#story');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const count=scenes.length;
// Every scene is in the document. Native scrolling owns navigation and momentum.
story.innerHTML=scenes.map((s,i)=>`<section class="scene ${s.id==='lineage'?'lineage':''}" id="${s.id}" aria-labelledby="title-${s.id}">
 <div class="scene-frame">
  <div class="scene-copy"><span class="eyebrow">${s.k}</span><${i===0?'h1':'h2'} id="title-${s.id}">${s.t}</${i===0?'h1':'h2'}><p class="scene-description">${s.p}</p>
  ${i===count-1?'<a class="signup-link" href="#signup">Sign up for Become Worth <span aria-hidden="true">↗</span></a>':''}
  ${s.n?`<p class="scene-note">${s.n}</p>`:''}</div>
  <figure class="scene-art"><img src="/assets/${s.im}.webp" alt="${s.alt}" ${i<2?'fetchpriority="high"':'loading="lazy"'} decoding="async" width="1440" height="960"><figcaption>${s.id==='lineage'?'TWO LEGACIES / HER OWN FIRE':s.cap}</figcaption></figure>
  ${i===0?'<p class="scroll-invitation">Scroll to begin <span aria-hidden="true">↓</span></p>':''}
 </div></section>`).join('');
const revealTargets=[...document.querySelectorAll('.scene,.signup')];
// Native page scroll remains in control; the observer only reveals arriving content.
const observer=new IntersectionObserver(entries=>{
 for(const entry of entries){
  entry.target.classList.toggle('is-visible',entry.isIntersecting);
 }
},{threshold:.12,rootMargin:'0px 0px -8% 0px'});
revealTargets.forEach(el=>observer.observe(el));
revealTargets[0].classList.add('is-visible');
document.documentElement.classList.add('motion-ready');
const lineage=document.querySelector('#lineage');
lineage.querySelector('.scene-copy').innerHTML=`<div class="lineage-beats">
 <div class="lineage-beat"><span class="eyebrow">SARIKA × KAMAL HAASAN</span><h2 id="title-lineage">Two legacies.<br><em>One thread.</em></h2><p class="scene-description">An inheritance. Not a script.</p></div>
 <div class="lineage-beat"><span class="eyebrow">THE THREADS INTERTWINE</span><h2>Their DNA.<br><em>Her own fire.</em></h2><p class="scene-description">The story is hers to write.</p></div>
 <div class="lineage-beat"><span class="eyebrow">SHRUTI HAASAN</span><h2>An artist.<br><em>Her own original.</em></h2><p class="scene-description">An individual beyond her lineage.</p></div>
 </div><p class="scene-note">Symbolic family lineage. Her individuality is her own.</p>`;
// Keep inactive beat copy out of the accessibility tree as well as off screen.
const beats=[...lineage.querySelectorAll('.lineage-beat')];
let activeBeat=-1,queued=false;
const clamp=x=>Math.max(0,Math.min(1,x));
function paint(){
 queued=false;
 const rect=lineage.getBoundingClientRect();
 const travel=Math.max(1,lineage.offsetHeight-innerHeight);
 const progress=reduced.matches?1:clamp(-rect.top/travel);
 lineage.style.setProperty('--lineage-progress',progress.toFixed(4));
 lineage.style.setProperty('--lineage-solid',(48+progress*54).toFixed(2)+'%');
 lineage.style.setProperty('--lineage-end',(62+progress*50).toFixed(2)+'%');
 lineage.style.setProperty('--lineage-drift',(-progress*18).toFixed(2)+'px');
 const beat=reduced.matches?2:progress<.30?0:progress<.68?1:2;
 if(beat!==activeBeat){beats.forEach((el,i)=>{el.classList.toggle('active',i===beat);el.setAttribute('aria-hidden',String(i!==beat))});activeBeat=beat;}
 for(const scene of revealTargets){
  if(scene===lineage)continue;
  const r=scene.getBoundingClientRect();
  if(r.bottom<0||r.top>innerHeight)continue;
  const position=clamp((innerHeight-r.top)/(innerHeight+r.height));
  scene.style.setProperty('--scene-drift',reduced.matches?'0px':((position-.5)*-36).toFixed(2)+'px');
 }
 const range=document.documentElement.scrollHeight-innerHeight;
 document.querySelector('.reading-progress span').style.transform=`scaleX(${clamp(scrollY/Math.max(1,range))})`;
}
function queue(){if(!queued){queued=true;requestAnimationFrame(paint)}}
addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);reduced.addEventListener('change',queue);paint();
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
