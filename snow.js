// 눈송이 수는 count, 크기·속도·투명도는 아래 설정에서 조절합니다.
(()=>{
 if(document.querySelector('#wedding-snow'))return;
 const card=document.querySelector('main'),rsvp=document.querySelector('.rsvp-section');if(!card||!rsvp)return;
 const style=document.createElement('style');
 style.textContent=`#wedding-snow{position:fixed;top:0;height:100dvh;overflow:hidden;pointer-events:none!important;z-index:10;contain:layout paint}#wedding-snow *{pointer-events:none!important}.wedding-flake{position:absolute;top:-12px;width:var(--size);height:var(--size);opacity:var(--alpha);animation:wedding-snowfall var(--duration) linear var(--delay) infinite;will-change:transform;background:center/contain no-repeat url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%223.6%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20transform%3D%22rotate%280%2050%2050%29%22%20d%3D%22M50%2050V5M43%2010l7%207%207-7M38%2016l12%2012%2012-12M50%2040%2036%2027l5%2018%22%2F%3E%3Cpath%20transform%3D%22rotate%2860%2050%2050%29%22%20d%3D%22M50%2050V5M43%2010l7%207%207-7M38%2016l12%2012%2012-12M50%2040%2036%2027l5%2018%22%2F%3E%3Cpath%20transform%3D%22rotate%28120%2050%2050%29%22%20d%3D%22M50%2050V5M43%2010l7%207%207-7M38%2016l12%2012%2012-12M50%2040%2036%2027l5%2018%22%2F%3E%3Cpath%20transform%3D%22rotate%28180%2050%2050%29%22%20d%3D%22M50%2050V5M43%2010l7%207%207-7M38%2016l12%2012%2012-12M50%2040%2036%2027l5%2018%22%2F%3E%3Cpath%20transform%3D%22rotate%28240%2050%2050%29%22%20d%3D%22M50%2050V5M43%2010l7%207%207-7M38%2016l12%2012%2012-12M50%2040%2036%2027l5%2018%22%2F%3E%3Cpath%20transform%3D%22rotate%28300%2050%2050%29%22%20d%3D%22M50%2050V5M43%2010l7%207%207-7M38%2016l12%2012%2012-12M50%2040%2036%2027l5%2018%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E")}@keyframes wedding-snowfall{from{transform:translate3d(0,-12px,0) rotate(0)}to{transform:translate3d(var(--drift),calc(100dvh + 24px),0) rotate(120deg)}}#wedding-snow[data-paused] .wedding-flake{animation-play-state:paused}@media(prefers-reduced-motion:reduce){#wedding-snow{display:none}}`;
 document.head.append(style);
 const layer=document.createElement('div');layer.id='wedding-snow';layer.setAttribute('aria-hidden','true');document.body.append(layer);
 const count=22;
 for(let i=0;i<count;i++){
  const flake=document.createElement('span');flake.className='wedding-flake';flake.style.left=(Math.random()*100)+'%';
  for(const [key,value] of Object.entries({size:(8+Math.random()*3)+'px',alpha:'0.7',duration:(15+Math.random()*12)+'s',delay:(-Math.random()*27)+'s',drift:(Math.random()*48-24)+'px'}))flake.style.setProperty('--'+key,value);
  layer.append(flake);
 }
 let queued=false;
 function align(){
  const rect=card.getBoundingClientRect(),boundary=rsvp.getBoundingClientRect();
  const height=layer.getBoundingClientRect().height||window.innerHeight;
  const top=Math.min(height,Math.max(0,rect.top));
  const bottom=Math.max(top,Math.min(height,boundary.top));
  layer.style.left=rect.left+'px';layer.style.width=rect.width+'px';
  layer.style.clipPath=`inset(${top}px 0 ${Math.max(0,height-bottom)}px 0)`;
  layer.style.visibility=bottom>top?'visible':'hidden';queued=false;
 }
 function schedule(){if(!queued){queued=true;requestAnimationFrame(align)}}
 align();window.addEventListener('resize',schedule,{passive:true});window.addEventListener('scroll',schedule,{passive:true});
 if(typeof ResizeObserver==='function'){const observer=new ResizeObserver(schedule);observer.observe(card);observer.observe(rsvp)}
 if(document.fonts?.ready)document.fonts.ready.then(schedule);
 function pause(){layer.toggleAttribute('data-paused',document.hidden)}
 document.addEventListener('visibilitychange',pause);pause();
})();
