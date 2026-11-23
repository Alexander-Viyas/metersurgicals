"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function MedicalCross3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 5.8);

    // Group for the entire cross
    const crossGroup = new THREE.Group();
    scene.add(crossGroup);

    // Sized down as requested: scale factor 0.65
    crossGroup.scale.set(0.65, 0.65, 0.65);

    // Initial orientation: elegant clinical 3D tilt
    crossGroup.rotation.x = THREE.MathUtils.degToRad(16);
    crossGroup.rotation.y = THREE.MathUtils.degToRad(-22);
    crossGroup.rotation.z = THREE.MathUtils.degToRad(-8);

    // --- GEOMETRY: BEVELED 3D MEDICAL CROSS ---
    // Symmetrical Greek Cross with rounded corners
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

    // --- MATERIALS ---
    // Porcelain frosted alabaster with subtle pearl clearcoat & iridescence
    const porcelainMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xf5f7fb),
      metalness: 0.1,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transmission: 0.14,
      ior: 1.52,
      reflectivity: 0.95,
      specularIntensity: 1.0,
      iridescence: 0.35,
      iridescenceIOR: 1.3,
      iridescenceThicknessRange: [100, 380],
    });

    const crossMesh = new THREE.Mesh(crossGeo, porcelainMat);
    crossGroup.add(crossMesh);

    // Subtle brushed platinum core inlay contour
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

    const platinumMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xdde3ee),
      metalness: 0.88,
      roughness: 0.22,
      clearcoat: 0.6,
      clearcoatRoughness: 0.15,
      reflectivity: 0.9,
    });

    const innerMesh = new THREE.Mesh(innerGeo, platinumMat);
    crossGroup.add(innerMesh);

    // Floating delicate aesthetic halo / ring behind the cross
    const ringGeo = new THREE.TorusGeometry(1.22, 0.012, 16, 80);
    const ringMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xc8d2e4),
      metalness: 0.75,
      roughness: 0.3,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 4;
    ringMesh.position.z = -0.15;
    crossGroup.add(ringMesh);

    // --- LIGHTING SETUP ---
    const ambientLight = new THREE.AmbientLight(0xdde4f2, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xa5c2f0, 2.2);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    const softTopLight = new THREE.SpotLight(0xffffff, 2.0, 14, Math.PI / 3, 0.4);
    softTopLight.position.set(0, 6, 3);
    softTopLight.target = crossGroup;
    scene.add(softTopLight);

    // Dynamic mouse light for interactive edge specular reflections
    const mouseLight = new THREE.PointLight(0xffffff, 1.8, 8);
    mouseLight.position.set(0, 0, 4);
    scene.add(mouseLight);

    // --- INTERACTION & RESIZE STATE ---
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = THREE.MathUtils.degToRad(16);
    let targetRotY = THREE.MathUtils.degToRad(-22);
    let scrollY = window.scrollY;
    let animationFrameId: number | null = null;
    let lastFrameTime = 0;
    let accumulatedFrameTime = 0;
    const clock = new THREE.Clock();
    const renderFrameDuration = 1000 / 60;
    const visibleScrollLimit = 380;

    const stopAnimation = () => {
      if (animationFrameId === null) return;
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    };

    const animate = (frameTime: number) => {
      animationFrameId = null;
      if (scrollY >= visibleScrollLimit || document.hidden) return;

      if (lastFrameTime > 0) {
        const elapsed = frameTime - lastFrameTime;
        lastFrameTime = frameTime;
        if (elapsed < renderFrameDuration) {
          accumulatedFrameTime += elapsed;
          if (accumulatedFrameTime < renderFrameDuration) {
            animationFrameId = requestAnimationFrame(animate);
            return;
          }
          accumulatedFrameTime -= renderFrameDuration;
        } else {
          accumulatedFrameTime = 0;
        }
      } else {
        lastFrameTime = frameTime;
      }

      const t = clock.getElapsedTime();

      // Elegant floating levitation (slow breathing sine wave)
      const hoverY = Math.sin(t * 1.5) * 0.08;
      const hoverZ = Math.cos(t * 1.1) * 0.05;
      const hoverRotZ = Math.sin(t * 0.9) * 0.03;

      crossGroup.position.y = 0.2 + hoverY;
      crossGroup.position.z = hoverZ;

      // Smooth lerp rotation toward mouse target
      crossGroup.rotation.x += (targetRotX - crossGroup.rotation.x) * 0.05;
      crossGroup.rotation.y += (targetRotY - crossGroup.rotation.y + scrollY * 0.0006) * 0.05;
      crossGroup.rotation.z = THREE.MathUtils.degToRad(-8) + hoverRotZ + mouseX * 0.12;

      // Subtle independent spin for the halo ring
      ringMesh.rotation.z = t * 0.15;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (animationFrameId !== null || scrollY >= visibleScrollLimit || document.hidden) return;
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseX = nx;
      mouseY = ny;
      targetRotY = THREE.MathUtils.degToRad(-22) + nx * 0.42;
      targetRotX = THREE.MathUtils.degToRad(16) - ny * 0.32;
      mouseLight.position.x = nx * 3;
      mouseLight.position.y = ny * 3;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
      // Scroll fade out: fades smoothly to 0 by scroll=380px
      const fadeProgress = Math.min(1, Math.max(0, scrollY / visibleScrollLimit));
      const opacity = 1 - fadeProgress;

      if (container) {
        container.style.opacity = opacity.toFixed(3);
        container.style.transform = `translateY(${-scrollY * 0.2}px) scale(${1 - fadeProgress * 0.08})`;
        container.style.pointerEvents = opacity > 0.05 ? "auto" : "none";
      }

      if (scrollY < visibleScrollLimit) startAnimation();
      else stopAnimation();
    };

    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) stopAnimation();
      else handleScroll();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    handleResize();
    handleScroll();

    return () => {
      stopAnimation();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      renderer.dispose();
      crossGeo.dispose();
      innerGeo.dispose();
      ringGeo.dispose();
      porcelainMat.dispose();
      platinumMat.dispose();
      ringMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="framer-16lf0oi"
      data-framer-name="Image 3D Container"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        transition: "opacity 0.1s ease-out, transform 0.1s ease-out",
        willChange: "transform, opacity",
      }}
    >
      <div className="ssr-variant">
        <div className="framer-1pkuswc-container">
          <div
            className="framer-VSL0K framer-glo65i framer-v-glo65i"
            data-framer-name="Primary"
            style={{ height: "100%", width: "100%", transform: "none" }}
          >
            <div
              className="framer-b9uyue-container"
              data-code-component-plugin-id="84d4c1"
              data-framer-appear-id="b9uyue"
              style={{ willChange: "transform", opacity: 1, transform: "none" }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "default",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

