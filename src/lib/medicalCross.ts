import * as THREE from "three";

export function initMedicalCross(targetContainer?: HTMLElement): () => void {
  // Hide Framer's old empty 3D container so it doesn't conflict
  const oldContainer = document.querySelector<HTMLElement>(".framer-16lf0oi");
  if (oldContainer) {
    oldContainer.style.display = "none";
  }

  // Find the hero text container (.framer-m3elfi)
  const heroTextContainer = document.querySelector<HTMLElement>(".framer-m3elfi") ||
    document.querySelector<HTMLElement>('[data-framer-name="Hero Text Container 100vh"]') ||
    targetContainer ||
    document.body;

  // Remove any previous wrapper
  const existingWrap = document.getElementById("medical-cross-hero-wrap");
  if (existingWrap) {
    existingWrap.remove();
  }

  // Ensure container allows visible overflow and relative stacking
  heroTextContainer.style.position = "absolute";
  heroTextContainer.style.top = "0";
  heroTextContainer.style.left = "0";
  heroTextContainer.style.width = "100%";
  heroTextContainer.style.height = "100vh";
  heroTextContainer.style.overflow = "visible";

  // Dedicated wrapper positioned behind the headline text
  const wrapper = document.createElement("div");
  wrapper.id = "medical-cross-hero-wrap";
  wrapper.style.position = "absolute";
  wrapper.style.top = "0";
  wrapper.style.left = "0";
  wrapper.style.width = "100%";
  wrapper.style.height = "100%";
  wrapper.style.pointerEvents = "none";
  wrapper.style.zIndex = "0"; // BEHIND headline text (which sits at z-index 2)
  wrapper.style.opacity = "1";
  wrapper.style.overflow = "visible";
  wrapper.style.display = "flex";
  wrapper.style.justifyContent = "center";
  wrapper.style.alignItems = "center";

  const canvas = document.createElement("canvas");
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.display = "block";
  wrapper.appendChild(canvas);

  heroTextContainer.prepend(wrapper);

  // Ensure headline text sits crisply in FRONT of the 3D green cross
  const heroText = heroTextContainer.querySelector<HTMLElement>(".framer-eo1y6") ||
    document.querySelector<HTMLElement>('[data-framer-name="Hero Text"]');
  if (heroText) {
    heroText.style.zIndex = "2";
    heroText.style.position = "absolute";
    heroText.style.top = "73%";
    heroText.style.left = "50%";
    heroText.style.transform = "translate(-50%, -50%)";
    heroText.style.pointerEvents = "auto";
  }

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.45;

  // Scene & Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.set(0, 0, 5.2);
  camera.lookAt(0, 0, 0);

  // Group for the entire medical cross
  const crossGroup = new THREE.Group();
  scene.add(crossGroup);

  // Elegant, sized-down scale positioned right behind the headline text
  crossGroup.scale.set(0.72, 0.72, 0.72);
  // y = -0.35 places the center right across / slightly above the headline text
  crossGroup.position.set(0, -0.32, 0);

  // Initial clinical 3D isometric tilt
  crossGroup.rotation.x = THREE.MathUtils.degToRad(12);
  crossGroup.rotation.y = THREE.MathUtils.degToRad(-18);
  crossGroup.rotation.z = THREE.MathUtils.degToRad(-5);

  // --- GEOMETRY: BEVELED 3D GREEK MEDICAL CROSS ---
  const w = 0.38; // half width of arm
  const l = 0.95; // half length of arm
  const r = 0.08; // fillet radius

  const crossShape = new THREE.Shape();
  // Top arm
  crossShape.moveTo(-w + r, l);
  crossShape.lineTo(w - r, l);
  crossShape.quadraticCurveTo(w, l, w, l - r);
  crossShape.lineTo(w, w + r);
  crossShape.quadraticCurveTo(w, w, w + r, w);
  // Right arm
  crossShape.lineTo(l - r, w);
  crossShape.quadraticCurveTo(l, w, l, w - r);
  crossShape.lineTo(l, -w + r);
  crossShape.quadraticCurveTo(l, -w, l - r, -w);
  crossShape.lineTo(w + r, -w);
  crossShape.quadraticCurveTo(w, -w, w, -w - r);
  // Bottom arm
  crossShape.lineTo(w, -l + r);
  crossShape.quadraticCurveTo(w, -l, w - r, -l);
  crossShape.lineTo(-w + r, -l);
  crossShape.quadraticCurveTo(-w, -l, -w, -l + r);
  crossShape.lineTo(-w, -w - r);
  crossShape.quadraticCurveTo(-w, -w, -w - r, -w);
  // Left arm
  crossShape.lineTo(-l + r, -w);
  crossShape.quadraticCurveTo(-l, -w, -l, -w + r);
  crossShape.lineTo(-l, w - r);
  crossShape.quadraticCurveTo(-l, w, -l + r, w);
  crossShape.lineTo(-w - r, w);
  crossShape.quadraticCurveTo(-w, w, -w, w + r);
  // Back to top
  crossShape.lineTo(-w, l - r);
  crossShape.quadraticCurveTo(-w, l, -w + r, l);
  crossShape.closePath();

  const extrudeSettings = {
    steps: 2,
    depth: 0.38,
    bevelEnabled: true,
    bevelThickness: 0.09,
    bevelSize: 0.07,
    bevelSegments: 8,
  };

  const crossGeo = new THREE.ExtrudeGeometry(crossShape, extrudeSettings);
  crossGeo.center();

  // --- MATERIALS: VIBRANT CLINICAL EMERALD/JADE GREEN ---
  const greenBodyMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x10b981), // rich emerald medical green
    emissive: new THREE.Color(0x064e3b), // subtle self-glow
    emissiveIntensity: 0.32,
    metalness: 0.12,
    roughness: 0.14,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    transmission: 0.08,
    ior: 1.5,
    reflectivity: 0.95,
  });

  const crossMesh = new THREE.Mesh(crossGeo, greenBodyMat);
  crossMesh.castShadow = true;
  crossGroup.add(crossMesh);

  // Mint platinum core inlay contour
  const innerW = w * 0.62;
  const innerL = l * 0.72;
  const innerR = 0.04;
  const innerShape = new THREE.Shape();
  innerShape.moveTo(-innerW + innerR, innerL);
  innerShape.lineTo(innerW - innerR, innerL);
  innerShape.quadraticCurveTo(innerW, innerL, innerW, innerL - innerR);
  innerShape.lineTo(innerW, innerW + innerR);
  innerShape.quadraticCurveTo(innerW, innerW, innerW + innerR, innerW);
  innerShape.lineTo(innerL - innerR, innerW);
  innerShape.quadraticCurveTo(innerL, innerW, innerL, innerW - innerR);
  innerShape.lineTo(innerL, -innerW + innerR);
  innerShape.quadraticCurveTo(innerL, -innerW, innerL - innerR, -innerW);
  innerShape.lineTo(innerW + innerR, -innerW);
  innerShape.quadraticCurveTo(innerW, -innerW, innerW, -innerW - innerR);
  innerShape.lineTo(innerW, -innerL + innerR);
  innerShape.quadraticCurveTo(innerW, -innerL, innerW - innerR, -innerL);
  innerShape.lineTo(-innerW + innerR, -innerL);
  innerShape.quadraticCurveTo(-innerW, -innerL, -innerW, -innerL + innerR);
  innerShape.lineTo(-innerW, -innerW - innerR);
  innerShape.quadraticCurveTo(-innerW, -innerW, -innerW - innerR, -innerW);
  innerShape.lineTo(-innerL + innerR, -innerW);
  innerShape.quadraticCurveTo(-innerL, -innerW, -innerL, -innerW + innerR);
  innerShape.lineTo(-innerL, innerW - innerR);
  innerShape.quadraticCurveTo(-innerL, innerW, -innerL + innerR, innerW);
  innerShape.lineTo(-innerW - innerR, innerW);
  innerShape.quadraticCurveTo(-innerW, innerW, -innerW, innerW + innerR);
  innerShape.lineTo(-innerW, innerL - innerR);
  innerShape.quadraticCurveTo(-innerW, innerL, -innerW + innerR, innerL);
  innerShape.closePath();

  const innerGeo = new THREE.ExtrudeGeometry(innerShape, {
    steps: 1,
    depth: 0.44,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 4,
  });
  innerGeo.center();

  const innerMintMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x34d399), // radiant mint green
    metalness: 0.85,
    roughness: 0.18,
    clearcoat: 0.9,
    clearcoatRoughness: 0.08,
    reflectivity: 0.92,
  });

  const innerMesh = new THREE.Mesh(innerGeo, innerMintMat);
  crossGroup.add(innerMesh);

  // Floating luminous mint halo ring
  const ringGeo = new THREE.TorusGeometry(1.22, 0.014, 16, 80);
  const ringMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x6ee7b7), // luminous light mint
    metalness: 0.7,
    roughness: 0.28,
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = Math.PI / 4;
  ringMesh.position.z = -0.15;
  crossGroup.add(ringMesh);

  // --- LIGHTING SETUP ---
  const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
  keyLight.position.set(4, 5, 5);
  scene.add(keyLight);

  const greenRimLight = new THREE.DirectionalLight(0x34d399, 3.0);
  greenRimLight.position.set(-5, -2, -3);
  scene.add(greenRimLight);

  const softTopLight = new THREE.SpotLight(0xa7f3d0, 2.6, 14, Math.PI / 3, 0.4);
  softTopLight.position.set(0, 6, 3);
  softTopLight.target = crossGroup;
  scene.add(softTopLight);

  const mouseLight = new THREE.PointLight(0x6ee7b7, 2.4, 10);
  mouseLight.position.set(0, 0, 4);
  scene.add(mouseLight);

  // --- MOUSE & SCROLL STATE ---
  let mouseX = 0;
  let mouseY = 0;
  let targetRotX = THREE.MathUtils.degToRad(12);
  let targetRotY = THREE.MathUtils.degToRad(-18);

  const handleMouseMove = (e: MouseEvent) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = -(e.clientY / window.innerHeight) * 2 + 1;
    mouseX = nx;
    mouseY = ny;
    targetRotY = THREE.MathUtils.degToRad(-18) + nx * 0.42;
    targetRotX = THREE.MathUtils.degToRad(12) - ny * 0.32;
    mouseLight.position.x = nx * 3;
    mouseLight.position.y = ny * 3;
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    // Moves with 1st page; fades smoothly as it scrolls past the hero
    const opacity = Math.max(0, 1 - scrollY / 380);
    wrapper.style.opacity = opacity.toFixed(3);
    wrapper.style.transform = `translateY(${scrollY * 0.12}px) scale(${(1 - (1 - opacity) * 0.08).toFixed(3)})`;
  };

  const handleResize = () => {
    const width = heroTextContainer.clientWidth || window.innerWidth;
    const height = heroTextContainer.clientHeight || window.innerHeight;
    if (width === 0 || height === 0) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  window.addEventListener("mousemove", handleMouseMove, { passive: true });
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleResize);

  handleResize();
  handleScroll();

  // --- RENDER LOOP (with performance.now) ---
  let animationFrameId: number;
  let lastTime = performance.now();
  let elapsed = 0;

  const animate = (now: number) => {
    animationFrameId = requestAnimationFrame(animate);

    const delta = Math.min(0.1, (now - lastTime) * 0.001);
    lastTime = now;
    elapsed += delta;

    if (window.scrollY < 650) {
      // Gentle floating levitation
      const hoverY = Math.sin(elapsed * 1.5) * 0.06;
      const hoverZ = Math.cos(elapsed * 1.1) * 0.04;
      const hoverRotZ = Math.sin(elapsed * 0.9) * 0.025;

      crossGroup.position.y = -0.32 + hoverY;
      crossGroup.position.z = hoverZ;

      // Smooth lerp rotation toward mouse target
      crossGroup.rotation.x += (targetRotX - crossGroup.rotation.x) * 0.06;
      crossGroup.rotation.y += (targetRotY - crossGroup.rotation.y) * 0.06;
      crossGroup.rotation.z = THREE.MathUtils.degToRad(-5) + hoverRotZ + mouseX * 0.1;

      // Spin halo ring
      ringMesh.rotation.z = elapsed * 0.2;

      renderer.render(scene, camera);
    }
  };

  requestAnimationFrame((t) => {
    lastTime = t;
    animate(t);
  });

  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleResize);
    renderer.dispose();
    crossGeo.dispose();
    innerGeo.dispose();
    ringGeo.dispose();
    greenBodyMat.dispose();
    innerMintMat.dispose();
    ringMat.dispose();
    wrapper.remove();
  };
}
