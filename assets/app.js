(()=>{
  'use strict';
  const all=window.PORTFOLIO;
  if(!all){console.error('Missing presentation data');return;}
  const $=(s,p=document)=>p.querySelector(s);
  const set=(s,text)=>{const el=$(s);if(el)el.textContent=text;};
  const getLang=()=>{try{return localStorage.getItem('justin-lang')==='en'?'en':'zh';}catch{return 'zh';}};
  let lang=getLang();
  const page=document.body.dataset.page;
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const graphics={
    goduck:`<div class="visual-duck" aria-hidden="true"><div class="duck-orbit"></div><div class="duck-shell"><span class="duck-hair">✦</span><span class="duck-eyes"><i></i><i></i></span><span class="duck-bill"></span><span class="duck-body"></span></div><div class="duck-heart">♡</div><span class="graphic-note">GROWTH / WITH CARE</span></div>`,
    cloud:`<div class="visual-flow" aria-hidden="true"><div class="flow-unit unit-a">GIT<br><small>SOURCE</small></div><div class="flow-edge edge-a"></div><div class="flow-unit unit-b">CI<br><small>CHECK</small></div><div class="flow-edge edge-b"></div><div class="flow-unit unit-c">APP<br><small>DEVICE</small></div><span class="graphic-note">CLOUD / VERIFIED BUILDS</span></div>`,
    workflow:`<div class="visual-stack" aria-hidden="true"><div class="glass-sheet sheet-back"></div><div class="glass-sheet sheet-middle"></div><div class="glass-sheet sheet-front"><div class="glass-circle">◎</div><div class="glass-lines"><i></i><i></i><i></i></div><span>AI × HUMAN</span></div><span class="graphic-note">PLAN / BUILD / REVIEW</span></div>`,
    fitness:`<div class="visual-fitness" aria-hidden="true"><div class="fitness-loop"><div class="fitness-inner">↗<small>PROGRESS</small></div></div><div class="fitness-dashes"><i></i><i></i><i></i></div><span class="graphic-note">MOTIVATION / VISUALIZED</span></div>`
  };
  const projectCard=p=>`<a class="project-card reveal" href="./project.html?id=${encodeURIComponent(p.id)}" aria-label="${escape(p.name)}"><div class="project-thumb visual-${escape(p.id)}"><div class="card-visual-label">${escape(p.num)} / SELECTED CASE</div>${graphics[p.id]}<span class="visual-disclaimer">CONCEPTUAL VISUAL · NOT APP SCREENSHOT</span></div><div class="project-body"><div class="project-meta"><span>${escape(p.group)}</span><span class="status-badge">${escape(p.stage)}</span></div><h3>${escape(p.name)}</h3><p class="project-short">${escape(p.short)}</p><div class="project-value"><span id="value-${p.id}"></span><span>${escape(p.value)}</span></div><div class="project-footer"><span>${escape(p.platform)}</span><span class="project-view">${escape(all[lang].seeCase)} ↗</span></div></div></a>`;
  function renderHome(){const d=all[lang];document.documentElement.lang=lang==='zh'?'zh-CN':'en';
    $('#hero-line-1').textContent=d.heroTitle[0];$('#hero-line-2').textContent=d.heroTitle[1];$('#hero-line-3').textContent=d.heroTitle[2];
    set('#hero-eyebrow',d.eyebrow);set('#hero-intro',d.heroIntro);set('#hero-action',d.heroAction);set('#hero-second',d.heroSecond);set('#hero-note',d.heroNote);
    $('#hero-tags').innerHTML=d.heroMeta.map(x=>`<span>${escape(x)}</span>`).join('');
    set('#works-eyebrow',d.worksEyebrow);set('#works-title',d.worksTitle);set('#works-lead',d.worksLead);
    $('#case-grid').innerHTML=d.projects.map(projectCard).join('');d.projects.forEach(p=>set('#value-'+p.id,d.valueTag));
    set('#capability-eyebrow',d.capabilityEyebrow);set('#capability-title',d.capabilityTitle);set('#capability-lead',d.capabilityLead);
    $('#cap-grid').innerHTML=d.capabilityNames.map((v,i)=>`<article class="cap-card reveal"><div class="cap-number">0${i+1} / SYSTEM</div><div class="cap-glyph">${['◇','✳','⬡','⌘'][i]}</div><h3>${escape(v)}</h3><p>${escape(d.capabilityDescs[i])}</p></article>`).join('');
    set('#about-eyebrow',d.aboutEyebrow);set('#about-title',d.aboutTitle);set('#about-lead',d.aboutLead);set('#about-body',d.aboutBody);set('#about-rule',d.aboutRule);
    set('#contact-eyebrow',d.contactEyebrow);set('#contact-title',d.contactTitle);set('#contact-lead',d.contactLead);set('#github-label',d.github);set('#footer-line',d.foot);
    $$('.nav-links a[data-nav]').forEach((x,i)=>x.textContent=d.nav[i]);
    installReveal();
    window.dispatchEvent(new CustomEvent('portfolio:render'));
  }
  function $$(sel,p=document){return [...p.querySelectorAll(sel)];}
  function renderProject(){const d=all[lang],id=new URLSearchParams(location.search).get('id')||'goduck',p=d.projects.find(x=>x.id===id);set('#back-text',d.back);
    if(!p){$('#case-content').innerHTML=`<section class="case-empty"><h1>404 / CASE NOT FOUND</h1><a href="./index.html#works">← BACK</a></section>`;return;}
    document.title=p.name+' — JUSTIN / SELECTED WORK';
    const labs=d.labels;
    $('#case-content').innerHTML=`<section class="case-hero"><div class="case-heading"><div class="case-number">${escape(p.num)} / ${escape(p.group)}</div><h1>${escape(p.name)}</h1><p class="case-tagline">${escape(p.headline)}</p><p class="case-intro">${escape(p.short)}</p><div class="case-status">${escape(p.stage)}</div></div><div class="case-graphic visual-${escape(p.id)}">${graphics[p.id]}<span class="case-visual-note">${escape(d.visualNote)}</span></div></section><section class="case-specs">${[['platform',p.platform],['role',p.role],['status',p.stage],['tech',p.stack]].map(([k,v])=>`<div><span>${escape(labs[k])}</span><strong>${escape(v)}</strong></div>`).join('')}</section><section class="case-story"><div class="case-story-intro"><span>01 / ${escape(d.details[0])}</span><h2>${escape(p.headline)}</h2></div><div class="story-body"><div class="story-block"><span>02 / ${escape(d.details[1])}</span><p>${escape(p.why)}</p></div><div class="story-block"><span>03 / ${escape(d.details[2])}</span><p>${escape(p.how)}</p></div><div class="story-block"><span>04 / ${escape(d.details[3])}</span><p>${escape(p.value)}</p><ul>${p.benefits.map(b=>`<li>${escape(b)}</li>`).join('')}</ul></div><div class="story-block evidence"><span>05 / ${escape(d.details[4])}</span><p>${escape(p.evidence)}</p></div></div></section>`;
    window.dispatchEvent(new CustomEvent('portfolio:render'));
  }
  function installReveal(){if(!('IntersectionObserver' in window)){ $$('.reveal').forEach(x=>x.classList.add('visible'));return;}const ob=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');ob.unobserve(e.target);}});},{threshold:.08});$$('.reveal').forEach(el=>ob.observe(el));}
  function installInteractions(){const sw=$('#lang-switch');sw?.addEventListener('click',()=>{lang=lang==='zh'?'en':'zh';try{localStorage.setItem('justin-lang',lang);}catch{};if(page==='home')renderHome();else renderProject();});
    let pending=false;window.addEventListener('scroll',()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{const denom=document.documentElement.scrollHeight-innerHeight;const pct=denom>0?window.scrollY/denom*100:0;const el=$('#scroll-progress');if(el)el.style.width=Math.max(0,Math.min(100,pct))+'%';document.body.classList.toggle('scrolled',scrollY>40);pending=false;});},{passive:true});
    const scene=$('#scene');if(scene&&matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches){const art=$('.hero-art');art?.addEventListener('pointermove',e=>{const r=art.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;scene.style.setProperty('--px',(x*10).toFixed(2)+'deg');scene.style.setProperty('--py',(y*-8).toFixed(2)+'deg');});art?.addEventListener('pointerleave',()=>{scene.style.setProperty('--px','0deg');scene.style.setProperty('--py','0deg');});}
  }
  if(page==='home')renderHome();else renderProject();installInteractions();
})();
