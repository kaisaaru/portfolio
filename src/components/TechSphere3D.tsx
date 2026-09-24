"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { skills, SkillItem } from "@/data/skills";

interface TechSphere3DProps {
  selectedSkill: SkillItem | null;
  onSelectSkill: (skill: SkillItem) => void;
}

export default function TechSphere3D({
  selectedSkill,
  onSelectSkill,
}: TechSphere3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredSkillName, setHoveredSkillName] = useState<string | null>(null);

  // References to keep event handlers and Three.js loop in sync with React
  const onSelectSkillRef = useRef(onSelectSkill);
  onSelectSkillRef.current = onSelectSkill;

  const selectedRef = useRef<string | null>(null);
  selectedRef.current = selectedSkill?.name || null;

  const hoveredRef = useRef<string | null>(null);
  hoveredRef.current = hoveredSkillName;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 500;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 320;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Master Rotational Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 2. Central Geodesic Holographic Wireframe Core
    const sphereRadius = 110;
    const coreGeo = new THREE.IcosahedronGeometry(sphereRadius * 0.96, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    masterGroup.add(coreMesh);

    // Concentric Inner Cyber Ring
    const ringGeo = new THREE.RingGeometry(sphereRadius * 0.75, sphereRadius * 0.77, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.3;
    masterGroup.add(ringMesh);

    // 3. Floating Surrounding Cyber Dust Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const r = sphereRadius * (1.1 + Math.random() * 0.4);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePositions[i] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = r * Math.cos(phi);
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 2.2,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particleSystem);

    // 4. Generate High-Res 2D Canvas Textures for each skill node
    const createBadgeTexture = (skill: SkillItem) => {
      const cvs = document.createElement("canvas");
      cvs.width = 256;
      cvs.height = 96;
      const c = cvs.getContext("2d");
      if (!c) return new THREE.CanvasTexture(cvs);

      // Card Background (frosted dark cyber)
      c.fillStyle = "rgba(7, 13, 30, 0.94)";
      c.beginPath();
      c.roundRect(8, 8, 240, 80, 16);
      c.fill();

      // Border with Skill Accent
      c.strokeStyle = skill.color || "#38BDF8";
      c.lineWidth = 3.5;
      c.stroke();

      // Inner Tech Corner Brackets
      c.fillStyle = skill.color || "#38BDF8";
      c.fillRect(16, 16, 6, 2);
      c.fillRect(16, 16, 2, 6);
      c.fillRect(234, 16, 6, 2);
      c.fillRect(238, 16, 2, 6);

      // Skill Name
      c.font = "bold 26px 'JetBrains Mono', Consolas, monospace";
      c.fillStyle = "#FFFFFF";
      c.fillText(skill.name, 26, 48);

      // Subtitle / Category Tag
      c.font = "bold 13px 'JetBrains Mono', Consolas, monospace";
      c.fillStyle = skill.color || "#38BDF8";
      c.fillText(skill.category.toUpperCase(), 26, 72);

      // Status Pill
      c.fillStyle = "rgba(56, 189, 248, 0.18)";
      c.beginPath();
      c.roundRect(165, 54, 72, 22, 6);
      c.fill();
      c.strokeStyle = "rgba(56, 189, 248, 0.4)";
      c.lineWidth = 1;
      c.stroke();

      c.font = "bold 11px monospace";
      c.fillStyle = "#38BDF8";
      c.textAlign = "center";
      c.fillText(skill.status, 201, 69);

      const texture = new THREE.CanvasTexture(cvs);
      texture.minFilter = THREE.LinearFilter;
      return texture;
    };

    // 5. Fibonacci Sphere Distribution for 17 Nodes
    const N = skills.length;
    interface NodeObject {
      skill: SkillItem;
      sprite: THREE.Sprite;
      pos: THREE.Vector3;
      baseScale: number;
    }
    const nodeObjects: NodeObject[] = [];
    const nodeCoords: THREE.Vector3[] = [];

    skills.forEach((skill, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / N);
      const theta = Math.sqrt(N * Math.PI) * phi;

      const x = sphereRadius * Math.cos(theta) * Math.sin(phi);
      const y = sphereRadius * Math.sin(theta) * Math.sin(phi);
      const z = sphereRadius * Math.cos(phi);
      const pos = new THREE.Vector3(x, y, z);
      nodeCoords.push(pos);

      const texture = createBadgeTexture(skill);
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.95,
        depthTest: false,
      });

      const sprite = new THREE.Sprite(material);
      sprite.position.copy(pos);
      const baseScale = 28;
      sprite.scale.set(baseScale * (256 / 96), baseScale, 1);

      sprite.userData = { skill };
      masterGroup.add(sprite);

      nodeObjects.push({
        skill,
        sprite,
        pos,
        baseScale,
      });
    });

    // 6. Connecting Cyber Constellation Lines
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.16,
    });
    const lineGeo = new THREE.BufferGeometry();
    const linePositions: number[] = [];

    for (let i = 0; i < nodeCoords.length; i++) {
      for (let j = i + 1; j < nodeCoords.length; j++) {
        const dist = nodeCoords[i].distanceTo(nodeCoords[j]);
        if (dist < sphereRadius * 0.92) {
          linePositions.push(
            nodeCoords[i].x, nodeCoords[i].y, nodeCoords[i].z,
            nodeCoords[j].x, nodeCoords[j].y, nodeCoords[j].z
          );
        }
      }
    }
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    masterGroup.add(lines);

    // 7. Interactive Controls & Accurate Click Detection
    let isDragging = false;
    let hasDragged = false;
    let startX = 0;
    let startY = 0;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotVelX = 0.003;
    let rotVelY = 0.002;

    const findIntersectedSkill = (clientX: number, clientY: number): SkillItem | null => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);
      const intersects = raycaster.intersectObjects(nodeObjects.map((n) => n.sprite));

      if (intersects.length > 0) {
        const target = intersects[0].object as THREE.Sprite;
        return (target.userData.skill as SkillItem) || null;
      }
      return null;
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      hasDragged = false;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      startX = clientX;
      startY = clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - prevMouseX;
        const deltaY = clientY - prevMouseY;
        // Distinguish drag from click threshold
        if (Math.abs(clientX - startX) > 5 || Math.abs(clientY - startY) > 5) {
          hasDragged = true;
        }
        rotVelX = deltaY * 0.004;
        rotVelY = deltaX * 0.004;
        prevMouseX = clientX;
        prevMouseY = clientY;
      }

      // Raycast for hover state & pointer cursor
      const skill = findIntersectedSkill(clientX, clientY);
      if (skill) {
        setHoveredSkillName(skill.name);
        canvas.style.cursor = "pointer";
      } else {
        setHoveredSkillName(null);
        canvas.style.cursor = isDragging ? "grabbing" : "grab";
      }
    };

    const onPointerUp = (e: MouseEvent | TouchEvent) => {
      // If user did not drag, it's a click/tap: select the skill immediately!
      if (!hasDragged) {
        const clientX =
          "changedTouches" in e
            ? e.changedTouches[0].clientX
            : (e as MouseEvent).clientX;
        const clientY =
          "changedTouches" in e
            ? e.changedTouches[0].clientY
            : (e as MouseEvent).clientY;
        const skill = findIntersectedSkill(clientX, clientY);
        if (skill) {
          onSelectSkillRef.current(skill);
        }
      }
      isDragging = false;
    };

    // Direct click handler for desktop mice
    const onCanvasClick = (e: MouseEvent) => {
      if (hasDragged) return;
      const skill = findIntersectedSkill(e.clientX, e.clientY);
      if (skill) {
        onSelectSkillRef.current(skill);
      }
    };

    canvas.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    canvas.addEventListener("click", onCanvasClick);

    canvas.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp, { passive: true });

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 600;
      height = container.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // 9. Main Render Loop - Continuous 3D Motion
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Continuous auto-rotation + inertia
      if (!isDragging) {
        rotVelX = THREE.MathUtils.lerp(rotVelX, 0.0015, 0.04);
        rotVelY = THREE.MathUtils.lerp(rotVelY, 0.0035, 0.04);
      }

      masterGroup.rotation.y += rotVelY;
      masterGroup.rotation.x += rotVelX;

      // Independent counter-rotation for inner rings
      ringMesh.rotation.z += 0.006;
      coreMesh.rotation.y -= 0.002;

      // Calculate depth and highlighting for each node
      const currentSelected = selectedRef.current;
      const currentHovered = hoveredRef.current;

      nodeObjects.forEach((node) => {
        const worldPos = new THREE.Vector3();
        node.sprite.getWorldPosition(worldPos);
        const distFromCamera = camera.position.distanceTo(worldPos);

        const depthFactor = THREE.MathUtils.clamp(
          (380 - distFromCamera) / 160,
          0.4,
          1.25
        );

        const isSelected = currentSelected === node.skill.name;
        const isHovered = currentHovered === node.skill.name;

        let targetScale = node.baseScale * depthFactor;
        let targetOpacity = 0.9 * depthFactor;

        if (isSelected || isHovered) {
          targetScale *= 1.4;
          targetOpacity = 1.0;
        }

        node.sprite.scale.set(
          targetScale * (256 / 96),
          targetScale,
          1
        );
        node.sprite.material.opacity = THREE.MathUtils.lerp(
          node.sprite.material.opacity,
          targetOpacity,
          0.12
        );
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      canvas.removeEventListener("click", onCanvasClick);
      canvas.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);

      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      nodeObjects.forEach((n) => {
        n.sprite.material.map?.dispose();
        n.sprite.material.dispose();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420px] sm:h-[480px] md:h-[540px] rounded-2xl bg-[#070D1E]/70 border border-[#1E293B] shadow-[0_0_40px_rgba(56,189,248,0.08)] overflow-hidden flex items-center justify-center select-none"
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab" />

      {/* Top Left Telemetry Tag */}
      <div className="absolute top-3.5 left-4 flex items-center gap-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
        <span className="text-[11px] font-mono text-[#94A3B8]">
          THREE_JS // HOLOGRAPHIC_ORBITAL_SPHERE
        </span>
      </div>

      {/* Interactive Controls Guide Tip */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-[#94A3B8] pointer-events-none">
        <span className="hidden sm:inline">DRAG TO ROTATE 3D SPHERE · CLICK ANY NODE TO INSPECT</span>
        <span className="sm:hidden">DRAG TO ROTATE · TAP NODE</span>
        <span className="text-[#38BDF8]">
          {hoveredSkillName ? `HOVERED: ${hoveredSkillName}` : "AUTOROTATE: ACTIVE"}
        </span>
      </div>
    </div>
  );
}
