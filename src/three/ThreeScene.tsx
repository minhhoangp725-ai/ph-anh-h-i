import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  createStallModel,
  createDogModel,
  createHumanoid,
  createNightclubModel,
  createBridgeModel,
  createMotorbike
} from './proceduralModels';
import { SceneMode } from '../types/game';

interface ThreeSceneProps {
  sceneMode: SceneMode;
  currentCustomerType: string | null;
  spinStuntProgress?: number; // 0 to 1 for the 360 spin maneuver
  isBurned?: boolean;
  onSceneReady?: () => void;
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({
  sceneMode,
  currentCustomerType,
  spinStuntProgress = 0,
  isBurned = false
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Group references for dynamic updates
  const stallGroupRef = useRef<THREE.Group | null>(null);
  const dogGroupRef = useRef<THREE.Group | null>(null);
  const customerGroupRef = useRef<THREE.Group | null>(null);
  const haiGroupRef = useRef<THREE.Group | null>(null);
  const clubGroupRef = useRef<THREE.Group | null>(null);
  const bridgeGroupRef = useRef<THREE.Group | null>(null);
  const bikeHaiRef = useRef<THREE.Group | null>(null);
  const enemyBike1Ref = useRef<THREE.Group | null>(null);
  const enemyBike2Ref = useRef<THREE.Group | null>(null);
  const steamParticlesRef = useRef<THREE.Points | null>(null);
  const fireParticlesRef = useRef<THREE.Points | null>(null);

  const targetCamPos = useRef(new THREE.Vector3(0, 3, 7));
  const targetCamLook = useRef(new THREE.Vector3(0, 1.2, 0));

  useEffect(() => {
    if (!mountRef.current) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = mountRef.current.clientWidth || window.innerWidth;
    const height = mountRef.current.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c0f17);
    scene.fog = new THREE.FogExp2(0x0c0f17, 0.04);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 7.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Environment map reflection
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Lighting Setup
    const ambientLight = new THREE.HemisphereLight(0xddeeff, 0x1f2421, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 2.2);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x7ec8e3, 1.2);
    rimLight.position.set(-5, 4, -5);
    scene.add(rimLight);

    // Warm street / lantern point lights
    const lanternLight = new THREE.PointLight(0xff7722, 1.5, 12);
    lanternLight.position.set(0, 2.8, 1.5);
    scene.add(lanternLight);

    // BUILD PHO STALL
    const stall = createStallModel();
    stallGroupRef.current = stall;
    scene.add(stall);

    // BUILD DOG CẬU VÀNG
    const dog = createDogModel();
    dog.position.set(2.2, 0, 1.4);
    dog.rotation.y = -Math.PI / 6;
    dogGroupRef.current = dog;
    scene.add(dog);

    // BUILD HẢI (Standing behind the pho counter)
    const hai = createHumanoid('hai');
    hai.position.set(0, 0.1, -0.1);
    haiGroupRef.current = hai;
    scene.add(hai);

    // CUSTOMER PLACEHOLDER
    const customerGroup = new THREE.Group();
    customerGroupRef.current = customerGroup;
    scene.add(customerGroup);

    // NIGHTCLUB
    const club = createNightclubModel();
    club.position.set(100, 0, 0); // Kept in separate coordinate offset
    clubGroupRef.current = club;
    scene.add(club);

    // BRIDGE
    const bridge = createBridgeModel();
    bridge.position.set(0, 0, -100);
    bridgeGroupRef.current = bridge;
    scene.add(bridge);

    // MOTORBIKES FOR BRIDGE SCENE
    const bikeHai = createMotorbike(0x00c853); // Green bike for Hai
    bikeHai.position.set(0, 0.3, -100);
    bikeHaiRef.current = bikeHai;
    scene.add(bikeHai);

    const eBike1 = createMotorbike(0xd50000); // Red enemy bike
    eBike1.position.set(-1.4, 0.3, -98);
    enemyBike1Ref.current = eBike1;
    scene.add(eBike1);

    const eBike2 = createMotorbike(0x2962ff); // Blue enemy bike
    eBike2.position.set(1.4, 0.3, -98);
    enemyBike2Ref.current = eBike2;
    scene.add(eBike2);

    // BROTH STEAM PARTICLES
    const steamCount = 60;
    const steamGeo = new THREE.BufferGeometry();
    const steamPos = new Float32Array(steamCount * 3);
    for (let i = 0; i < steamCount; i++) {
      steamPos[i * 3] = -1.2 + (Math.random() - 0.5) * 0.5;
      steamPos[i * 3 + 1] = 2.0 + Math.random() * 1.5;
      steamPos[i * 3 + 2] = 0.5 + (Math.random() - 0.5) * 0.5;
    }
    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPos, 3));
    const steamMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.18,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const steam = new THREE.Points(steamGeo, steamMat);
    steamParticlesRef.current = steam;
    scene.add(steam);

    // FIRE PARTICLES FOR BURNED STALL
    const fireCount = 120;
    const fireGeo = new THREE.BufferGeometry();
    const firePos = new Float32Array(fireCount * 3);
    for (let i = 0; i < fireCount; i++) {
      firePos[i * 3] = (Math.random() - 0.5) * 4;
      firePos[i * 3 + 1] = Math.random() * 2.8;
      firePos[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    fireGeo.setAttribute('position', new THREE.BufferAttribute(firePos, 3));
    const fireMat = new THREE.PointsMaterial({
      color: 0xff4500,
      size: 0.28,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const fire = new THREE.Points(fireGeo, fireMat);
    fire.visible = false;
    fireParticlesRef.current = fire;
    scene.add(fire);

    // RESIZE LISTENER
    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animId = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Dog tail wagging and head bob
      if (dogGroupRef.current) {
        const tail = dogGroupRef.current.getObjectByName('dogTail');
        if (tail) {
          tail.rotation.y = Math.sin(time * 12) * 0.45;
        }
      }

      // Steam animation
      if (steamParticlesRef.current) {
        const positions = steamParticlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < steamCount; i++) {
          positions[i * 3 + 1] += delta * 0.6;
          positions[i * 3] += Math.sin(time * 3 + i) * 0.003;
          if (positions[i * 3 + 1] > 3.8) {
            positions[i * 3 + 1] = 2.0;
            positions[i * 3] = -1.2 + (Math.random() - 0.5) * 0.5;
          }
        }
        steamParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Fire animation
      if (fireParticlesRef.current && fireParticlesRef.current.visible) {
        const fPos = fireParticlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < fireCount; i++) {
          fPos[i * 3 + 1] += delta * 1.8;
          fPos[i * 3] += (Math.random() - 0.5) * 0.05;
          if (fPos[i * 3 + 1] > 3.5) {
            fPos[i * 3 + 1] = 0.2;
            fPos[i * 3] = (Math.random() - 0.5) * 4;
          }
        }
        fireParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Camera smooth interpolation
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamPos.current.x, 3.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamPos.current.y, 3.5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamPos.current.z, 3.5, delta);
      camera.lookAt(targetCamLook.current);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update customer in scene
  useEffect(() => {
    if (!customerGroupRef.current) return;

    // Clear previous customer
    while (customerGroupRef.current.children.length > 0) {
      customerGroupRef.current.remove(customerGroupRef.current.children[0]);
    }

    if (currentCustomerType && sceneMode === 'stall') {
      const custModel = createHumanoid(currentCustomerType);
      custModel.position.set(0.85, 0.05, 1.6);
      custModel.rotation.y = -Math.PI * 0.72; // Face towards Hai at the counter in 3/4 view
      customerGroupRef.current.add(custModel);
    }
  }, [currentCustomerType, sceneMode]);

  // Adjust Camera and Positions based on SceneMode
  useEffect(() => {
    if (!sceneRef.current) return;

    // Visibility toggles
    const isStallMode = ['stall', 'cooking', 'cashier', 'stall_burned', 'arrest', 'victory'].includes(sceneMode);
    if (stallGroupRef.current) stallGroupRef.current.visible = isStallMode;
    if (dogGroupRef.current) dogGroupRef.current.visible = isStallMode;
    if (haiGroupRef.current) haiGroupRef.current.visible = isStallMode;
    if (steamParticlesRef.current) steamParticlesRef.current.visible = isStallMode && !isBurned;
    if (fireParticlesRef.current) fireParticlesRef.current.visible = sceneMode === 'stall_burned' || isBurned;

    if (clubGroupRef.current) clubGroupRef.current.visible = sceneMode === 'nightclub' || sceneMode === 'fight_long';
    if (bridgeGroupRef.current) bridgeGroupRef.current.visible = sceneMode === 'bridge_chase';
    if (bikeHaiRef.current) bikeHaiRef.current.visible = sceneMode === 'bridge_chase';
    if (enemyBike1Ref.current) enemyBike1Ref.current.visible = sceneMode === 'bridge_chase';
    if (enemyBike2Ref.current) enemyBike2Ref.current.visible = sceneMode === 'bridge_chase';

    if (sceneMode === 'stall') {
      // Elevated camera so 3D characters stand proudly above the bottom transparent dialogue board
      targetCamPos.current.set(0, 2.4, 5.8);
      targetCamLook.current.set(0, 1.35, 0.6);
    } else if (sceneMode === 'cooking') {
      // Close up of the soup pot and counter
      targetCamPos.current.set(-0.8, 2.3, 2.2);
      targetCamLook.current.set(-1.0, 1.5, 0.5);
    } else if (sceneMode === 'cashier') {
      targetCamPos.current.set(0.5, 2.2, 2.6);
      targetCamLook.current.set(0.3, 1.3, 0.8);
    } else if (sceneMode === 'nightclub') {
      targetCamPos.current.set(100, 2.8, 6.5);
      targetCamLook.current.set(100, 1.4, -1);
    } else if (sceneMode === 'fight_long') {
      targetCamPos.current.set(100, 2.2, 4.2);
      targetCamLook.current.set(100, 1.2, 0);
    } else if (sceneMode === 'bridge_chase') {
      targetCamPos.current.set(0, 3.2, -92);
      targetCamLook.current.set(0, 1.4, -100);
    } else if (sceneMode === 'stall_burned') {
      targetCamPos.current.set(1.5, 2.0, 4.8);
      targetCamLook.current.set(0.5, 0.8, 1.0);
    } else if (sceneMode === 'arrest' || sceneMode === 'victory') {
      targetCamPos.current.set(0, 2.2, 4.6);
      targetCamLook.current.set(0, 1.3, 1.2);
    }
  }, [sceneMode, isBurned]);

  // Handle stunt 360 spin animation on the bridge
  useEffect(() => {
    if (bikeHaiRef.current && sceneMode === 'bridge_chase') {
      // 360 degree spin around Y axis
      bikeHaiRef.current.rotation.y = spinStuntProgress * Math.PI * 2;
      bikeHaiRef.current.position.y = 0.3 + Math.sin(spinStuntProgress * Math.PI) * 0.8; // jump slightly

      // Enemy bikes react (spin out / knock away)
      if (enemyBike1Ref.current && spinStuntProgress > 0.4) {
        enemyBike1Ref.current.position.x = -1.4 - (spinStuntProgress - 0.4) * 4;
        enemyBike1Ref.current.rotation.z = (spinStuntProgress - 0.4) * 2;
      }
      if (enemyBike2Ref.current && spinStuntProgress > 0.4) {
        enemyBike2Ref.current.position.x = 1.4 + (spinStuntProgress - 0.4) * 4;
        enemyBike2Ref.current.rotation.z = -(spinStuntProgress - 0.4) * 2;
      }
    }
  }, [spinStuntProgress, sceneMode]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto"
      style={{ touchAction: 'none' }}
    />
  );
};
