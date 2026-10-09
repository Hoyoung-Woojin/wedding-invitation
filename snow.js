// 눈송이 수는 count, 크기·속도·투명도는 아래 설정에서 조절합니다.
(()=>{
 if(document.querySelector('#wedding-snow'))return;
 const card=document.querySelector('main');if(!card)return;
 const style=document.createElement('style');
 style.textContent=`#wedding-snow{position:fixed;top:0;height:100dvh;overflow:hidden;pointer-events:none!important;z-index:10;contain:layout paint}#wedding-snow *{pointer-events:none!important}.wedding-flake{position:absolute;top:-12px;width:var(--size);height:var(--size);opacity:var(--alpha);animation:wedding-snowfall var(--duration) linear var(--delay) infinite;will-change:transform;background:center/contain no-repeat url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M10 1v18M2.2 5.5l15.6 9M2.2 14.5l15.6-9M7 3l3 3 3-3M7 17l3-3 3 3' fill='none' stroke='white' stroke-width='1.6' stroke-linecap='round'/%3E%3C/svg%3E")}@keyframes wedding-snowfall{from{transform:translate3d(0,-12px,0) rotate(0)}to{transform:translate3d(var(--drift),calc(100dvh + 24px),0) rotate(120deg)}}#wedding-snow[data-paused] .wedding-flake{animation-play-state:paused}@media(prefers-reduced-motion:reduce){#wedding-snow{display:none}}`;
 document.head.append(style);
 const layer=document.createElement('div');layer.id='wedding-snow';layer.setAttribute('aria-hidden','true');document.body.append(layer);
 const count=22;
 for(let i=0;i<count;i++){
  const flake=document.createElement('span');flake.className='wedding-flake';flake.style.left=(Math.random()*100)+'%';
  for(const [key,value] of Object.entries({size:(4+Math.random()*4)+'px',alpha:String(.3+Math.random()*.35),duration:(15+Math.random()*12)+'s',delay:(-Math.random()*27)+'s',drift:(Math.random()*48-24)+'px'}))flake.style.setProperty('--'+key,value);
  layer.append(flake);
 }
 let queued=false;
 function align(){const rect=card.getBoundingClientRect();layer.style.left=rect.left+'px';layer.style.width=rect.width+'px';queued=false}
 function schedule(){if(!queued){queued=true;requestAnimationFrame(align)}}
 align();window.addEventListener('resize',schedule,{passive:true});window.addEventListener('scroll',schedule,{passive:true});
 if(typeof ResizeObserver==='function')new ResizeObserver(schedule).observe(card);
 function pause(){layer.toggleAttribute('data-paused',document.hidden)}
 document.addEventListener('visibilitychange',pause);pause();
})();
