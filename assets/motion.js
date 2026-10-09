/* JUSTIN PORTFOLIO V3 — progressive enhancement / motion orchestration
 * GSAP controls timelines; Lenis shares GSAP's ticker; no mandatory framework.
 * When external dependencies cannot load, native scrolling and CSS remain usable.
 */
(()=>{
 'use strict';
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
 const coarse=window.matchMedia('(pointer: coarse)');
 const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
 const g=window.gsap;
 let lenis=null, mm=null, contexts=[],soundOn=false,audioCtx=null,lastSound=0;
 const noMotion=()=>reduce.matches;
 function syncSoundButton(){const button=$('#sound-toggle');if(!button)return;button.setAttribute('aria-pressed',String(soundOn));button.innerHTML=soundOn?'SOUND ON <span>◉</span>':'SOUND OFF <span>◌</span>';button.setAttribute('aria-label',soundOn?'Mute interactive sound':'Enable interactive sound')}
 function disableAudio(){soundOn=false;audioCtx=null;syncSoundButton()}
 function audio(kind='hover'){
   if(!soundOn || noMotion())return;
   const now=performance.now();if(now-lastSound<120)return;lastSound=now;
   try{
     audioCtx ||= new (window.AudioContext||window.webkitAudioContext)();
     if(audioCtx.state==='suspended')audioCtx.resume().catch(disableAudio);
     const osc=audioCtx.createOscillator(),vol=audioCtx.createGain();
     const t=audioCtx.currentTime;
     osc.type='sine';osc.frequency.setValueAtTime(kind==='charge'?170:420,t);
     osc.frequency.exponentialRampToValueAtTime(kind==='charge'?420:690,t+.16);
     vol.gain.setValueAtTime(.0001,t);vol.gain.exponentialRampToValueAtTime(.027,t+.014);
     vol.gain.exponentialRampToValueAtTime(.0001,t+.22);
     osc.connect(vol).connect(audioCtx.destination);osc.start(t);osc.stop(t+.24);
   }catch{disableAudio()}
 }
 function bindSound(){
   const button=$('#sound-toggle');if(!button)return;
   button.addEventListener('click',async()=>{
     soundOn=!soundOn;syncSoundButton();
     if(soundOn) audio('charge');
   });
   window.portfolioAudio={play:audio,isEnabled:()=>soundOn};
 }
 function installLenis(){
   if(!g||!window.Lenis||noMotion()||coarse.matches)return;
   try{
     lenis=new window.Lenis({autoRaf:false,lerp:.09,smoothWheel:true,gestureOrientation:'vertical'});
     const ticker=t=>lenis?.raf(t*1000);
     g.ticker.add(ticker);
     if(window.ScrollTrigger){lenis.on('scroll',window.ScrollTrigger.update);g.ticker.lagSmoothing(0)}
     window.addEventListener('pagehide',()=>{g.ticker.remove(ticker);lenis?.destroy();lenis=null},{once:true});
   }catch(err){console.warn('Lenis fallback:',err);lenis=null}
 }
 function heroEntrance(){
   if(!g||noMotion())return;
   const lines=$$('.hero-line');
   if(!lines.length)return;
   g.killTweensOf([...lines,'.hero-intro','.hero-buttons','.hero-tags','.hero-art']);
   g.fromTo(lines,{autoAlpha:0,y:42,filter:'blur(8px)'},{autoAlpha:1,y:0,filter:'blur(0px)',duration:1.1,ease:'power3.out',stagger:.14,delay:.1,clearProps:'all'});
   g.fromTo(['.hero-intro','.hero-buttons','.hero-tags'],{autoAlpha:0,y:18},{autoAlpha:1,y:0,duration:.8,delay:.55,stagger:.11,ease:'power2.out',clearProps:'all'});
   const art=$('.hero-art');if(art)g.fromTo(art,{autoAlpha:.4,scale:.94},{autoAlpha:1,scale:1,duration:1.5,ease:'power3.out',clearProps:'all'});
 }
 function scrollScenes(){
   if(!g||!window.ScrollTrigger||noMotion())return;
   g.registerPlugin(window.ScrollTrigger);
   if(mm) mm.revert();
   mm=g.matchMedia();
   mm.add('(min-width: 901px)',()=>{
     const triggers=[];
     const works=$('#works'),caps=$('#capabilities');
     if(works){
       triggers.push(g.to('.hero-art',{y:100,opacity:.26,ease:'none',scrollTrigger:{trigger:works,start:'top bottom',end:'top 18%',scrub:true}}));
       triggers.push(g.fromTo('.section-works .section-heading',{y:35,opacity:.35},{y:0,opacity:1,ease:'none',scrollTrigger:{trigger:works,start:'top 88%',end:'top 45%',scrub:true}}));
     }
     if(caps)triggers.push(g.fromTo('.technology-runway',{backgroundPosition:'0% 0%'},{backgroundPosition:'100% 0%',ease:'none',scrollTrigger:{trigger:caps,start:'top 95%',end:'bottom 5%',scrub:true}}));
     return ()=>triggers.forEach(t=>t.kill());
   });
   mm.add('(min-width: 901px)',()=>{
     const blocks=$$('.story-block');if(!blocks.length)return;
     const triggers=blocks.map((block,i)=>g.fromTo(block,{opacity:.45,y:42},{opacity:1,y:0,ease:'none',scrollTrigger:{trigger:block,start:'top 90%',end:'top 45%',scrub:.6}}));
     return ()=>triggers.forEach(t=>t.kill());
   });
   window.ScrollTrigger.refresh();
 }
 function cardTilt(){
   $$('.project-card').forEach(card=>{
     if(card.dataset.motionBound)return;card.dataset.motionBound='1';
     if(coarse.matches||noMotion())return;
     let raf=0;
     card.addEventListener('pointermove',e=>{
       if(raf)return;
       raf=requestAnimationFrame(()=>{
         raf=0;const r=card.getBoundingClientRect();
         const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
         card.style.setProperty('--tilt-x',`${(-y*7).toFixed(2)}deg`);
         card.style.setProperty('--tilt-y',`${(x*8).toFixed(2)}deg`);
         card.style.setProperty('--spot-x',`${((x+.5)*100).toFixed(1)}%`);
         card.style.setProperty('--spot-y',`${((y+.5)*100).toFixed(1)}%`);
       });
     },{passive:true});
     card.addEventListener('pointerenter',()=>{card.classList.add('is-tilting');audio('hover')});
     card.addEventListener('pointerleave',()=>{
       card.classList.remove('is-tilting');card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg');
     });
   });
 }
 function animateCase(){
   const hero=$('.case-hero');if(!hero||!g||noMotion())return;
   g.fromTo(hero.children,{opacity:0,y:22,filter:'blur(5px)'},{opacity:1,y:0,filter:'blur(0px)',duration:.85,ease:'power2.out',stagger:.1,clearProps:'all'});
 }
 function render(){
   cardTilt();heroEntrance();animateCase();scrollScenes();
 }
 bindSound();installLenis();
 document.addEventListener('visibilitychange',()=>{if(document.hidden)audioCtx?.suspend();});
 window.addEventListener('portfolio:render',()=>requestAnimationFrame(render));
 // app.js renders synchronously before this script in the standard load order.
 requestAnimationFrame(render);
})();
