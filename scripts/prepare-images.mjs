import fs from 'node:fs/promises';
// Uses the existing local image optimiser; no build/runtime dependency is added to the website.
const {default:sharp}=await import(process.env.IMAGE_OPTIMIZER_MODULE||'sharp');
const names=['invitation','lineage','fan','work','bow','strength','gates','monster','divine','integration','creator','choice'];
await fs.mkdir('artwork-originals',{recursive:true});await fs.mkdir('public/assets/drawings',{recursive:true});await fs.mkdir('public/assets/trails',{recursive:true});await fs.mkdir('public/social',{recursive:true});
const sizes=[];
for(const name of names){
 const old='public/assets/'+name+'.webp',original='artwork-originals/'+name+'.webp';
 try{await fs.access(original)}catch{await fs.copyFile(old,original)}
 for(const width of [540,1080]){
  const output=`public/assets/drawings/${name}-${width}.webp`;
  await sharp(original).resize({width,withoutEnlargement:true}).webp({quality:78,effort:5}).toFile(output);
  sizes.push({file:output,bytes:(await fs.stat(output)).size});
 }
 // Preserve originals outside the public delivery directory; legacy URLs redirect in Netlify.
 try{await fs.unlink(old)}catch(error){if(error.code!=='ENOENT')throw error;}
}
for(const trail of ['monster','divine','integration']){
 const source='artwork-originals/trails/'+trail+'.webp';
 await sharp(source).resize({width:320}).webp({quality:78,effort:5}).toFile('public/assets/trails/'+trail+'.webp');
}
for(const [name,source,position] of [['story','invitation','east'],['for-shruti','work','centre']]){
 await sharp('artwork-originals/'+source+'.webp').resize({width:1200,height:630,fit:'cover',position}).jpeg({quality:83,mozjpeg:true}).toFile('public/social/'+name+'.jpg');
}
await fs.writeFile('docs/qa/responsive-image-sizes.json',JSON.stringify(sizes,null,2)+'\n');
console.log(JSON.stringify({largest:Math.max(...sizes.map(x=>x.bytes)),total:sizes.reduce((n,x)=>n+x.bytes,0),initial1080:sizes.filter(x=>/\/(invitation|lineage)-1080/.test(x.file)).reduce((n,x)=>n+x.bytes,0)}));
