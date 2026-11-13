import fs from 'node:fs';
const root='https://shruthimatrimony.com/';
const identity='https://theinternetofvalue.org/wellbeing-identity/people/moses-sam-paul-johnraj';
const faq=JSON.parse(fs.readFileSync('content/faq.json','utf8'));
const trails=JSON.parse(fs.readFileSync('content/trails.json','utf8'));
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const shared=[
 {'@type':'Organization','@id':root+'#foundation',name:'Internet of Value Research Foundation',url:'https://theinternetofvalue.org/'},
 {'@type':'Person','@id':root+'#creator',name:'Moses Sam Paul Johnraj',url:identity,sameAs:[identity,'https://www.linkedin.com/in/mosessampaul/']},
 {'@type':'WebSite','@id':root+'#website',url:root,name:'Shruthi Matrimony',alternateName:'ShruthiMatrimony.com',description:'An independent creative story and the proposed Become Worth 90-day journey. No affiliation, dates or introductions offered.',inLanguage:'en',creator:{'@id':root+'#creator'},publisher:{'@id':root+'#foundation'}},
 {'@type':'CreativeWork','@id':root+'#seraphina',name:'Seraphina',genre:'Fantasy',description:'A fictional dragon goddess and mythology created by Moses Sam Paul Johnraj.',creator:{'@id':root+'#creator'}}
];
const faqNode={'@type':'FAQPage','@id':root+'#faq',url:root+'#faq',name:'About Shruthi Matrimony and Become Worth',inLanguage:'en',mainEntity:faq.map(q=>({'@type':'Question','@id':root+'#faq-'+q.slug,name:q.question,acceptedAnswer:{'@type':'Answer',text:q.answer}}))};
for(const file of ['index.html','for-shruti.html']){
 let html=fs.readFileSync('public/'+file,'utf8');
 const home=file==='index.html',url=home?root:root+'for-shruti';
 const title=home?'Shruthi Matrimony — Become Worth':'A note to Shruti & her team — Shruthi Matrimony';
 const description=home?'An independent creative story and proposed 90-day journey through Monster, Divine and Integration. No affiliation, dates or introductions offered.':'The story behind Seraphina and an open invitation from Moses Sam Paul Johnraj to Shruti Haasan and her representatives.';
 const image=root+'social/'+(home?'story':'for-shruti')+'.jpg';
 const alt=home?'Seraphina illustrated in graphite and red pencil with a dragon wing.':'Moses sculpting the fictional dragoness Seraphina in pencil and red.';
 html=html.replace(/<meta\b[^>]*(?:property="og:[^"]*"|name="twitter:[^"]*"|name="author")[^>]*>/g,'');
 const metadata=`<meta name="author" content="Moses Sam Paul Johnraj"><meta property="og:type" content="website"><meta property="og:site_name" content="Shruthi Matrimony"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${image}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${escape(alt)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(title)}"><meta name="twitter:description" content="${escape(description)}"><meta name="twitter:image" content="${image}"><meta name="twitter:image:alt" content="${escape(alt)}">`;
 html=html.replace(/<script id="structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/,'');
 const page={'@type':'WebPage','@id':url+'#webpage',url,name:title,description,inLanguage:'en',isPartOf:{'@id':root+'#website'},creator:{'@id':root+'#creator'},publisher:{'@id':root+'#foundation'},about:{'@id':root+'#seraphina'},primaryImageOfPage:{'@type':'ImageObject',url:image,width:1200,height:630}};
 if(home)page.hasPart={'@id':root+'#faq'};
 const graph={'@context':'https://schema.org','@graph':[...shared,page,...(home?[faqNode]:[])]};
 html=html.replace('</head>',metadata+'<script id="structured-data" type="application/ld+json">'+JSON.stringify(graph).replaceAll('<','\\u003c')+'</script></head>');
 // Only remove the two standalone footer links selected by the user.
 html=html.replace('<a href="https://houseofbros.theinternetofvalue.org/">HouseOfBros ↗</a>','').replace('<a href="'+identity+'">Public wellbeing identity ↗</a>','');
 if(home){
  const start=html.indexOf('<div class="ps-trail-summary">');
  const end=html.indexOf('\n   <form',start);
  if(start<0||end<0)throw Error('Signup trail summary boundary missing');
  const cards='<div class="ps-trail-summary">'+trails.map(t=>`<a class="trail-card" href="${t.url}" target="_blank" rel="noopener noreferrer" aria-label="Explore the ${t.name} trail on HouseOfBros (opens in a new tab)"><img src="/assets/trails/${t.slug}.webp" width="320" height="213" alt="" loading="lazy" decoding="async"><span>${t.number} / 30 DAYS</span><strong>${t.name}<i aria-hidden="true">↗</i></strong><p>${t.description}</p></a>`).join('')+'</div><p class="trail-context">Explore the existing HouseOfBros trails. Opens in a new tab.</p></div>';
  html=html.slice(0,start)+cards+html.slice(end);
  html=html.replace(/<!-- faq:start -->[\s\S]*?<!-- faq:end -->/,'');
  const answers=faq.map(q=>`<details id="faq-${q.slug}"><summary>${escape(q.question)}<span aria-hidden="true">+</span></summary><p>${escape(q.answer)}</p>${q.slug==='signup'?'<a class="faq-context" href="/privacy">How your details are used ↗</a>':''}</details>`).join('');
  const section='<!-- faq:start --><section id="faq" class="faq-section" aria-labelledby="faq-title"><div class="faq-intro"><span class="eyebrow">THE STORY / A LITTLE CONTEXT</span><h2 id="faq-title">A few things,<br><em>before you begin.</em></h2></div><div class="faq-answers">'+answers+'</div></section><!-- faq:end -->';
  html=html.replace('<footer class="site-footer">',section+'<footer class="site-footer">');
 }
 html=html.replaceAll('alive-4','search-5');
 fs.writeFileSync('public/'+file,html.split('\n').map(line=>line.trimEnd()).join('\n'));
}
const trailLinks=trails.map(t=>`- [${t.name} trail](${t.url})`).join('\n');
fs.writeFileSync('public/llms.txt',`# Shruthi Matrimony / Become Worth\n\nAn independent creative experiment by Moses Sam Paul Johnraj, presented as an experiment of Internet of Value Research Foundation. It is not affiliated with or endorsed by Shruti Haasan and does not offer dates or introductions. Seraphina is a fictional dragon goddess.\n\nBecome Worth is a proposed 90-day journey: Monster, Divine, Integration, 30 days each. Signup records interest, not enrolment in a scheduled cohort. Current HouseOfBros self-guided trails are separate linked resources.\n\n## Primary pages\n- [Story and FAQ](${root}#faq)\n- [Creator context and contact](${root}for-shruti)\n- [Data use](${root}privacy)\n- [Creator public wellbeing identity](${identity})\n- [Creator LinkedIn](https://www.linkedin.com/in/mosessampaul/)\n- [Creator-supplied podcast moment, 41:04](https://youtu.be/CAw_FyHTFk0?t=2464)\n\n## Current trail resources\n${trailLinks}\n`);
console.log('Updated metadata, entity graphs, visible FAQ, dragon trail links, and optional plain-text context.');
