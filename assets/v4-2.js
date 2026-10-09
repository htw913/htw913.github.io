/* V4.2 contact actions, mascot safe zone, and final interaction polish. */
(()=>{
  'use strict';
  const email='a839629934@outlook.com';
  const $=s=>document.querySelector(s);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  function language(){return document.documentElement.lang==='en'?'en':'zh'}
  function feedback(text){const el=$('#copy-feedback');if(el)el.textContent=text}
  async function copyEmail(){
    const en=language()==='en';
    try{
      if(!navigator.clipboard?.writeText)throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(email);
      feedback(en?'Email copied':'邮箱已复制');
      return;
    }catch{}
    try{
      const input=document.createElement('textarea');input.value=email;
      input.style.cssText='position:fixed;left:-9999px;top:0;opacity:0';
      document.body.append(input);input.select();
      const ok=document.execCommand('copy');input.remove();
      if(!ok)throw new Error('Copy failed');
      feedback(en?'Email copied':'邮箱已复制');
    }catch{
      feedback(en?'Copy failed. Select and copy the visible email address above.':'复制失败。请选中上方可见的邮箱地址手动复制。');
      $('#contact-email')?.focus();
    }
  }
  function avoidContact(){
    const guide=$('#duck-guide'),contact=$('#contact'),footer=$('.footer');
    if(!guide||!contact||!('IntersectionObserver'in window))return;
    const visible=new Set();
    const ob=new IntersectionObserver(entries=>{
      entries.forEach(e=>e.isIntersecting?visible.add(e.target):visible.delete(e.target));
      const blocked=visible.size>0;guide.classList.toggle('is-contact-hidden',blocked);
      if(blocked){const panel=$('#duck-panel');if(panel&&!panel.hidden){$('#duck-close')?.click()}}
    },{rootMargin:'0px 0px 100px 0px',threshold:0});
    ob.observe(contact);if(footer)ob.observe(footer);
  }
  function avoidImportantContent(){
    const guide=$('#duck-guide');if(!guide)return;
    const important=[...document.querySelectorAll('.project-body>*,.cap-card h3,.cap-card p,.technology-runway p,.about-copy h2,.about-copy p,.about-copy blockquote')];
    let queued=false;
    const update=()=>{
      queued=false;if(!guide.isConnected)return;
      if(innerWidth<=900){guide.classList.remove('is-content-hidden');guide.inert=false;return}
      const d=guide.querySelector('.duck-stage')?.getBoundingClientRect();if(!d)return;
      const blocked=important.some(el=>{const r=el.getBoundingClientRect();return Math.min(r.right,d.right)-Math.max(r.left,d.left)>24&&Math.min(r.bottom,d.bottom)-Math.max(r.top,d.top)>16});
      guide.classList.toggle('is-content-hidden',blocked);
      if(window.portfolioV4State?.phase!=='intro_wait')guide.inert=blocked;
    };
    const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(update)}};
    window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});
    window.addEventListener('portfolio:intro-complete',schedule);window.addEventListener('portfolio:render',schedule);
    schedule();
  }
  function magneticButtons(){
    if(reduced.matches||matchMedia('(pointer:coarse)').matches||innerWidth<901)return;
    document.querySelectorAll('.hero-buttons .button,.contact-actions .button,.intro-enter').forEach(el=>{
      el.addEventListener('pointermove',e=>{
        const r=el.getBoundingClientRect();
        const x=(e.clientX-r.left-r.width/2)*.065,y=(e.clientY-r.top-r.height/2)*.10;
        el.style.translate=`${x.toFixed(1)}px ${y.toFixed(1)}px`;
      },{passive:true});
      el.addEventListener('pointerleave',()=>{el.style.translate='0 0'});
    });
  }
  function introFinish(){
    window.addEventListener('portfolio:intro-complete',e=>{
      if(e.detail?.reason!=='enter'||reduced.matches||!window.gsap)return;
      const gs=window.gsap;
      gs.fromTo('.site-header',{opacity:0,y:-18},{opacity:1,y:0,duration:.72,ease:'power2.out',clearProps:'all'});
      gs.fromTo('.hero-line',{opacity:0,y:40},{opacity:1,y:0,duration:1.05,stagger:.10,ease:'power3.out',clearProps:'all'});
    },{once:true});
  }
  function localizeGuide(){
    const en=language()==='en';
    const labels=en?{title:'Hi, I’m GoDuck!',copy:'Welcome to Justin’s portfolio. Where would you like to go?',about:'Meet Justin',works:'Explore my work',goduck:'About GoDuck',contact:'Contact me',note:'GoDuck · Coming Soon · Portfolio guide',activate:'Open GoDuck portfolio guide',dismiss:'Hide GoDuck for this visit',close:'Close guide'}:{title:'嗨，我是加油鸭！',copy:'欢迎来到 Justin 的作品集。想先了解什么？',about:'认识 Justin',works:'浏览我的作品',goduck:'了解 GoDuck',contact:'联系我',note:'GoDuck · 敬请期待 · 这是作品集导览',activate:'打开加油鸭导览',dismiss:'本次访问隐藏加油鸭',close:'关闭导览'};
    $('#duck-panel-title')?.replaceChildren(document.createTextNode(labels.title));
    $('#duck-panel-copy')?.replaceChildren(document.createTextNode(labels.copy));
    $('.duck-panel-note')?.replaceChildren(document.createTextNode(labels.note));
    ['about','works','goduck','contact'].forEach(key=>{const span=$(`[data-guide="${key}"]`)?.firstChild;if(span&&span.nodeType===3)span.textContent=`${labels[key]} `});
    $('#duck-activate')?.setAttribute('aria-label',labels.activate);
    $('#duck-dismiss')?.setAttribute('aria-label',labels.dismiss);
    $('#duck-close')?.setAttribute('aria-label',labels.close);
  }
  function init(){
    $('#copy-email')?.addEventListener('click',copyEmail);
    avoidContact();avoidImportantContent();magneticButtons();introFinish();localizeGuide();window.addEventListener('portfolio:render',localizeGuide);
    $('#send-email')?.setAttribute('href',`mailto:${email}`);
    $('#contact-email')?.setAttribute('href',`mailto:${email}`);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
