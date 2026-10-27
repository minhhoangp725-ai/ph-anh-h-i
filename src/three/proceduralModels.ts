import * as THREE from 'three';

// Material cache and helper creators
export function createStallModel(): THREE.Group {
  const stall = new THREE.Group();

  // Floor deck
  const floorGeo = new THREE.BoxGeometry(7, 0.2, 5);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x8b5a2b,
    roughness: 0.8,
    metalness: 0.1
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.position.set(0, 0.1, 0);
  floor.receiveShadow = true;
  stall.add(floor);

  // Counter desk
  const counterGeo = new THREE.BoxGeometry(4.2, 1.0, 1.4);
  const counterMat = new THREE.MeshStandardMaterial({
    color: 0xa0522d,
    roughness: 0.7,
    metalness: 0.2
  });
  const counter = new THREE.Mesh(counterGeo, counterMat);
  counter.position.set(0, 0.7, 0.5);
  counter.castShadow = true;
  counter.receiveShadow = true;
  stall.add(counter);

  // Counter Top (Stainless steel finish)
  const topGeo = new THREE.BoxGeometry(4.4, 0.08, 1.6);
  const topMat = new THREE.MeshStandardMaterial({
    color: 0xdcdcdc,
    roughness: 0.25,
    metalness: 0.8
  });
  const top = new THREE.Mesh(topGeo, topMat);
  top.position.set(0, 1.24, 0.5);
  top.castShadow = true;
  stall.add(top);

  // Large Pho Broth Pot (Nồi Nước Dùng Phở Inox)
  const potGeo = new THREE.CylinderGeometry(0.55, 0.5, 0.75, 24);
  const potMat = new THREE.MeshStandardMaterial({
    color: 0xefefef,
    roughness: 0.2,
    metalness: 0.9
  });
  const pot = new THREE.Mesh(potGeo, potMat);
  pot.position.set(-1.2, 1.62, 0.5);
  pot.castShadow = true;
  stall.add(pot);

  // Broth inside pot (golden shimmering broth)
  const brothGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.05, 24);
  const brothMat = new THREE.MeshStandardMaterial({
    color: 0xd48817,
    roughness: 0.1,
    metalness: 0.1
  });
  const broth = new THREE.Mesh(brothGeo, brothMat);
  broth.position.set(-1.2, 1.95, 0.5);
  stall.add(broth);

  // Wooden Pillars
  const pillarGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.2, 12);
  const pillarMat = new THREE.MeshStandardMaterial({
    color: 0x5c3317,
    roughness: 0.9,
    metalness: 0.05
  });

  const pillarCoords = [
    [-3.2, 1.6, -2.2],
    [3.2, 1.6, -2.2],
    [-3.2, 1.6, 2.2],
    [3.2, 1.6, 2.2]
  ];

  pillarCoords.forEach(([x, y, z]) => {
    const p = new THREE.Mesh(pillarGeo, pillarMat);
    p.position.set(x, y, z);
    p.castShadow = true;
    stall.add(p);
  });

  // Stall Roof (Traditional terracotta style)
  const roofGeo = new THREE.ConeGeometry(4.8, 1.2, 4);
  roofGeo.rotateY(Math.PI / 4);
  const roofMat = new THREE.MeshStandardMaterial({
    color: 0xbd472b,
    roughness: 0.85,
    metalness: 0.05
  });
  const roof = new THREE.Mesh(roofGeo, roofMat);
  roof.position.set(0, 3.6, 0);
  roof.castShadow = true;
  stall.add(roof);

  // Signboard: TIỆM PHỞ HẢI
  const signCanvas = document.createElement('canvas');
  signCanvas.width = 512;
  signCanvas.height = 128;
  const ctx = signCanvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#8b0000';
    ctx.fillRect(0, 0, 512, 128);
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 10;
    ctx.strokeRect(6, 6, 500, 116);

    ctx.fillStyle = '#fffae0';
    ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('TIỆM PHỞ HẢI', 256, 45);

    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('⭐ ĐẬM ĐÀ TRUYỀN THỐNG ⭐', 256, 92);
  }

  const signTex = new THREE.CanvasTexture(signCanvas);
  signTex.colorSpace = THREE.SRGBColorSpace;
  const signGeo = new THREE.BoxGeometry(2.4, 0.6, 0.08);
  const signMat = new THREE.MeshStandardMaterial({
    map: signTex,
    roughness: 0.4
  });
  const sign = new THREE.Mesh(signGeo, signMat);
  sign.position.set(0, 2.8, 2.2);
  stall.add(sign);

  // Red lanterns
  [-1.8, 1.8].forEach((lx) => {
    const lanternGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const lanternMat = new THREE.MeshStandardMaterial({
      color: 0xff2222,
      emissive: 0xff3300,
      emissiveIntensity: 0.5,
      roughness: 0.4
    });
    const lantern = new THREE.Mesh(lanternGeo, lanternMat);
    lantern.position.set(lx, 2.6, 2.1);
    stall.add(lantern);
  });

  // Dining table & plastic/wood stools for customers
  const tableGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.7, 16);
  const tableMat = new THREE.MeshStandardMaterial({ color: 0x4a7c59, roughness: 0.5 });
  const table = new THREE.Mesh(tableGeo, tableMat);
  table.position.set(0, 0.45, -1.2);
  table.castShadow = true;
  stall.add(table);

  // Stools
  [[-0.9, -1.2], [0.9, -1.2]].forEach(([sx, sz]) => {
    const stoolGeo = new THREE.CylinderGeometry(0.25, 0.28, 0.42, 12);
    const stoolMat = new THREE.MeshStandardMaterial({ color: 0x1e88e5, roughness: 0.6 });
    const stool = new THREE.Mesh(stoolGeo, stoolMat);
    stool.position.set(sx, 0.21, sz);
    stool.castShadow = true;
    stall.add(stool);
  });

  return stall;
}

// Procedural Cậu Vàng (Hải's loyal dog companion)
export function createDogModel(): THREE.Group {
  const dog = new THREE.Group();

  // Torso
  const bodyGeo = new THREE.BoxGeometry(0.6, 0.4, 0.8);
  const furMat = new THREE.MeshStandardMaterial({
    color: 0xe6a836,
    roughness: 0.9,
    metalness: 0.05
  });
  const body = new THREE.Mesh(bodyGeo, furMat);
  body.position.set(0, 0.45, 0);
  body.castShadow = true;
  dog.add(body);

  // Head
  const headGeo = new THREE.BoxGeometry(0.38, 0.36, 0.45);
  const head = new THREE.Mesh(headGeo, furMat);
  head.position.set(0, 0.75, 0.42);
  head.castShadow = true;
  dog.add(head);

  // Snout (Mõm chó)
  const snoutGeo = new THREE.BoxGeometry(0.22, 0.18, 0.28);
  const snoutMat = new THREE.MeshStandardMaterial({ color: 0xd99824, roughness: 0.8 });
  const snout = new THREE.Mesh(snoutGeo, snoutMat);
  snout.position.set(0, 0.68, 0.66);
  dog.add(snout);

  // Black Nose
  const noseGeo = new THREE.SphereGeometry(0.05, 8, 8);
  const noseMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.3 });
  const nose = new THREE.Mesh(noseGeo, noseMat);
  nose.position.set(0, 0.74, 0.8);
  dog.add(nose);

  // Floppy Ears
  const earGeo = new THREE.ConeGeometry(0.08, 0.22, 6);
  [-0.18, 0.18].forEach((ex) => {
    const ear = new THREE.Mesh(earGeo, furMat);
    ear.position.set(ex, 0.95, 0.38);
    ear.rotation.z = ex < 0 ? 0.3 : -0.3;
    dog.add(ear);
  });

  // Red Collar with golden bell (Vòng cổ đỏ chuông vàng)
  const collarGeo = new THREE.TorusGeometry(0.22, 0.035, 8, 16);
  const collarMat = new THREE.MeshStandardMaterial({ color: 0xcc1111, roughness: 0.5 });
  const collar = new THREE.Mesh(collarGeo, collarMat);
  collar.position.set(0, 0.62, 0.32);
  collar.rotation.x = Math.PI / 2;
  dog.add(collar);

  const bellGeo = new THREE.SphereGeometry(0.045, 8, 8);
  const bellMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.9, roughness: 0.2 });
  const bell = new THREE.Mesh(bellGeo, bellMat);
  bell.position.set(0, 0.55, 0.45);
  dog.add(bell);

  // 4 Legs
  const legGeo = new THREE.CylinderGeometry(0.07, 0.06, 0.35, 8);
  const legOffsets = [
    [-0.2, 0.18, 0.25],
    [0.2, 0.18, 0.25],
    [-0.2, 0.18, -0.25],
    [0.2, 0.18, -0.25]
  ];
  legOffsets.forEach(([lx, ly, lz]) => {
    const leg = new THREE.Mesh(legGeo, furMat);
    leg.position.set(lx, ly, lz);
    leg.castShadow = true;
    dog.add(leg);
  });

  // Wagging Tail
  const tailGeo = new THREE.CylinderGeometry(0.04, 0.02, 0.35, 8);
  const tail = new THREE.Mesh(tailGeo, furMat);
  tail.name = 'dogTail';
  tail.position.set(0, 0.55, -0.45);
  tail.rotation.x = -Math.PI / 3;
  dog.add(tail);

  dog.scale.set(0.85, 0.85, 0.85);
  return dog;
}

// Procedural Humanoid Character (3-12 parts)
export function createHumanoid(type: string): THREE.Group {
  const char = new THREE.Group();

  let shirtColor = 0x2e7d32; // Default green
  let pantsColor = 0x263238; // Charcoal
  let skinColor = 0xf5cba7;
  let hairColor = 0x212121;
  let isWheelchair = false;
  let isHelmet = false;

  if (type === 'hai') {
    shirtColor = 0x3e505b; // Navy/work shirt
    pantsColor = 0x37474f;
  } else if (type === 'khoa') {
    shirtColor = 0x00a859; // Grab green
    pantsColor = 0x212121;
    isHelmet = true;
  } else if (type === 'khanh') {
    shirtColor = 0x1976d2; // Blue
    isWheelchair = true;
  } else if (type === 'trai_bach_khoa') {
    shirtColor = 0x5e35b1; // Purple hoodie
    pantsColor = 0x1565c0;
  } else if (type === 'man_dan') {
    shirtColor = 0xd32f2f; // Red soccer shirt
    pantsColor = 0xffffff;
  } else if (type === 'gia_bao') {
    shirtColor = 0x00bcd4; // Cyan athletic tank
    pantsColor = 0x212121;
  } else if (type === 'hieu') {
    shirtColor = 0x6d4c41; // Brown silk tunic
    pantsColor = 0x4e342e;
    hairColor = 0xcccccc; // Gray hair
  } else if (type === 'long') {
    shirtColor = 0x212121; // Black muscle tank
    pantsColor = 0x3e2723;
  } else if (type === 'phu_ba') {
    shirtColor = 0x8e24aa; // Magenta dress
    pantsColor = 0x8e24aa;
    hairColor = 0xb71c1c; // Red-wine dye
  }

  // Torso
  const torsoGeo = new THREE.BoxGeometry(0.55, 0.75, 0.32);
  const torsoMat = new THREE.MeshStandardMaterial({ color: shirtColor, roughness: 0.7 });
  const torso = new THREE.Mesh(torsoGeo, torsoMat);
  torso.position.set(0, isWheelchair ? 0.75 : 1.35, 0);
  torso.castShadow = true;
  char.add(torso);

  // Apron for Hai
  if (type === 'hai') {
    const apronGeo = new THREE.BoxGeometry(0.48, 0.65, 0.05);
    const apronMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
    const apron = new THREE.Mesh(apronGeo, apronMat);
    apron.position.set(0, 1.32, 0.16);
    char.add(apron);
  }

  // Head
  const headGeo = new THREE.SphereGeometry(0.22, 16, 16);
  const headMat = new THREE.MeshStandardMaterial({ color: skinColor, roughness: 0.6 });
  const head = new THREE.Mesh(headGeo, headMat);
  head.position.set(0, isWheelchair ? 1.25 : 1.9, 0);
  head.castShadow = true;
  char.add(head);

  // Hair or Helmet
  if (isHelmet) {
    const helmetGeo = new THREE.SphereGeometry(0.26, 16, 16);
    const helmetMat = new THREE.MeshStandardMaterial({ color: 0x00a859, roughness: 0.3, metalness: 0.2 });
    const helmet = new THREE.Mesh(helmetGeo, helmetMat);
    helmet.position.set(0, 1.94, 0);
    char.add(helmet);

    // Visor
    const visorGeo = new THREE.BoxGeometry(0.28, 0.12, 0.15);
    const visorMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.1, metalness: 0.8 });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 1.92, 0.2);
    char.add(visor);
  } else {
    const hairGeo = new THREE.ConeGeometry(0.24, 0.2, 12);
    const hairMat = new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.9 });
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.set(0, isWheelchair ? 1.45 : 2.08, 0);
    char.add(hair);

    // Eyes for facial expression
    const eyeGeo = new THREE.SphereGeometry(0.028, 8, 8);
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.2 });
    [-0.08, 0.08].forEach((ex) => {
      const eye = new THREE.Mesh(eyeGeo, eyeMat);
      eye.position.set(ex, isWheelchair ? 1.27 : 1.92, 0.21);
      char.add(eye);
    });
  }

  // Arms
  const armGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.65, 8);
  const armMat = new THREE.MeshStandardMaterial({ color: shirtColor, roughness: 0.7 });
  [-0.38, 0.38].forEach((ax) => {
    const arm = new THREE.Mesh(armGeo, armMat);
    arm.position.set(ax, isWheelchair ? 0.75 : 1.35, 0);
    arm.castShadow = true;
    char.add(arm);
  });

  // Legs or Wheelchair
  if (isWheelchair) {
    // Wheelchair Base
    const seatGeo = new THREE.BoxGeometry(0.7, 0.08, 0.7);
    const seatMat = new THREE.MeshStandardMaterial({ color: 0x212121, roughness: 0.8 });
    const seat = new THREE.Mesh(seatGeo, seatMat);
    seat.position.set(0, 0.38, 0);
    char.add(seat);

    // Big Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.08, 16);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.8, roughness: 0.3 });
    [-0.42, 0.42].forEach((wx) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.position.set(wx, 0.38, 0);
      wheel.rotation.z = Math.PI / 2;
      char.add(wheel);
    });

    // Folded legs
    const lapGeo = new THREE.BoxGeometry(0.45, 0.15, 0.45);
    const lapMat = new THREE.MeshStandardMaterial({ color: 0x263238 });
    const lap = new THREE.Mesh(lapGeo, lapMat);
    lap.position.set(0, 0.48, 0.2);
    char.add(lap);
  } else {
    // Standing Legs
    const legGeo = new THREE.CylinderGeometry(0.1, 0.08, 0.85, 8);
    const legMat = new THREE.MeshStandardMaterial({ color: pantsColor, roughness: 0.8 });
    [-0.16, 0.16].forEach((lx) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(lx, 0.45, 0);
      leg.castShadow = true;
      char.add(leg);
    });
  }

  return char;
}

// Procedural Nightclub "Thiên Đường"
export function createNightclubModel(): THREE.Group {
  const club = new THREE.Group();

  // Dance floor with reflective dark tiles
  const floorGeo = new THREE.BoxGeometry(12, 0.2, 12);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x110822,
    roughness: 0.15,
    metalness: 0.6
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.position.set(0, 0, 0);
  club.add(floor);

  // DJ Booth
  const boothGeo = new THREE.BoxGeometry(3.5, 1.2, 1.2);
  const boothMat = new THREE.MeshStandardMaterial({
    color: 0x240046,
    roughness: 0.3,
    metalness: 0.7
  });
  const booth = new THREE.Mesh(boothGeo, boothMat);
  booth.position.set(0, 0.6, -4.5);
  club.add(booth);

  // Neon Logo "THIÊN ĐƯỜNG CLUB"
  const logoCanvas = document.createElement('canvas');
  logoCanvas.width = 512;
  logoCanvas.height = 128;
  const ctx = logoCanvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#120024';
    ctx.fillRect(0, 0, 512, 128);
    ctx.strokeStyle = '#e0aaff';
    ctx.lineWidth = 6;
    ctx.strokeRect(4, 4, 504, 120);

    ctx.fillStyle = '#ff007f';
    ctx.font = 'bold 38px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('⚡ THIÊN ĐƯỜNG CLUB ⚡', 256, 55);

    ctx.fillStyle = '#00f5d4';
    ctx.font = '22px sans-serif';
    ctx.fillText('VIP LOUNGE & HIGH BEATS', 256, 100);
  }

  const logoTex = new THREE.CanvasTexture(logoCanvas);
  logoTex.colorSpace = THREE.SRGBColorSpace;
  const logoGeo = new THREE.PlaneGeometry(3.5, 0.9);
  const logoMat = new THREE.MeshBasicMaterial({ map: logoTex });
  const logo = new THREE.Mesh(logoGeo, logoMat);
  logo.position.set(0, 2.8, -4.8);
  club.add(logo);

  // Colorful Neon Pillars
  const pillarGeo = new THREE.CylinderGeometry(0.2, 0.2, 4.5, 12);
  const colors = [0xff007f, 0x7b2cbf, 0x00f5d4, 0xffbe0b];
  [
    [-4, -3],
    [4, -3],
    [-4, 3],
    [4, 3]
  ].forEach(([px, pz], idx) => {
    const pillarMat = new THREE.MeshStandardMaterial({
      color: colors[idx % colors.length],
      emissive: colors[idx % colors.length],
      emissiveIntensity: 0.6,
      roughness: 0.2
    });
    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
    pillar.position.set(px, 2.25, pz);
    club.add(pillar);
  });

  return club;
}

// Procedural Bridge for the High Speed Stunt Chase
export function createBridgeModel(): THREE.Group {
  const bridge = new THREE.Group();

  // Long bridge road
  const roadGeo = new THREE.BoxGeometry(6, 0.3, 30);
  const roadMat = new THREE.MeshStandardMaterial({
    color: 0x222225,
    roughness: 0.9,
    metalness: 0.1
  });
  const road = new THREE.Mesh(roadGeo, roadMat);
  road.position.set(0, 0, 0);
  road.receiveShadow = true;
  bridge.add(road);

  // Guard rails
  const railGeo = new THREE.BoxGeometry(0.2, 0.8, 30);
  const railMat = new THREE.MeshStandardMaterial({
    color: 0x999999,
    metalness: 0.8,
    roughness: 0.3
  });
  [-2.9, 2.9].forEach((rx) => {
    const rail = new THREE.Mesh(railGeo, railMat);
    rail.position.set(rx, 0.5, 0);
    bridge.add(rail);
  });

  // Streetlamps
  for (let z = -12; z <= 12; z += 6) {
    [-3.2, 3.2].forEach((lx) => {
      const poleGeo = new THREE.CylinderGeometry(0.06, 0.08, 4, 8);
      const poleMat = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.7 });
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.set(lx, 2, z);
      bridge.add(pole);

      const lampGeo = new THREE.SphereGeometry(0.18, 8, 8);
      const lampMat = new THREE.MeshStandardMaterial({
        color: 0xffea00,
        emissive: 0xffea00,
        emissiveIntensity: 0.9
      });
      const lamp = new THREE.Mesh(lampGeo, lampMat);
      lamp.position.set(lx < 0 ? lx + 0.3 : lx - 0.3, 3.8, z);
      bridge.add(lamp);
    });
  }

  // Water below bridge
  const waterGeo = new THREE.PlaneGeometry(35, 45);
  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x061a29,
    roughness: 0.1,
    metalness: 0.8
  });
  const water = new THREE.Mesh(waterGeo, waterMat);
  water.rotation.x = -Math.PI / 2;
  water.position.set(0, -3.5, 0);
  bridge.add(water);

  return bridge;
}

// Procedural Motorcycle
export function createMotorbike(colorHex: number = 0xd32f2f): THREE.Group {
  const bike = new THREE.Group();

  // Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.15, 16);
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });

  const fWheel = new THREE.Mesh(wheelGeo, wheelMat);
  fWheel.position.set(0, 0.35, 0.85);
  fWheel.rotation.z = Math.PI / 2;
  bike.add(fWheel);

  const rWheel = new THREE.Mesh(wheelGeo, wheelMat);
  rWheel.position.set(0, 0.35, -0.85);
  rWheel.rotation.z = Math.PI / 2;
  bike.add(rWheel);

  // Chassis / Frame
  const frameGeo = new THREE.BoxGeometry(0.4, 0.45, 1.2);
  const frameMat = new THREE.MeshStandardMaterial({
    color: colorHex,
    roughness: 0.3,
    metalness: 0.6
  });
  const frame = new THREE.Mesh(frameGeo, frameMat);
  frame.position.set(0, 0.6, 0);
  bike.add(frame);

  // Handlebars
  const handleGeo = new THREE.BoxGeometry(0.8, 0.05, 0.05);
  const handleMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.8 });
  const handle = new THREE.Mesh(handleGeo, handleMat);
  handle.position.set(0, 0.95, 0.55);
  bike.add(handle);

  // Headlight
  const lightGeo = new THREE.SphereGeometry(0.12, 8, 8);
  const lightMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 0.8
  });
  const light = new THREE.Mesh(lightGeo, lightMat);
  light.position.set(0, 0.75, 1.0);
  bike.add(light);

  return bike;
}
