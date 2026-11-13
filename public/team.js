(()=>{
 const form=document.querySelector('#team-form');
 const button=form.querySelector('button');
 const status=document.querySelector('#team-status');
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(button.disabled||!form.reportValidity())return;
  button.disabled=true;button.textContent='Sending…';
  try{
   const data=new FormData(form);data.set('form-name','creative-conversation');
   const response=await fetch('/for-shruti',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(data).toString()});
   if(!response.ok)throw new Error('Submission failed');
   form.reset();status.textContent='Your message has been received. Thank you for opening a conversation.';
   button.hidden=true;status.tabIndex=-1;status.focus({preventScroll:true});
  }catch(error){status.textContent='Your message couldn’t be sent. Please try again. Your entries are still here.';button.textContent='Try sending again ↗';}
  finally{button.disabled=false;}
 });
})();
