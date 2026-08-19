import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaFileDownload } from 'react-icons/fa';
import '../index.css'; // Ensure tailwind and global styles are applied

gsap.registerPlugin(ScrollTrigger);

export default function Technology() {
  const canvasRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // ─── THREE.JS SCENE SETUP ───
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const bgHex = 0xf6f3ea; // Match light theme for mobile or transparent
    scene.fog = new THREE.FogExp2(bgHex, 0.035);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1.8, 15); // Shifted up for split view without overlap
    camera.lookAt(0, 1.3, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // ─── REUSABLE MATERIALS ───
    const matBody = new THREE.MeshStandardMaterial({ color: 0x8a8c8e, metalness: 0.4, roughness: 0.6 });
    const matDoor = new THREE.MeshStandardMaterial({ color: 0x909295, metalness: 0.35, roughness: 0.5 });
    const matBrushedSteel = new THREE.MeshStandardMaterial({ color: 0xd0d0d0, metalness: 0.9, roughness: 0.2 });
    const matInterior = new THREE.MeshStandardMaterial({ color: 0xe0d8ba, metalness: 0.6, roughness: 0.3 });
    const matTray = new THREE.MeshStandardMaterial({ color: 0xbcbcbc, metalness: 0.9, roughness: 0.2, transparent: true, opacity: 0.85 });
    const matDisplayBg = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.3, roughness: 0.5 });
    const matDisplayLED = new THREE.MeshStandardMaterial({ color: 0xff3300, emissive: 0xff2200, emissiveIntensity: 2.0 });
    const matRedButton = new THREE.MeshStandardMaterial({ color: 0xdd0000, emissive: 0x990000, emissiveIntensity: 0.5, metalness: 0.4, roughness: 0.3 });
    const matGauge = new THREE.MeshStandardMaterial({ color: 0xeeeeee, metalness: 0.3, roughness: 0.4 });
    const matGaugeRim = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.9, roughness: 0.15 });
    const matWheel = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.3, roughness: 0.7 });
    const matWheelBracket = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.7, roughness: 0.3 });
    const matGrille = new THREE.MeshStandardMaterial({ color: 0x6a6a6a, metalness: 0.6, roughness: 0.4 });

    // ─── GEOMETRY DIMENSIONS ───
    const BODY_W = 3.6, BODY_H = 4.8, BODY_D = 3.2, WALL = 0.08, PANEL_W = 0.35;
    const DOOR_W = (BODY_W - PANEL_W) / 2;
    const DOOR_H = BODY_H * 0.65;
    const DOOR_D = 0.06;

    const machineGroup = new THREE.Group();
    scene.add(machineGroup);

    // Main Outer Frame
    const backGeo = new THREE.BoxGeometry(BODY_W, BODY_H, WALL);
    const back = new THREE.Mesh(backGeo, matBody);
    back.position.set(0, BODY_H / 2, -BODY_D / 2);
    machineGroup.add(back);

    const topGeo = new THREE.BoxGeometry(BODY_W, WALL, BODY_D);
    const top = new THREE.Mesh(topGeo, matBody);
    top.position.set(0, BODY_H, 0);
    machineGroup.add(top);

    const bottom = new THREE.Mesh(topGeo, matBody);
    bottom.position.set(0, 0, 0);
    machineGroup.add(bottom);

    const sideGeo = new THREE.BoxGeometry(WALL, BODY_H, BODY_D);
    const leftSide = new THREE.Mesh(sideGeo, matBody);
    leftSide.position.set(-BODY_W / 2, BODY_H / 2, 0);
    machineGroup.add(leftSide);

    const rightSide = new THREE.Mesh(sideGeo, matBody);
    rightSide.position.set(BODY_W / 2, BODY_H / 2, 0);
    machineGroup.add(rightSide);

    const interiorGeo = new THREE.BoxGeometry(BODY_W - WALL * 2, BODY_H - WALL * 2, 0.02);
    const interior = new THREE.Mesh(interiorGeo, matInterior);
    interior.position.set(0, BODY_H / 2, -BODY_D / 2 + WALL + 0.01);
    machineGroup.add(interior);

    // Doors & Hinged Pivots
    const doorY = BODY_H * 0.35;
    const doorZ = BODY_D / 2;
    const doorGeo = new THREE.BoxGeometry(DOOR_W, DOOR_H, DOOR_D);

    const leftDoorPivot = new THREE.Group();
    leftDoorPivot.position.set(-PANEL_W / 2, doorY, doorZ);
    machineGroup.add(leftDoorPivot);

    const leftDoor = new THREE.Mesh(doorGeo, matDoor);
    leftDoor.position.set(-DOOR_W / 2, 0, DOOR_D / 2);
    leftDoorPivot.add(leftDoor);

    const rightDoorPivot = new THREE.Group();
    rightDoorPivot.position.set(PANEL_W / 2, doorY, doorZ);
    machineGroup.add(rightDoorPivot);

    const rightDoor = new THREE.Mesh(doorGeo, matDoor);
    rightDoor.position.set(DOOR_W / 2, 0, DOOR_D / 2);
    rightDoorPivot.add(rightDoor);

    // Center Siemens Control Panel Strip
    const controlPanelGroup = new THREE.Group();
    controlPanelGroup.position.set(0, doorY, doorZ + 0.01);
    machineGroup.add(controlPanelGroup);

    const stripGeo = new THREE.BoxGeometry(PANEL_W, BODY_H * 0.75, 0.03);
    const strip = new THREE.Mesh(stripGeo, matBrushedSteel);
    controlPanelGroup.add(strip);

    const displayBgGeo = new THREE.BoxGeometry(0.2, 0.12, 0.02);
    const displayBg = new THREE.Mesh(displayBgGeo, matDisplayBg);
    displayBg.position.set(0, DOOR_H * 0.25, 0.025);
    controlPanelGroup.add(displayBg);

    const ledGeo = new THREE.BoxGeometry(0.14, 0.04, 0.005);
    const led1 = new THREE.Mesh(ledGeo, matDisplayLED);
    led1.position.set(0, DOOR_H * 0.27, 0.04);
    controlPanelGroup.add(led1);

    const buttonGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.025, 16);
    const button = new THREE.Mesh(buttonGeo, matRedButton);
    button.rotation.x = Math.PI / 2;
    button.position.set(0, DOOR_H * 0.12, 0.03);
    controlPanelGroup.add(button);

    // Pressure Gauges
    [0.0, -0.12].forEach(yOffset => {
      const rimGeo = new THREE.TorusGeometry(0.08, 0.008, 8, 32);
      const rim = new THREE.Mesh(rimGeo, matGaugeRim);
      rim.position.set(0, DOOR_H * yOffset, 0.03);
      controlPanelGroup.add(rim);

      const faceGeo = new THREE.CircleGeometry(0.075, 32);
      const face = new THREE.Mesh(faceGeo, matGauge);
      face.position.set(0, DOOR_H * yOffset, 0.028);
      controlPanelGroup.add(face);
    });

    // Internal Trays & Heating Elements
    const trayCount = 5;
    const trayW = DOOR_W - 0.15;
    const trayD = BODY_D - 0.3;
    const trayGeo = new THREE.BoxGeometry(trayW, 0.02, trayD);
    const spacing = (DOOR_H * 0.85) / (trayCount + 1);

    const traysLeft = [];
    const traysRight = [];

    for (let i = 0; i < trayCount; i++) {
      const yPos = -DOOR_H * 0.4 + spacing * (i + 1);

      const trayL = new THREE.Mesh(trayGeo, matTray.clone());
      trayL.position.set(-PANEL_W / 2 - DOOR_W / 2, BODY_H * 0.35 + yPos, 0);
      machineGroup.add(trayL);
      traysLeft.push(trayL);

      const trayR = new THREE.Mesh(trayGeo, matTray.clone());
      trayR.position.set(PANEL_W / 2 + DOOR_W / 2, BODY_H * 0.35 + yPos, 0);
      machineGroup.add(trayR);
      traysRight.push(trayR);
    }

    // Top & Side Ventilation Grilles
    const slotCount = 8;
    const slotW = BODY_W * 0.6;
    const slotH = 0.015;
    const slotGap = 0.03;
    const slotGeo = new THREE.BoxGeometry(slotW, slotH, 0.01);

    for (let i = 0; i < slotCount; i++) {
      const slatTop = new THREE.Mesh(slotGeo, matGrille);
      slatTop.position.set(0, BODY_H - 0.15 - i * slotGap, BODY_D / 2 + 0.01);
      machineGroup.add(slatTop);
    }

    // Wheels
    const wheelPositions = [
      [-BODY_W / 2 + 0.25, -0.15, BODY_D / 2 - 0.25],
      [BODY_W / 2 - 0.25, -0.15, BODY_D / 2 - 0.25],
      [-BODY_W / 2 + 0.25, -0.15, -BODY_D / 2 + 0.25],
      [BODY_W / 2 - 0.25, -0.15, -BODY_D / 2 + 0.25]
    ];

    wheelPositions.forEach(pos => {
      const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 0.08), matWheelBracket);
      bracket.position.set(pos[0], pos[1] + 0.06, pos[2]);
      machineGroup.add(bracket);

      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16), matWheel);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(pos[0], pos[1], pos[2]);
      machineGroup.add(wheel);
    });

    machineGroup.scale.set(0.85, 0.85, 0.85); // Scale down slightly
    machineGroup.position.y = 0.0; // Shift up to clear the bottom white panel
    machineGroup.rotation.y = -0.15; // Initial angle

    // ─── LIGHTING SETUP ───
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x88aacc, 0.6, 20);
    fillLight.position.set(-6, 4, 3);
    scene.add(fillLight);

    const internalLightL = new THREE.PointLight(0xffdd88, 0, 5); 
    internalLightL.position.set(-PANEL_W / 2 - DOOR_W / 2, BODY_H * 0.7, 0);
    machineGroup.add(internalLightL);

    const internalLightR = new THREE.PointLight(0xffdd88, 0, 5);
    internalLightR.position.set(PANEL_W / 2 + DOOR_W / 2, BODY_H * 0.7, 0);
    machineGroup.add(internalLightR);

    // Initial doors completely closed
    leftDoorPivot.rotation.y = 0;
    rightDoorPivot.rotation.y = 0;

    // ─── ANIMATION LOOP ───
    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (machineGroup && machineGroup.userData.thermalActive) {
        const t = Date.now() * 0.001;
        [...traysLeft, ...traysRight].forEach((tray, i) => {
          const heat = (Math.sin(t * 2.5 + i * 0.6) + 1) / 2;
          tray.material.color.setRGB(0.85 + heat * 0.15, 0.3 + heat * 0.5, heat * 0.05);
        });
      }
      renderer.render(scene, camera);
    };
    animate();

    // ─── RESIZE LISTENER ───
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // ─── GSAP MASTER SCROLLTIMELINE ───
    let ctx;
    const initTimer = setTimeout(() => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: 'top top',
            end: '+=600%',
            pin: true,
            scrub: 1,
          }
        });

      // Reset cards to start off-screen right
      gsap.set('.info-card:not(.card-shell)', { autoAlpha: 0, x: 50 });
      gsap.set('.title-container', { autoAlpha: 1, y: 0 });
      gsap.set('.dot:not(.dot-1)', { opacity: 0.3 }); // Reset all dots except first
      
      // Initially visible elements (No empty box!)
      gsap.set('.card-shell', { autoAlpha: 1, x: 0 });
      gsap.set('.dot-1', { opacity: 1 });
      
      // Reset camera to zoom in on the machine for the intro
      gsap.set(camera.position, { x: 0, y: 1.8, z: 12 });
      
      // Hide info panel initially (pushed off-screen downwards)
      gsap.set('#info-panel', { yPercent: 120 });

      // Phase 1: X-Ray Teardown (Shell)
      // Fade out title, slide up info panel, and pull camera back to normal size
      tl.to('.title-container, .scroll-indicator', { autoAlpha: 0, y: -20, duration: 0.5 }, 0.5);
      tl.to('#info-panel', { yPercent: 0, duration: 0.5, ease: "power2.out" }, 0.5);
      tl.to(camera.position, { z: 15, duration: 0.5, ease: "power2.out" }, 0.5);
      
      tl.to(machineGroup.rotation, { y: 0, duration: 1 }, 1);
      tl.to(leftDoorPivot.rotation, { y: -Math.PI * 0.6, duration: 1 }, 1);
      tl.to(rightDoorPivot.rotation, { y: Math.PI * 0.6, duration: 1 }, 1);
      tl.to(internalLightL, { intensity: 1.5, duration: 1 }, 1);
      tl.to(internalLightR, { intensity: 1.5, duration: 1 }, 1);
      
      // Transition 1 -> 2
      tl.to('.card-shell', { autoAlpha: 0, x: -50, duration: 0.5, ease: "power2.in" }, 2.5);
      tl.to('.dot-1', { opacity: 0.3, duration: 0.3 }, 2.5);
      tl.to('.dot-2', { opacity: 1, duration: 0.3 }, 2.8);
      tl.to('.card-foam', { autoAlpha: 1, x: 0, duration: 0.6, ease: "power2.out" }, 3.0);
      
      // Transition 2 -> 3
      tl.to('.card-foam', { autoAlpha: 0, x: -50, duration: 0.5, ease: "power2.in" }, 4.5);
      tl.to('.dot-2', { opacity: 0.3, duration: 0.3 }, 4.5);
      
      // Cinematic Zoom 1: Zoom in tightly on the drying trays
      tl.to(camera.position, { y: 0.5, z: 9, duration: 1, ease: "power2.inOut" }, 4.5);
      
      tl.to('.dot-3', { opacity: 1, duration: 0.3 }, 4.8);
      tl.to('.card-trays', { autoAlpha: 1, x: 0, duration: 0.6, ease: "power2.out" }, 5.0);

      // Transition 3 -> 4 (Thermal)
      tl.to('.card-trays', { autoAlpha: 0, x: -50, duration: 0.5, ease: "power2.in" }, 6.5);
      tl.to('.dot-3', { opacity: 0.3, duration: 0.3 }, 6.5);
      
      // Cinematic Zoom 2: Pull back slightly to see the rotation
      tl.to(camera.position, { y: 1.2, z: 12, duration: 1, ease: "power2.inOut" }, 6.5);
      
      tl.to(machineGroup.rotation, { y: -0.5, duration: 1 }, 6.8);
      tl.call(() => { machineGroup.userData.thermalActive = true; }, null, 6.8);
      tl.to('.dot-4', { opacity: 1, duration: 0.3 }, 6.8);
      tl.to('.card-thermal', { autoAlpha: 1, x: 0, duration: 0.6, ease: "power2.out" }, 7.0);

      // Transition 4 -> 5 (Command Center) - Machine stays rotated, no doors close yet
      tl.to('.card-thermal', { autoAlpha: 0, x: -50, duration: 0.5, ease: "power2.in" }, 8.5);
      tl.to('.dot-4', { opacity: 0.3, duration: 0.3 }, 8.5);
      
      // Cinematic Zoom 3: Pan camera left to place the machine on the right side of the screen, slightly zoomed out
      tl.to(camera.position, { x: -2.2, y: 1.8, z: 12, duration: 1, ease: "power2.inOut" }, 8.5);
      
      tl.to('.dot-5', { opacity: 1, duration: 0.3 }, 8.8);
      tl.to('.command-pillar-overlay', { autoAlpha: 1, duration: 0.6, ease: "power2.out" }, 8.8);
      tl.to('.card-command', { autoAlpha: 1, x: 0, duration: 0.6, ease: "power2.out" }, 9.0);

      // Transition 5 -> 6 (ROI) - Doors close, rotation back to front
      tl.to('.card-command', { autoAlpha: 0, x: -50, duration: 0.5, ease: "power2.in" }, 10.5);
      tl.to('.command-pillar-overlay', { autoAlpha: 0, duration: 0.5, ease: "power2.in" }, 10.5);
      tl.to('.dot-5', { opacity: 0.3, duration: 0.3 }, 10.5);
      
      // Cinematic Zoom 4: Pull all the way back to default view
      tl.to(camera.position, { x: 0, y: 1.8, z: 15, duration: 1, ease: "power2.inOut" }, 10.5);
      
      tl.call(() => {
        machineGroup.userData.thermalActive = false;
        [...traysLeft, ...traysRight].forEach(tray => {
          tray.material.color.setHex(0xbcbcbc);
        });
      }, null, 10.8);
      tl.to(leftDoorPivot.rotation, { y: 0, duration: 1 }, 10.8);
      tl.to(rightDoorPivot.rotation, { y: 0, duration: 1 }, 10.8);
      tl.to(internalLightL, { intensity: 0, duration: 0.5 }, 10.8);
      tl.to(internalLightR, { intensity: 0, duration: 0.5 }, 10.8);
      tl.to(machineGroup.rotation, { y: 0.2, duration: 1 }, 10.8);
      
      tl.to('.dot-6', { opacity: 1, duration: 0.3 }, 11.5);
      tl.to('.card-roi', { autoAlpha: 1, x: 0, duration: 0.6, ease: "power2.out" }, 11.5);
      
      // Hold the last frame before unpinning (keep ROI card visible!)
      tl.set({}, {}, 13.0);
    }, scrollContainerRef);
    ScrollTrigger.refresh();
  }, 500);

    return () => {
      clearTimeout(initTimer);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
      renderer.dispose();
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div className="relative w-full bg-bg min-h-screen text-primary-text overflow-x-hidden font-sans">
      
      {/* Scroll Timeline - Pinned section */}
      <div id="scroll-container" ref={scrollContainerRef} className="relative w-full h-[100svh] z-10 overflow-hidden bg-bg">
          
          {/* Top 72% - 3D Visual Zone */}
          <div className="absolute top-0 left-0 w-full h-[72%] z-0 pointer-events-none">
            <canvas id="webgl-canvas" ref={canvasRef} className="w-full h-[100svh] absolute top-0 left-0"></canvas>
          </div>

          {/* Title Area (Fades out) */}
          <div className="absolute top-12 left-0 w-full px-6 flex flex-col items-center justify-start z-10 pointer-events-none title-container">
              <div className="inline-block px-3 py-1 mb-2 border border-accent/20 rounded text-xs text-accent tracking-wider uppercase">The Living Blueprint</div>
              <h1 className="text-4xl font-bold tracking-tight text-primary-text">CALOR MEGA</h1>
          </div>
          
          {/* Command Center 2D Image Overlay (Phase 5) */}
          <div className="absolute top-[20%] left-6 w-32 h-[50%] z-10 pointer-events-none command-pillar-overlay opacity-0 flex items-center">
              <img src="/assets/command-center-pillar.png" alt="Command Center" className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] relative z-10" />
              
              {/* Elegant Connector Line pointing to the 3D machine */}
              <div className="absolute left-[90%] top-1/2 w-[35vw] max-w-[140px] h-[2px] bg-gradient-to-r from-accent/80 to-transparent flex items-center z-0">
                  <div className="absolute -left-1 w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(255,138,0,0.8)]"></div>
                  <div className="absolute right-0 w-2 h-2 rounded-full bg-accent animate-ping opacity-80"></div>
              </div>
          </div>
          
          {/* Scroll Indicator (Fades out) */}
          <div className="absolute bottom-12 left-0 w-full flex flex-col items-center z-10 pointer-events-none scroll-indicator animate-pulse opacity-80">
              <span className="text-sm font-medium tracking-wide mb-2 text-primary-text">Scroll down to explore</span>
              <div className="w-px h-10 bg-accent/30"></div>
              <svg className="w-5 h-5 mt-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
          </div>
          
          {/* Bottom 28% - Solid Info Panel Zone (Carousel) */}
          <div id="info-panel" className="absolute bottom-0 left-0 w-full h-[28%] bg-surface border-t border-border shadow-[0_-20px_40px_rgba(0,0,0,0.05)] z-20 flex flex-col pt-6 px-6 pb-2 rounded-t-[2rem]">
              <div className="relative w-full flex-1 max-w-sm mx-auto overflow-hidden">
                  
                  {/* Info Cards (Sliding in and out via GSAP) */}
                  <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 text-left info-card card-shell opacity-0">
                      <h3 className="text-accent font-bold text-xl mb-2 flex items-center gap-2">
                          SS 304 Shell
                      </h3>
                      <p className="text-sm text-secondary-text leading-relaxed">10x10 foot premium food-grade construction. Zero contamination design ensures maximum purity.</p>
                  </div>
                  
                  <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 text-left info-card card-foam opacity-0">
                      <h3 className="text-[#00b0ff] font-bold text-xl mb-2 flex items-center gap-2">
                          Thermal Insulation
                      </h3>
                      <p className="text-sm text-secondary-text leading-relaxed">High-density rockwool foam retains 99% of internal heat, significantly reducing power consumption.</p>
                  </div>

                  <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 text-left info-card card-trays opacity-0">
                      <h3 className="text-[#ff4e00] font-bold text-xl mb-2 flex items-center gap-2">
                          Drying Trays
                      </h3>
                      <p className="text-sm text-secondary-text leading-relaxed">Precision electric heating elements embedded directly into the removable SS304 mesh tray racks.</p>
                  </div>

                  <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 text-left info-card card-thermal opacity-0">
                      <h3 className="text-[#ff4e00] font-bold text-xl mb-2 flex items-center gap-2">
                          Thermal Dynamics
                      </h3>
                      <p className="text-sm text-secondary-text leading-relaxed">Live heat-mapping proves uniform thermal distribution across all trays. Eliminates cold spots entirely.</p>
                  </div>

                  <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 text-left info-card card-command opacity-0">
                      <h3 className="text-[#ffcc00] font-bold text-xl mb-2 flex items-center gap-2">
                          Command Center
                      </h3>
                      <p className="text-sm text-secondary-text leading-relaxed">Industrial-grade digital PID controllers, intuitive LED readouts, and fail-safe analog pressure gauges.</p>
                  </div>

                  <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 text-left info-card card-roi opacity-0">
                      <h3 className="text-[#25D366] font-bold text-xl mb-2 flex items-center gap-2">
                          Max Efficiency
                      </h3>
                      <p className="text-sm text-secondary-text leading-relaxed">Dual ventilation grilles optimize cross-flow aerodynamics. Superior heat retention translates to faster ROI.</p>
                  </div>
              </div>

              {/* Progress Timeline Dots */}
              <div className="w-full flex items-center justify-center gap-3 pb-6 pt-2 dot-container relative z-10">
                  <div className="w-2 h-2 rounded-full bg-accent dot dot-1 opacity-30 shadow-[0_0_8px_currentColor]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#00b0ff] dot dot-2 opacity-30 shadow-[0_0_8px_currentColor]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#ff4e00] dot dot-3 opacity-30 shadow-[0_0_8px_currentColor]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#ff4e00] dot dot-4 opacity-30 shadow-[0_0_8px_currentColor]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#ffcc00] dot dot-5 opacity-30 shadow-[0_0_8px_currentColor]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#25D366] dot dot-6 opacity-30 shadow-[0_0_8px_currentColor]"></div>
              </div>
          </div>
      </div>

      {/* Technical Data Sheet Section (From Desktop Version) */}
      <section id="datasheet" className="bg-bg text-primary-text py-16 px-4">
        <div className="mx-auto max-w-sm">
          <div className="mb-8 text-center">
            <div className="inline-block px-3 py-1 mb-3 bg-accent/10 text-accent rounded-full text-xs font-bold tracking-wider uppercase border border-accent/20">Engineering Specs</div>
            <h2 className="text-3xl font-bold font-outfit mb-2">Technical Data Sheet</h2>
            <div className="text-sm text-secondary-text">CALOR MEGA Batch System Parameters</div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border shadow-sm mb-10">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface border-b border-border">
                <tr>
                  <th className="p-4 font-bold text-primary-text">Specification</th>
                  <th className="p-4 font-bold text-primary-text">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-bg">
                <tr>
                  <td className="p-4 font-semibold text-primary-text">Construction</td>
                  <td className="p-4 text-secondary-text">Double-walled SS304. Reinforced framing.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-primary-text">Insulation</td>
                  <td className="p-4 text-secondary-text">75mm high-density rockwool / mineral wool.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-primary-text">Control System</td>
                  <td className="p-4 text-secondary-text">PID Digital Controller. Pt100 RTD sensor.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-primary-text">Capacity</td>
                  <td className="p-4 text-secondary-text">50 kg, 100 kg, 200 kg, 500 kg, and custom.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-primary-text">Drying Trays</td>
                  <td className="p-4 text-secondary-text">Removable SS304 mesh tray racks.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-primary-text">Heating</td>
                  <td className="p-4 text-secondary-text">Finned stainless steel armored electric.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-primary-text">Airflow</td>
                  <td className="p-4 text-secondary-text">Direct-drive axial flow fans.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-primary-text">Temperature</td>
                  <td className="p-4 text-secondary-text">Ambient to 90°C (±1°C accuracy).</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Download Brochure CTA */}
          <div className="bg-brand-light border border-border rounded-2xl p-6 text-center flex flex-col items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center text-xl">
              <FaFileDownload />
            </div>
            <div>
              <h3 className="font-bold text-primary-text text-lg mb-1">Technical Blueprints</h3>
              <p className="text-sm text-secondary-text">Download full dimensional drawings & wiring guides.</p>
            </div>
            <a
              href="/assets/downloads/CALOR_MEGA_Specs.pdf"
              download="CALOR_MEGA_Specs.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-soft"
            >
              <FaFileDownload /> Download PDF
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
