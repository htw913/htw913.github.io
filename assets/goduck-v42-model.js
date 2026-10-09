/*
 * GoDuck V4.2 navigation character — original procedural Three.js sculpture.
 * Visual source of truth: goduck-v42-approved-reference.png supplied by Justin
 * on 2026-10-09. No third-party mesh, texture, or character asset is used.
 * Geometry remains inspectable and poseable in the browser; the cutout image is
 * used only when WebGL is unavailable and as a case-study illustration.
 */
export function createGoDuckModel(T) {
  const root = new T.Group();
  root.name = 'GoDuck approved navigation sculpture';
  const bodyRig = new T.Group(); root.add(bodyRig);
  const headRig = new T.Group(); headRig.position.y = 0.57; bodyRig.add(headRig);
  const material = (color, roughness=.72, opts={}) => new T.MeshPhysicalMaterial({color, roughness, metalness:0, clearcoat:.22, clearcoatRoughness:.32, ...opts});
  const yellow = material(0xffd766,.62);
  const headYellow = material(0xffe486,.56);
  const golden = material(0xffca60,.64);
  const orange = material(0xf28b31,.55);
  const orangeShade = material(0xa95122,.62);
  const pink = material(0xf79594,.85,{transparent:true,opacity:.88});
  const eyeDark = material(0x251821,.16,{clearcoat:1,clearcoatRoughness:.04});
  const white = new T.MeshBasicMaterial({color:0xffffff});
  const blueGlint = new T.MeshBasicMaterial({color:0x23a5ff});
  const scarf = material(0x241a53,.44,{metalness:.08,clearcoat:.7});
  const scarfEdge = material(0x443274,.42,{metalness:.12});
  const cyan = new T.MeshBasicMaterial({color:0x67deff});
  const sphere = new T.SphereGeometry(1,32,24);
  const add = (parent, geo, mat, x,y,z, sx=1,sy=1,sz=1, name='') => {
    const mesh=new T.Mesh(geo,mat); mesh.position.set(x,y,z); mesh.scale.set(sx,sy,sz);mesh.name=name;parent.add(mesh);return mesh;
  };
  const orb=(parent,mat,x,y,z,sx,sy,sz,name)=>add(parent,sphere,mat,x,y,z,sx,sy,sz,name);

  // The body uses a continuous pear profile rather than stacked primitives.
  const profile=[[-1.24,.08],[-1.17,.35],[-1.05,.55],[-.83,.70],[-.58,.77],[-.33,.72],[-.16,.59],[-.04,.43],[.02,.17],[.03,0]];
  const curve=new T.SplineCurve(profile.map(([y,r])=>new T.Vector2(r,y)));
  const body=add(bodyRig,new T.LatheGeometry(curve.getPoints(54),40),yellow,0,0,0,1,1,.80,'pear body');

  // Oversized softly flattened head follows the reference's head/body balance.
  orb(headRig,headYellow,0,0,0,.91,.80,.77,'round head');

  const eyes=[];
  for(const side of [-1,1]) {
    const eye=new T.Group();eye.position.set(side*.35,.025,.662);headRig.add(eye);
    orb(eye,eyeDark,0,0,0,.20,.245,.108,side<0?'left glossy eye':'right glossy eye');
    orb(eye,white,-.065,.095,.102,.049,.061,.018,'white catchlight');
    orb(eye,blueGlint,.09,-.015,.104,.017,.019,.012,'blue catchlight');
    const brow=orb(headRig,eyeDark,side*.35,.39,.67,.116,.022,.033,'eyebrow');
    brow.rotation.z=side*.16;
    const cheek=orb(headRig,pink,side*.61,-.245,.50,.137,.091,.028,'pink cheek');
    cheek.rotation.z=side*.12;
    eyes.push(eye);
  }

  // Sculpted bill: a beveled Bézier outline with a distinct lower volume.
  const bill=new T.Shape();
  bill.moveTo(-.30,-.16);bill.bezierCurveTo(-.38,-.04,-.27,.04,-.07,.055);
  bill.bezierCurveTo(.13,.10,.27,-.01,.39,-.12);
  bill.bezierCurveTo(.48,-.21,.37,-.30,.17,-.30);
  bill.bezierCurveTo(-.04,-.29,-.24,-.25,-.30,-.16);
  const billGeo=new T.ExtrudeGeometry(bill,{depth:.105,steps:1,bevelEnabled:true,bevelSegments:4,bevelThickness:.055,bevelSize:.055,curveSegments:18});
  add(headRig,billGeo,orange,0,-.22,.79,1,1,1,'sculpted orange bill');
  const lower=orb(headRig,orangeShade,.02,-.49,.84,.28,.05,.105,'bill shadow');lower.rotation.z=-.07;

  // Two uneven, curved feathers from the approved silhouette.
  function tuft(x,tilt,size) {
    const shape=new T.Shape();shape.moveTo(-.12,0);shape.bezierCurveTo(-.23,.16,-.12,.43,.05,.52);
    shape.bezierCurveTo(.19,.52,.22,.41,.15,.29);shape.bezierCurveTo(.09,.12,.06,.03,-.12,0);
    const g=new T.ExtrudeGeometry(shape,{depth:.105,bevelEnabled:true,bevelSegments:4,bevelThickness:.045,bevelSize:.04,curveSegments:16});
    const m=add(headRig,g,headYellow,x,.65,-.07,size,size,size,'head feather');m.rotation.z=tilt;return m;
  }
  tuft(.07,-.36,1);tuft(.43,.55,.72);

  // One-piece wing silhouettes with a feathered end, mounted on pivots.
  function wing(side) {
    const pivot=new T.Group();pivot.position.set(side*.62,-.28,-.02);bodyRig.add(pivot);
    const shape=new T.Shape();shape.moveTo(0,.10);
    shape.bezierCurveTo(.14,.31,.48,.42,.64,.20);
    shape.bezierCurveTo(.75,.08,.66,-.03,.54,-.06);
    shape.bezierCurveTo(.73,-.13,.70,-.29,.51,-.32);
    shape.bezierCurveTo(.64,-.42,.52,-.52,.35,-.47);
    shape.bezierCurveTo(.17,-.41,.03,-.25,0,.10);
    const g=new T.ExtrudeGeometry(shape,{depth:.18,bevelEnabled:true,bevelSegments:4,bevelThickness:.085,bevelSize:.07,curveSegments:18});
    const m=add(pivot,g,yellow,0,0,0,side*(side<0?.82:.68),side<0?.86:.68,1,'rounded waving wing');
    m.rotation.z=side<0?-.2:-.12;
    pivot.rotation.z=side<0?-.70:-.36;
    return pivot;
  }
  const leftWing=wing(-1),rightWing=wing(1);

  // Navy-purple technology scarf. A lathed collar fits the neck; the knot
  // and two asymmetric tails reproduce the reference without using a texture.
  const collarProfile=[new T.Vector2(.57,-.40),new T.Vector2(.69,-.38),new T.Vector2(.72,-.22),new T.Vector2(.68,-.11),new T.Vector2(.61,-.10)];
  add(bodyRig,new T.LatheGeometry(collarProfile,48),scarf,0,0,0,1,1,.96,'navy tech scarf collar');
  add(bodyRig,new T.TorusGeometry(.655,.018,8,64),scarfEdge,0,-.13,0,1,.96,1,'scarf upper trim').rotation.x=Math.PI/2;
  orb(bodyRig,scarfEdge,0,-.39,.69,.11,.075,.09,'scarf knot');
  function tail(side) {
    const tie=orb(bodyRig,scarf,side*.10,-.64,.72,.11,.25,.065,'rounded scarf tie');
    tie.rotation.z=side*.28;
    const curve=new T.CatmullRomCurve3([
      new T.Vector3(side*.075,-.68,.79),
      new T.Vector3(side*.14,-.80,.79),
      new T.Vector3(side*.19,-.86,.75)
    ]);
    add(bodyRig,new T.TubeGeometry(curve,16,.009,6,false),cyan,0,0,0,1,1,1,'scarf luminous seam');
  }
  tail(-1);tail(1);
  const smileCurve=new T.CatmullRomCurve3([new T.Vector3(.24,-.27,.70),new T.Vector3(.31,-.31,.70),new T.Vector3(.39,-.30,.67)]);
  add(bodyRig,new T.TubeGeometry(smileCurve,16,.014,6,false),cyan,0,0,0,1,1,1,'cyan scarf light');

  // Three-toed orange webbed feet, with the left one lifted in a step.
  function foot(side,lift) {
    const leg=new T.Group();leg.position.set(side*.36,-1.28,.13);bodyRig.add(leg);
    orb(leg,orange,0,-.05,0,.11,.18,.12,'orange ankle');
    const shape=new T.Shape();shape.moveTo(-.15,0);shape.bezierCurveTo(-.27,-.09,-.25,-.27,-.11,-.27);
    shape.bezierCurveTo(-.04,-.27,-.01,-.22,0,-.20);shape.bezierCurveTo(.02,-.29,.12,-.31,.17,-.25);
    shape.bezierCurveTo(.23,-.19,.22,-.12,.13,-.07);shape.bezierCurveTo(.05,-.02,-.04,.01,-.15,0);
    const g=new T.ExtrudeGeometry(shape,{depth:.19,bevelEnabled:true,bevelSegments:4,bevelThickness:.05,bevelSize:.055,curveSegments:12});
    const m=add(leg,g,orange,0,-.12,.03,1,1,1,'webbed orange foot');m.rotation.x=-.3;
    if(lift){leg.rotation.z=-.53;leg.position.y=-1.05;leg.rotation.x=-.27}
    return leg;
  }
  const liftedFoot=foot(-1,true),plantedFoot=foot(1,false);
  root.rotation.y=-.16;
  const meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o)});
  return {root,rig:{bodyRig,headRig,leftWing,rightWing,eyes,liftedFoot,plantedFoot},meshes};
}
