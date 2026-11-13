import assert from 'node:assert/strict';
import fs from 'node:fs';
const base='https://shruthimatrimony.com/';
const faq=JSON.parse(fs.readFileSync('content/faq.json','utf8'));
const trails=JSON.parse(fs.readFileSync('content/trails.json','utf8'));
const text=s=>s.replace(/<[^>]*>/g,'').replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&lt;','<').replaceAll('&gt;','>').replace(/\s+/g,' ').trim();
const result=[];
for(const page of ['index.html','for-shruti.html']){
 const html=fs.readFileSync('public/'+page,'utf8');
 assert.equal((html.match(/<h1\b/g)||[]).length,1,page+': one source-level H1');
 const json=html.match(/<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/);
 assert.ok(json,page+': source-level JSON-LD present');const data=JSON.parse(json[1]);
 assert.equal(data['@context'],'https://schema.org');
 const nodes=data['@graph'];
 for(const type of ['Organization','Person','WebSite','WebPage'])assert.ok(nodes.find(n=>n['@type']===type),type);
 assert.equal(nodes.find(n=>n['@type']==='Person').name,'Moses Sam Paul Johnraj');
 assert.equal(nodes.filter(n=>n['@type']==='Person').length,1,'No implied celebrity participant');
 assert.ok(!nodes.find(n=>['Offer','Course','Review','Movie'].includes(n['@type'])),'No invented offer or attached film');
 const url=page==='index.html'?base:base+'for-shruti';
 assert.ok(html.includes('rel="canonical" href="'+url+'"'));
 assert.ok(html.includes('property="og:url" content="'+url+'"'));
 assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
 for(const tag of ['og:image','og:image:width','og:image:height','og:image:alt'])assert.ok(html.includes('property="'+tag+'"'));
 const image=html.match(/property="og:image" content="([^"]+)"/)[1];assert.ok(fs.existsSync('public/'+image.replace(base,'')));
 const footer=html.match(/<nav class="footer-links"[^>]*>([\s\S]*?)<\/nav>/)[1];
 assert.ok(!footer.includes('HouseOfBros')&&!footer.includes('Public wellbeing identity'),'Selected standalone footer links removed');
 assert.ok(footer.includes('/for-shruti'),'Team page retained');
 if(page==='index.html'){
  const schemaFaq=nodes.find(n=>n['@type']==='FAQPage');assert.equal(schemaFaq.mainEntity.length,faq.length);
  for(const item of schemaFaq.mainEntity){
   const slug=item['@id'].split('#faq-')[1];
   const details=html.match(new RegExp('<details id="faq-'+slug+'">([\\s\\S]*?)</details>'))[1];
   const question=text(details.match(/<summary>([\s\S]*?)<\/summary>/)[1]).replace(/\+$/,'').trim();
   const answer=text(details.match(/<p>([\s\S]*?)<\/p>/)[1]);
   assert.equal(question,item.name,'Visible FAQ question matches schema');
   assert.equal(answer,item.acceptedAnswer.text,'Visible FAQ answer matches schema');
  }
  for(const trail of trails){assert.ok(html.includes('href="'+trail.url+'"'));assert.ok(fs.existsSync('public/assets/trails/'+trail.slug+'.webp'));}
 }
 result.push({page,h1:1,entities:nodes.length,faqQuestions:page==='index.html'?faq.length:0,canonical:url,valid:true});
}
const sizes=JSON.parse(fs.readFileSync('docs/qa/responsive-image-sizes.json','utf8'));
assert.ok(sizes.every(x=>x.bytes<250*1024),'Display image size budget');
const dragons=trails.reduce((total,t)=>total+fs.statSync('public/assets/trails/'+t.slug+'.webp').size,0);
console.log(JSON.stringify({pages:result,trailArtworkBytes:dragons,largestDisplayImage:Math.max(...sizes.map(s=>s.bytes)),pass:true},null,2));
