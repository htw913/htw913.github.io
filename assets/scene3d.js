/* JUSTIN PORTFOLIO V3 — interactive abstract WebGL sculpture.
 * Uses Three.js only when capable; CSS prism is a complete offline fallback.
 * No remote image, person, GoDuck webpage or fabricated screenshot is rendered.
 */
const host=document.getElementById('three-stage');
const art=document.querySelector('.hero-art');
const fine=matchMedia('(pointer:fine)').matches;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const webglAvailable=()=>{try{return !!document.createElement('canvas').getContext('webgl')}catch{return false}};
const canRender=!!host&&!!art&&!reduced&&fine&&innerWidth>=901&&webglAvailable();
window.__scene3d={canRender,fine,reduced,webgl:webglAvailable(),width:innerWidth};
if(canRender){
  try{
    const THREE=await import('./vendor/three.module.js');
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(35,1,.1,90);camera.position.set(0,.1,9.5);
    window.addEventListener('portfolio:intro-complete',e=>{if(e.detail?.reason==='enter'&&window.gsap)window.gsap.fromTo(camera.position,{z:12.2},{z:9.5,duration:1.25,ease:'power3.out'});},{once:true});
    const canvas=document.createElement('canvas');
    const gl=canvas.getContext('webgl2',{alpha:true,antialias:true,powerPreference:'high-performance'});
    if(!gl)throw new Error('WebGL2 unavailable');
    const renderer=new THREE.WebGLRenderer({canvas,context:gl,alpha:true,antialias:true,powerPreference:'high-performance'});
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setSize(host.clientWidth||540,host.clientHeight||540);
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.45;
    host.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden','true');
    const group=new THREE.Group();scene.add(group);
    const core=new THREE.Mesh(new THREE.IcosahedronGeometry(1.26,2),new THREE.MeshPhysicalMaterial({color:0x9fb7ff,metalness:.58,roughness:.12,transparent:true,opacity:.86,clearcoat:1,clearcoatRoughness:.08,flatShading:true,side:THREE.DoubleSide,emissive:0x1b3b83,emissiveIntensity:.35}));group.add(core);
    const inner=new THREE.Mesh(new THREE.IcosahedronGeometry(.81,1),new THREE.MeshStandardMaterial({color:0x76e4ff,metalness:.22,roughness:.34,emissive:0x2865ba,emissiveIntensity:.65,flatShading:true}));group.add(inner);
    const wire=new THREE.Mesh(new THREE.IcosahedronGeometry(1.32,2),new THREE.MeshBasicMaterial({color:0x5bdaf9,wireframe:true,transparent:true,opacity:.16}));group.add(wire);
    const torusMaterial=new THREE.MeshStandardMaterial({color:0xa2ddff,metalness:.8,roughness:.17,emissive:0x123b73,emissiveIntensity:.8});
    const torus=new THREE.Mesh(new THREE.TorusGeometry(2.06,.016,8,160),torusMaterial);torus.rotation.set(.4,.6,.2);group.add(torus);
    const torus2=new THREE.Mesh(new THREE.TorusGeometry(2.36,.012,8,160),new THREE.MeshBasicMaterial({color:0xbe95ff,transparent:true,opacity:.61}));torus2.rotation.set(1.3,.2,.55);group.add(torus2);
    const torus3=new THREE.Mesh(new THREE.TorusGeometry(2.62,.006,8,160),new THREE.MeshBasicMaterial({color:0xff9e84,transparent:true,opacity:.32}));torus3.rotation.set(.7,1.4,.3);group.add(torus3);
    const points=[];for(let i=0;i<150;i++){const a=Math.sin(i*127.1)*43758.5453;const b=Math.sin(i*73.7)*12742.492;const c=Math.sin(i*23.45)*67812.346;points.push(((a%1)*2)*4,((b%1)*2)*3,((c%1)*2)*2)}
    const particles=new THREE.BufferGeometry();particles.setAttribute('position',new THREE.Float32BufferAttribute(points,3));
    const dots=new THREE.Points(particles,new THREE.PointsMaterial({color:0xbadfff,size:.027,transparent:true,opacity:.65,sizeAttenuation:true}));group.add(dots);
    scene.add(new THREE.AmbientLight(0x799dea,1.15));
    const key=new THREE.PointLight(0x56d6ff,55,18);key.position.set(-3,3,5);scene.add(key);
    const fill=new THREE.PointLight(0x9d61ff,72,18);fill.position.set(3,-2,2);scene.add(fill);
    const orange=new THREE.PointLight(0xff8b65,40,16);orange.position.set(1,1,-4);scene.add(orange);
    const pointer={x:0,y:0},state={rx:0,ry:0,orbitX:0,orbitY:0,charge:0,active:false,drag:false,pressed:false,scroll:0,lastX:0,lastY:0};
    const ray=new THREE.Raycaster();const ndc=new THREE.Vector2();
    function down(e){if(e.target.closest('button,a'))return;state.pressed=true;state.drag=true;state.lastX=e.clientX;state.lastY=e.clientY;host.setPointerCapture(e.pointerId);host.style.cursor='grabbing';}
    function up(){if(state.pressed){window.portfolioAudio?.play('charge')}state.pressed=false;state.drag=false;host.style.cursor='grab';}
    host.addEventListener('pointerdown',down);window.addEventListener('pointerup',up);
    host.addEventListener('pointermove',e=>{
      if(state.drag){state.orbitY+=(e.clientX-state.lastX)*.007;state.orbitX=Math.max(-.75,Math.min(.75,state.orbitX+(e.clientY-state.lastY)*.006));state.lastX=e.clientX;state.lastY=e.clientY;}
      const b=host.getBoundingClientRect();const x=(e.clientX-b.left)/b.width*2-1,y=1-(e.clientY-b.top)/b.height*2;
      pointer.x=x;pointer.y=y;ndc.set(x,y);
      scene.updateMatrixWorld(true);
      ray.setFromCamera(ndc,camera);
      const hit=ray.intersectObject(core,false).length>0;
      if(hit&&!state.active)window.portfolioAudio?.play('hover');
      state.active=hit;
    },{passive:true});
    host.addEventListener('pointerleave',()=>{pointer.x=0;pointer.y=0;state.active=false;if(!state.drag)up()});
    const onScroll=()=>{const r=art.getBoundingClientRect();state.scroll=Math.max(0,Math.min(1,-r.top/(innerHeight||1)))};
    window.addEventListener('scroll',onScroll,{passive:true});onScroll();
    function resize(){if(!host.isConnected)return;const w=host.clientWidth||540,h=host.clientHeight||540;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false);}
    const observer=new ResizeObserver(resize);observer.observe(host);resize();
    let visible=true,contextLost=false;const intersection=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??true},{threshold:0});intersection.observe(host);
    renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();contextLost=true;art.classList.remove('webgl-ready');host.dataset.fallback='context-lost';});
    renderer.domElement.addEventListener('webglcontextrestored',()=>{contextLost=false;art.classList.add('webgl-ready');delete host.dataset.fallback;});
    const clock=new THREE.Clock();let raf=0;
    function frame(){if(document.hidden||!visible||contextLost)return;
      const t=clock.getElapsedTime();
      state.charge+=(Number(state.pressed)-state.charge)*.08;
      const react=state.active?.12:0;
      state.ry+=(pointer.x*.33+state.orbitY+state.scroll*.32-state.ry)*.055;
      state.rx+=(-pointer.y*.21+state.orbitX-state.rx)*.055;
      group.rotation.y=t*.16+state.ry;group.rotation.x=Math.sin(t*.3)*.11+state.rx;
      core.rotation.z=-t*.07;inner.rotation.set(t*.12,-t*.19,t*.08);wire.rotation.z=t*.04;
      torus.rotation.z=t*.16;torus2.rotation.y=t*.09;torus3.rotation.x=t*.06;
      const scale=1+state.charge*.11+Math.sin(t*1.1)*.015;
      core.scale.setScalar(scale);wire.scale.setScalar(scale);inner.scale.setScalar(1+state.charge*.07);
      core.material.emissiveIntensity=.35+react+state.charge*.95;
      key.intensity=55+state.charge*90;fill.intensity=72+state.charge*50;
      group.position.y=Math.sin(t*.6)*.095;
      renderer.render(scene,camera);
    }
    // GSAP owns the active animation clock alongside Lenis and ScrollTrigger.
    const ticker=window.gsap?.ticker;
    const tick=()=>{if(ticker)frame();else{frame();raf=requestAnimationFrame(tick)}};
    if(ticker)ticker.add(tick);else tick();
    frame();art.classList.add('webgl-ready');
    window.addEventListener('pagehide',()=>{
      if(ticker)ticker.remove(tick);else cancelAnimationFrame(raf);observer.disconnect();intersection.disconnect();
      [core,inner,wire,torus,torus2,torus3,dots].forEach(x=>{x.geometry.dispose();x.material.dispose()});
      renderer.dispose();window.removeEventListener('scroll',onScroll);window.removeEventListener('pointerup',up);
    },{once:true});
  }catch(err){
    host.dataset.fallback='1';console.info('Three.js unavailable — CSS sculpture fallback:',err?.message||err);
  }
}
