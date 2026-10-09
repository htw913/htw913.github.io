/* GoDuck V4.2: interactive Three.js sculpture, driven by the shared GSAP ticker. */
import {createGoDuckModel} from './goduck-v42-model.js';

export async function mountDuckGuide({root,host,button}) {
  if (!root || !host || root.dataset.webglMounted) return null;
  let T;
  try { T=await import('./vendor/three.module.js'); }
  catch { root.classList.add('webgl-fallback'); return null; }
  if (!document.createElement('canvas').getContext('webgl')) {
    root.classList.add('webgl-fallback'); return null;
  }

  let renderer,model;
  try {
    renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));
    renderer.outputColorSpace=T.SRGBColorSpace;
    renderer.toneMapping=T.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.08;
    model=createGoDuckModel(T);
  } catch(error) {
    renderer?.dispose();root.classList.add('webgl-fallback');
    console.info('GoDuck 3D fallback:',error?.message||error);return null;
  }
  const scene=new T.Scene(),camera=new T.PerspectiveCamera(29,1,.1,20);
  camera.position.set(0,.12,7.35);
  scene.add(model.root);
  const ambient=new T.HemisphereLight(0xfff4d8,0x5b3558,1.55);
  const key=new T.DirectionalLight(0xffe4b8,1.95);key.position.set(-2,3.5,4.5);
  const fill=new T.DirectionalLight(0xffc6a3,.55);fill.position.set(3,1,4);
  const rim=new T.PointLight(0x7c79ff,6,10);rim.position.set(2.5,1,-2.5);
  scene.add(ambient,key,fill,rim);
  host.append(renderer.domElement);
  renderer.domElement.setAttribute('aria-hidden','true');
  root.dataset.webglMounted='1';root.classList.add('webgl-ready');

  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const raycaster=new T.Raycaster(),pointer=new T.Vector2(),gsap=window.gsap;
  const clock=new T.Clock();
  const rig=model.rig;
  let mode='idle',inView=true,disposed=false,drag=false,dragStart=0,dragTotal=0;
  let rotationTarget=-.16,lookTargetX=0,lookTargetY=0,waveStart=-99,happyStart=-99;
  let nextBlink=2.8,blinkStart=-99,elapsed=0;
  const hasMotion=()=>!reduce.matches && !document.hidden && inView && !root.classList.contains('is-content-hidden') && !disposed;
  const setState=next=>{
    mode=next;root.dataset.duckState=next;
    if(next==='wave'||next==='guide')waveStart=elapsed;
    if(next==='happy')happyStart=elapsed;
    window.portfolioV4State&&(window.portfolioV4State.duckState=next);
  };
  function fit(){
    if(disposed)return;
    const box=host.getBoundingClientRect();
    const w=Math.max(1,box.width),h=Math.max(1,box.height);
    camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false);
    renderer.render(scene,camera);
  }
  const ro=new ResizeObserver(fit);ro.observe(host);fit();

  function tick(){
    if(!hasMotion())return;
    const delta=Math.min(clock.getDelta(),.05);elapsed+=delta;
    const breath=Math.sin(elapsed*2.05);
    rig.bodyRig.scale.y=1+breath*.009;
    rig.bodyRig.position.y=Math.sin(elapsed*1.35)*.025;
    const happy=Math.max(0,1-(elapsed-happyStart)/.72);
    rig.bodyRig.position.y+=Math.sin((1-happy)*Math.PI*2)*.10*happy;
    rig.headRig.rotation.y+=(lookTargetX-rig.headRig.rotation.y)*.075;
    rig.headRig.rotation.x+=(lookTargetY-rig.headRig.rotation.x)*.075;
    rig.headRig.rotation.z=Math.sin(elapsed*.8)*.018-happy*.035;
    model.root.rotation.y+=(rotationTarget-model.root.rotation.y)*.09;
    rig.liftedFoot.rotation.z=-.53+Math.sin(elapsed*1.7)*.035;
    const waveAge=elapsed-waveStart;
    const waving=waveAge>=0&&waveAge<1.45;
    rig.leftWing.rotation.z=-.70+(waving?Math.sin(waveAge*17)*.34*(1-waveAge/1.45):Math.sin(elapsed*1.4)*.018);
    rig.rightWing.rotation.z=-.12+Math.sin(elapsed*1.05)*.015;
    if(elapsed>nextBlink){blinkStart=elapsed;nextBlink=elapsed+3+Math.random()*3.4}
    const blinkAge=elapsed-blinkStart;
    const blink=blinkAge<.19?Math.max(.08,1-Math.sin(blinkAge/.19*Math.PI)*.92):1;
    rig.eyes.forEach(eye=>eye.scale.y=blink);
    if(mode==='hover'&&elapsed-waveStart>2.6)setState('wave');
    renderer.render(scene,camera);
  }
  if(gsap)gsap.ticker.add(tick);
  else renderer.render(scene,camera);

  const onMove=e=>{
    if(drag){dragTotal+=Math.abs(e.movementX);rotationTarget=T.MathUtils.clamp(rotationTarget+e.movementX*.012,-.52,.37);return}
    const box=renderer.domElement.getBoundingClientRect();
    pointer.set((e.clientX-box.left)/box.width*2-1,-(e.clientY-box.top)/box.height*2+1);
    raycaster.setFromCamera(pointer,camera);
    const hit=raycaster.intersectObjects(model.meshes,false).length>0;
    root.classList.toggle('duck-hover',hit);
    if(hit){
      lookTargetX=T.MathUtils.clamp(pointer.x*.16,-.14,.14);
      lookTargetY=T.MathUtils.clamp(-pointer.y*.1,-.1,.1);
      if(mode==='idle')setState('hover');
    }
  };
  const onLeave=()=>{root.classList.remove('duck-hover');lookTargetX=0;lookTargetY=0;if(mode==='hover')setState('idle')};
  const onDown=e=>{if(e.pointerType==='mouse'){drag=true;dragStart=e.clientX;dragTotal=0;button.dataset.dragged='0';button.setPointerCapture?.(e.pointerId)}};
  const onUp=e=>{if(!drag)return;drag=false;dragTotal=Math.max(dragTotal,Math.abs(e.clientX-dragStart));button.dataset.dragged=dragTotal>8?'1':'';setTimeout(()=>delete button.dataset.dragged,70);if(dragTotal<=8)setState('happy')};
  button.addEventListener('pointermove',onMove);button.addEventListener('pointerleave',onLeave);
  button.addEventListener('pointerdown',onDown);button.addEventListener('pointerup',onUp);
  const onGuide=e=>setState(e.detail?.open?'guide':'comfort');
  const onDismiss=()=>cleanup();
  root.addEventListener('portfolio:duck-guide',onGuide);
  root.addEventListener('portfolio:duck-dismiss',onDismiss);
  const onVisibility=()=>{if(!document.hidden)clock.getDelta();else setState('sleep')};
  document.addEventListener('visibilitychange',onVisibility);
  const observer=new IntersectionObserver(entries=>{inView=!!entries[0]?.isIntersecting;if(inView){clock.getDelta();if(mode==='sleep')setState('idle')}else setState('sleep')},{threshold:.01});
  observer.observe(root);
  const onLost=e=>{e.preventDefault();cleanup();root.classList.remove('webgl-ready');root.classList.add('webgl-fallback')};
  renderer.domElement.addEventListener('webglcontextlost',onLost,{once:true});
  function cleanup(){
    if(disposed)return;disposed=true;
    gsap?.ticker.remove(tick);ro.disconnect();observer.disconnect();
    document.removeEventListener('visibilitychange',onVisibility);
    button.removeEventListener('pointermove',onMove);button.removeEventListener('pointerleave',onLeave);
    button.removeEventListener('pointerdown',onDown);button.removeEventListener('pointerup',onUp);
    root.removeEventListener('portfolio:duck-guide',onGuide);root.removeEventListener('portfolio:duck-dismiss',onDismiss);
    model.meshes.forEach(m=>m.geometry.dispose());
    const mats=new Set(model.meshes.map(m=>m.material));mats.forEach(m=>m.dispose());
    renderer.dispose();renderer.domElement.remove();
  }
  window.addEventListener('pagehide',cleanup,{once:true});
  window.portfolioDuck={model,renderer,setState,debugPose:angle=>{model.root.rotation.y=angle;rotationTarget=angle;renderer.render(scene,camera)},cleanup};
  return cleanup;
}
