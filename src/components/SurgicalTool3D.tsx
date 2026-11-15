"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SurgicalTool3D() {
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
    renderer.toneMappingExposure = 1.25;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    // Group for the entire surgical tool
    const toolGroup = new THREE.Group();
    scene.add(toolGroup);

    // Initial orientation: angled elegantly like aesthetic showcase
    toolGroup.rotation.x = THREE.MathUtils.degToRad(15);
    toolGroup.rotation.y = THREE.MathUtils.degToRad(-25);
    toolGroup.rotation.z = THREE.MathUtils.degToRad(-35);

    // --- MATERIALS ---
    // Surgical grade satin stainless steel for the handle
    const satinSteelMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xdce2ec),
      metalness: 0.92,
      roughness: 0.22,
      clearcoat: 0.5,
      clearcoatRoughness: 0.2,
      reflectivity: 0.9,
    });

    // High-polish mirror surgical steel for the blade
    const mirrorBladeMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xf4f7fa),
      metalness: 0.98,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
    });

    // Razor cutting edge material with glistening specular reflection
    const edgeBevelMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xffffff),
      metalness: 1.0,
      roughness: 0.02,
      clearcoat: 1.0,
      reflectivity: 1.0,
    });

    // Precision dark chrome for grip grooves and millimeter markings
    const darkChromeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x8a92a3),
      metalness: 0.85,
      roughness: 0.35,
    });

    // --- 1. HANDLE GEOMETRY ---
    // Ergonomic main body
    const handleLength = 3.6;
    const handleWidth = 0.26;
    const handleThickness = 0.14;

    const handleShape = new THREE.Shape();
    const hw = handleWidth / 2;
    const hl = handleLength / 2;
    const r = 0.06;

    // Rounded rectangle shape for flat ergonomic surgical handle
    handleShape.moveTo(-hw + r, -hl);
    handleShape.lineTo(hw - r, -hl);
    handleShape.quadraticCurveTo(hw, -hl, hw, -hl + r);
    handleShape.lineTo(hw * 0.85, hl - r * 2);
    handleShape.quadraticCurveTo(hw * 0.8, hl, hw * 0.6, hl);
    handleShape.lineTo(-hw * 0.6, hl);
    handleShape.quadraticCurveTo(-hw * 0.8, hl, -hw * 0.85, hl - r * 2);
    handleShape.lineTo(-hw, -hl + r);
    handleShape.quadraticCurveTo(-hw, -hl, -hw + r, -hl);

    const extrudeSettings = {
      steps: 2,
      depth: handleThickness,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 4,
    };

    const handleGeo = new THREE.ExtrudeGeometry(handleShape, extrudeSettings);
    handleGeo.center();
    const handleMesh = new THREE.Mesh(handleGeo, satinSteelMat);
    handleMesh.position.y = -0.6;
    toolGroup.add(handleMesh);

    // Ergonomic grip slots / knurling grooves on both faces
    const numGrooves = 14;
    for (let i = 0; i < numGrooves; i++) {
      const grooveY = -1.6 + i * 0.16;
      const grooveGeo = new THREE.CylinderGeometry(0.015, 0.015, handleWidth * 0.72, 8);
      const grooveMesh = new THREE.Mesh(grooveGeo, darkChromeMat);
      grooveMesh.rotation.z = Math.PI / 2;
      grooveMesh.position.set(0, grooveY, handleThickness / 2 + 0.025);
      toolGroup.add(grooveMesh);

      // Back side groove
      const grooveBack = grooveMesh.clone();
      grooveBack.position.z = -(handleThickness / 2 + 0.025);
      toolGroup.add(grooveBack);
    }

    // Surgical etched millimeter ruler markings
    for (let i = 0; i < 9; i++) {
      const markY = 0.1 + i * 0.14;
      const markWidth = i % 5 === 0 ? 0.16 : 0.09;
      const markGeo = new THREE.BoxGeometry(markWidth, 0.012, 0.005);
      const markMesh = new THREE.Mesh(markGeo, darkChromeMat);
      markMesh.position.set(-0.04, markY, handleThickness / 2 + 0.031);
      toolGroup.add(markMesh);
    }

    // --- 2. COLLAR / CHUCK (TRANSITION TO BLADE) ---
    const collarGeo = new THREE.CylinderGeometry(0.09, 0.13, 0.35, 16);
    const collarMesh = new THREE.Mesh(collarGeo, satinSteelMat);
    collarMesh.position.y = 1.25;
    toolGroup.add(collarMesh);

    // Blade locking rib / fitting
    const ribGeo = new THREE.BoxGeometry(0.06, 0.45, 0.18);
    const ribMesh = new THREE.Mesh(ribGeo, darkChromeMat);
    ribMesh.position.set(0, 1.42, 0);
    toolGroup.add(ribMesh);

    // --- 3. SURGICAL BLADE (#10 / #15 PRECISION MICRO-BLADE) ---
    const bladeShape = new THREE.Shape();
    // Start at tang base inside collar
    bladeShape.moveTo(0, 1.4);
    bladeShape.lineTo(0.05, 1.4);
    bladeShape.lineTo(0.05, 1.7);
    // Straight spine of the blade
    bladeShape.lineTo(0.04, 2.5);
    // Tip taper
    bladeShape.quadraticCurveTo(0.03, 2.8, -0.01, 2.95);
    // Razor sharp curved belly (the cutting arc)
    bladeShape.quadraticCurveTo(-0.16, 2.5, -0.19, 2.1);
    bladeShape.quadraticCurveTo(-0.21, 1.75, -0.08, 1.55);
    bladeShape.lineTo(-0.04, 1.4);
    bladeShape.closePath();

    const bladeExtrude = {
      steps: 2,
      depth: 0.02,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 4,
    };

    const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, bladeExtrude);
    bladeGeo.center();
    const bladeMesh = new THREE.Mesh(bladeGeo, mirrorBladeMat);
    bladeMesh.position.set(-0.05, 2.15, 0);
    toolGroup.add(bladeMesh);

    // Blade beveled cutting edge highlight strip
    const cuttingEdgeCurve = new THREE.CurvePath<THREE.Vector3>();
    const p1 = new THREE.Vector3(-0.11, 1.6, 0.01);
    const p2 = new THREE.Vector3(-0.24, 2.05, 0.01);
    const p3 = new THREE.Vector3(-0.21, 2.55, 0.01);
    const p4 = new THREE.Vector3(-0.06, 2.95, 0.01);

    const edgeCurve1 = new THREE.QuadraticBezierCurve3(p1, p2, p3);
    const edgeCurve2 = new THREE.QuadraticBezierCurve3(p3, new THREE.Vector3(-0.14, 2.8, 0.01), p4);
    cuttingEdgeCurve.add(edgeCurve1);
    cuttingEdgeCurve.add(edgeCurve2);

    const edgeTubeGeo = new THREE.TubeGeometry(cuttingEdgeCurve, 32, 0.01, 6, false);
    const edgeTubeMesh = new THREE.Mesh(edgeTubeGeo, edgeBevelMat);
    toolGroup.add(edgeTubeMesh);

    // Blade locking slot aperture (characteristic of surgical blades)
    const slotGeo = new THREE.BoxGeometry(0.045, 0.35, 0.08);
    const slotMesh = new THREE.Mesh(slotGeo, darkChromeMat);
    slotMesh.position.set(-0.03, 1.9, 0);
    toolGroup.add(slotMesh);

    // --- LIGHTING SETUP (CLINICAL STUDIO REFLECTION) ---
    // Soft ambient fill matching Althea palette (#d6daeb)
    const ambientLight = new THREE.AmbientLight(0xdde3f0, 1.4);
    scene.add(ambientLight);

    // Main key directional light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    // Cool clinical rim light for gleaming steel edges
    const rimLight = new THREE.DirectionalLight(0xb8d2fc, 2.6);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    // Overhead surgical spotlight
    const spotLight = new THREE.SpotLight(0xffffff, 3.2, 15, Math.PI / 4, 0.3);
    spotLight.position.set(0, 8, 4);
    spotLight.target = toolGroup;
    scene.add(spotLight);

    // Dynamic mouse light for interactive shine
    const mouseLight = new THREE.PointLight(0xffffff, 1.5, 8);
    mouseLight.position.set(0, 0, 4);
    scene.add(mouseLight);

    // --- INTERACTION & RESIZE STATE ---
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = THREE.MathUtils.degToRad(15);
    let targetRotY = THREE.MathUtils.degToRad(-25);
    let scrollY = window.scrollY;

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseX = nx;
      mouseY = ny;
      targetRotY = THREE.MathUtils.degToRad(-25) + nx * 0.45;
      targetRotX = THREE.MathUtils.degToRad(15) - ny * 0.35;
      mouseLight.position.x = nx * 3;
      mouseLight.position.y = ny * 3;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
      // Scroll fade out calculation:
      // Fades smoothly from 1 at scroll=0 to 0 by scroll=380px
      const fadeProgress = Math.min(1, Math.max(0, scrollY / 380));
      const opacity = 1 - fadeProgress;

      if (container) {
        container.style.opacity = opacity.toFixed(3);
        // Subtle upward parallax & recede
        container.style.transform = `translateY(${-scrollY * 0.18}px) scale(${1 - fadeProgress * 0.08})`;
        container.style.pointerEvents = opacity > 0.05 ? "auto" : "none";
      }
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

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // Initial size
    handleResize();
    handleScroll();

    // --- RENDER LOOP ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Only render if within scroll view
      if (scrollY < 550) {
        const elapsedTime = clock.getElapsedTime();

        // Elegant floating levitation (slow sine wave)
        const hoverY = Math.sin(elapsedTime * 1.6) * 0.12;
        const hoverZ = Math.cos(elapsedTime * 1.2) * 0.08;
        const hoverRotZ = Math.sin(elapsedTime * 1.1) * 0.04;

        toolGroup.position.y = hoverY;
        toolGroup.position.z = hoverZ;

        // Smooth lerp rotation toward mouse target
        toolGroup.rotation.x += (targetRotX - toolGroup.rotation.x) * 0.06;
        toolGroup.rotation.y += (targetRotY - toolGroup.rotation.y) * 0.06;
        toolGroup.rotation.z = THREE.MathUtils.degToRad(-35) + hoverRotZ + mouseX * 0.15;

        renderer.render(scene, camera);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      handleGeo.dispose();
      bladeGeo.dispose();
      edgeTubeGeo.dispose();
      collarGeo.dispose();
      satinSteelMat.dispose();
      mirrorBladeMat.dispose();
      edgeBevelMat.dispose();
      darkChromeMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="framer-16lf0oi"
      data-framer-name="Image 3D Container"
      style={{
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

