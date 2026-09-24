"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FiCheck,
  FiCode,
  FiCpu,
  FiCamera,
} from "react-icons/fi";
import { RiRobotLine, RiTranslate2 } from "react-icons/ri";
import { TbInfinity } from "react-icons/tb";

interface CinematicIntroProps {
  onComplete: () => void;
}

// 5 Katakana plates: ka i sa - ru (カ イ サ ー ル)
const NAME_PLATES = [
  { katakana: "カ", romaji: "KA", id: "01", rotZ: -5, rotY: 14, delay: 0 },
  { katakana: "イ", romaji: "I", id: "02", rotZ: -2.5, rotY: 7, delay: 0.08 },
  { katakana: "サ", romaji: "SA", id: "03", rotZ: 0, rotY: 0, delay: 0.16 },
  { katakana: "ー", romaji: "—", id: "04", rotZ: 2.5, rotY: -7, delay: 0.24 },
  { katakana: "ル", romaji: "RU", id: "05", rotZ: 5, rotY: -14, delay: 0.32 },
];

// Connected satellite nodes branching out far into the cyber constellation
const SATELLITE_NODES = [
  // RIGHT CLUSTER
  {
    id: "node-dev",
    icon: FiCode,
    label: "DEV",
    baseDx: 315, // horizontal distance from center
    baseDy: -115, // vertical distance from center
    delay: 0.1,
    retractDelay: 0.0,
  },
  {
    id: "node-devops",
    icon: TbInfinity,
    label: "DEVOPS",
    baseDx: 355,
    baseDy: 5,
    delay: 0.22,
    retractDelay: 0.04,
  },
  {
    id: "node-dcm22",
    icon: FiCamera,
    label: "DCM22_CAM",
    baseDx: 300,
    baseDy: 120,
    delay: 0.34,
    retractDelay: 0.08,
  },
  // LEFT CLUSTER
  {
    id: "node-ai",
    icon: FiCpu,
    label: "NEURAL_AI",
    baseDx: -315,
    baseDy: -115,
    delay: 0.46,
    retractDelay: 0.12,
  },
  {
    id: "node-japanese",
    icon: RiTranslate2,
    label: "JAPANESE",
    baseDx: -355,
    baseDy: 5,
    delay: 0.58,
    retractDelay: 0.16,
  },
  {
    id: "node-companion",
    icon: RiRobotLine,
    label: "VIRTUAL_COMPANION",
    baseDx: -300,
    baseDy: 120,
    delay: 0.7,
    retractDelay: 0.2,
  },
];

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const finishedRef = useRef<boolean>(false);

  const [scaleFactor, setScaleFactor] = useState(0.35);
  const [isTurned, setIsTurned] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [showPlates, setShowPlates] = useState(false);
  const [isRetracting, setIsRetracting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [scanLaserPos, setScanLaserPos] = useState(0);
  const [faceVerified, setFaceVerified] = useState(false);
  const [absorbShockwave, setAbsorbShockwave] = useState(false);

  // Responsive scale factor for mobile screens
  useEffect(() => {
    const updateScale = () => {
      if (typeof window !== "undefined") {
        const w = window.innerWidth;
        if (w < 360) {
          setScaleFactor(0.24);
        } else if (w < 400) {
          setScaleFactor(0.28);
        } else if (w < 480) {
          setScaleFactor(0.34);
        } else if (w < 640) {
          setScaleFactor(0.42);
        } else if (w < 768) {
          setScaleFactor(0.60);
        } else if (w < 1024) {
          setScaleFactor(0.80);
        } else {
          setScaleFactor(1);
        }
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Safe single-execution completion handler to prevent any looping
  const handleFinish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setIsExiting(true);

    // Direct transition to main page
    setTimeout(() => {
      onComplete();
    }, 450);
  };

  // Background Canvas: Detective Conan Movie 22 style Cyber Camera Node Network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      isCamera: boolean;
      pulse: number;
      pulseSpeed: number;
    }

    const nodes: Node[] = [];
    const nodeCount = Math.floor(Math.min(width, height) / 36);

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 2,
        isCamera: i % 4 === 0,
        pulse: Math.random() * Math.PI,
        pulseSpeed: 0.03 + Math.random() * 0.04,
      });
    }

    let tick = 0;
    const render = () => {
      tick++;
      ctx.fillStyle = "#050811";
      ctx.fillRect(0, 0, width, height);

      // Subtle cyber grid
      ctx.strokeStyle = "rgba(56, 189, 248, 0.035)";
      ctx.lineWidth = 1;
      const gridSize = 45;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Connect nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.35;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();

            // Optical data pulse
            if ((tick + i * 5) % 90 === 0) {
              const t = ((tick * 2) % 100) / 100;
              const px = n.x + (m.x - n.x) * t;
              const py = n.y + (m.y - n.y) * t;
              ctx.fillStyle = "#38BDF8";
              ctx.shadowColor = "#38BDF8";
              ctx.shadowBlur = 8;
              ctx.fillRect(px - 2, py - 2, 4, 4);
              ctx.shadowBlur = 0;
            }
          }
        }

        const glow = (Math.sin(n.pulse) + 1) / 2;
        if (n.isCamera) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.4 + glow * 0.4})`;
          ctx.lineWidth = 1.5;
          ctx.strokeRect(n.x - 9, n.y - 6, 18, 12);
          ctx.beginPath();
          ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(56, 189, 248, ${0.3 + glow * 0.5})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Main Intro Timeline Management (Runs ONCE on mount with zero restart loop)
  useEffect(() => {
    const startTime = Date.now();
    const duration = 4800; // 4.8 seconds total

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const curProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(curProgress);

      // Laser scan sweep pos
      setScanLaserPos((elapsed % 1100) / 1100);

      // Timeline Event Sequence:
      // 0.0s - 1.3s: Face Recognition & Landmark Tracking
      if (elapsed >= 1300) {
        setFaceVerified(true);
      }

      // 1.55s: Flash & 3D Turn-around
      if (elapsed >= 1550) {
        setIsTurned(true);
      }
      if (elapsed >= 1550 && elapsed < 1850) {
        setShowFlash(true);
      } else {
        setShowFlash(false);
      }

      // 2.4s: Katakana name plates float in
      if (elapsed >= 2400) {
        setShowPlates(true);
      }

      // 3.65s: Verification complete -> Lines and nodes retract back into photo
      if (elapsed >= 3650) {
        setIsRetracting(true);
      }

      // 4.05s: Shockwave pulse when photo absorbs all data
      if (elapsed >= 4050) {
        setAbsorbShockwave(true);
      }

      // 4.45s: Smooth exit directly to main site (NO LOOPING)
      if (elapsed >= 4450) {
        clearInterval(interval);
        handleFinish();
      }
    }, 30);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="cinematic-intro-facerecon"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "brightness(1.5) blur(10px)",
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[99990] bg-[#050811] flex flex-col justify-between overflow-hidden select-none font-mono max-w-[100vw] w-screen h-screen"
        >
          {/* Background Canvas: Cyber Camera Node Network */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

          {/* Vignette & Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#050811_92%)] pointer-events-none" />
          <div className="absolute inset-0 scanlines pointer-events-none opacity-20" />

          {/* Flash burst effect on turn-around */}
          <AnimatePresence>
            {showFlash && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 z-50 bg-gradient-to-r from-transparent via-[#38BDF8]/40 to-transparent pointer-events-none mix-blend-screen"
                style={{
                  boxShadow: "inset 0 0 100px rgba(56, 189, 248, 0.9)",
                }}
              />
            )}
          </AnimatePresence>

          {/* Top Cyber Telemetry Bar (Clean & Minimalist, no audio or skip buttons) */}
          <div className="relative z-20 w-full px-3.5 py-3 sm:px-8 sm:py-6 flex items-center justify-between overflow-hidden gap-2">
            {/* Left Telemetry */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm text-[#38BDF8] tracking-wider sm:tracking-widest uppercase truncate min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping shrink-0" />
              <span className="font-bold drop-shadow-[0_0_8px_#38bdf8] truncate">
                {isRetracting
                  ? "DATA_CONVERGENCE // SYNCED"
                  : isTurned
                  ? "CV_IDENT // VERIFIED"
                  : "COMPUTER_VISION // FACE_RECOG"}
              </span>
              <span className="hidden sm:inline text-[#475569]">|</span>
              <span className="hidden sm:inline text-[#64748B] text-[11px] truncate">
                {isRetracting
                  ? "ABSORPTION COMPLETE"
                  : isTurned
                  ? "IDENTITY: KAISAARU"
                  : "TRACKING 68 LANDMARKS..."}
              </span>
            </div>

            {/* Right Telemetry Badge */}
            <div className="flex items-center gap-1.5 text-[9px] sm:text-xs text-[#64748B] tracking-wider uppercase shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]/60" />
              <span className="text-[#38BDF8]/80 font-bold hidden sm:inline">AUTOMATED_SEQUENCE</span>
              <span className="text-[#38BDF8]/80 font-bold sm:hidden">AUTO_SEQ</span>
            </div>
          </div>

          {/* Central 2.5D Arena: Face Recognition HUD -> Turn-Around -> Synchronized Satellite Nodes -> Retraction */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-2 sm:px-4 w-full max-w-full overflow-hidden">
            <div
              className="relative w-full max-w-full h-72 sm:h-84 md:h-96 flex items-center justify-center"
              style={{ perspective: "1400px" }}
            >
              {/* Branching Circuit Lines & Satellite Icon Nodes (100% Synchronized Coordinate System) */}
              <AnimatePresence>
                {isTurned && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    {/* SVG Connector Lines - Centered at (0, 0) of arena */}
                    <svg
                      className="absolute pointer-events-none overflow-visible"
                      style={{
                        left: "50%",
                        top: "50%",
                        width: 0,
                        height: 0,
                      }}
                    >
                      <defs>
                        <linearGradient id="cyan-beam" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
                          <stop offset="100%" stopColor="#0284C7" stopOpacity="0.3" />
                        </linearGradient>
                      </defs>

                      {SATELLITE_NODES.map((node) => {
                        const targetX = node.baseDx * scaleFactor;
                        const targetY = node.baseDy * scaleFactor;

                        return (
                          <g key={`line-${node.id}`}>
                            {/* Animated line shoots out from (0, 0) directly to (targetX, targetY) */}
                            <motion.line
                              x1={0}
                              y1={0}
                              x2={targetX}
                              y2={targetY}
                              stroke="url(#cyan-beam)"
                              strokeWidth="2"
                              strokeDasharray="5 4"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{
                                pathLength: isRetracting ? 0 : 1,
                                opacity: isRetracting ? 0 : 0.85,
                              }}
                              transition={{
                                duration: isRetracting ? 0.3 : 0.45,
                                delay: isRetracting ? node.retractDelay : node.delay,
                                ease: isRetracting ? "easeInOut" : "easeOut",
                              }}
                            />

                            {/* Optical connection end dot exactly at (targetX, targetY) */}
                            {!isRetracting && (
                              <motion.circle
                                cx={targetX}
                                cy={targetY}
                                r="3.5"
                                fill="#38BDF8"
                                initial={{ scale: 0 }}
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  delay: node.delay + 0.35,
                                }}
                                style={{ filter: "drop-shadow(0 0 6px #38BDF8)" }}
                              />
                            )}
                          </g>
                        );
                      })}
                    </svg>

                    {/* Satellite Circular Cyber Nodes - Positioned EXACTLY at (targetX, targetY) */}
                    {SATELLITE_NODES.map((node) => {
                      const Icon = node.icon;
                      const targetX = node.baseDx * scaleFactor;
                      const targetY = node.baseDy * scaleFactor;

                      return (
                        <div
                          key={node.id}
                          className="absolute pointer-events-none"
                          style={{
                            left: "50%",
                            top: "50%",
                          }}
                        >
                          <motion.div
                            initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                            animate={{
                              scale: isRetracting ? 0 : 1,
                              opacity: isRetracting ? 0 : 1,
                              x: isRetracting ? 0 : targetX,
                              y: isRetracting ? 0 : targetY,
                            }}
                            transition={{
                              duration: isRetracting ? 0.32 : 0.48,
                              delay: isRetracting ? node.retractDelay : node.delay,
                              ease: isRetracting
                                ? [0.7, 0, 0.84, 0] // snappy suction back into photo
                                : [0.34, 1.56, 0.64, 1], // spring bounce emergence
                            }}
                            className="pointer-events-auto"
                          >
                            {/* Inner Badge Wrapper centered exactly on coordinate */}
                            <div className="flex flex-col items-center -translate-x-1/2 -translate-y-1/2 group">
                              {/* Circular Cyber Badge */}
                              <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-[#070D1E]/95 border-2 border-[#38BDF8] shadow-[0_0_25px_rgba(56,189,248,0.5),inset_0_0_12px_rgba(56,189,248,0.25)] backdrop-blur-md transition-transform group-hover:scale-115">
                                {/* Outer dashed spinning tick */}
                                <div
                                  className="absolute -inset-1 rounded-full border border-dashed border-[#38BDF8]/40 animate-spin"
                                  style={{ animationDuration: "16s" }}
                                />
                                <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#38BDF8] drop-shadow-[0_0_8px_#38BDF8]" />
                              </div>

                              {/* Mini Node Label with ample spacing */}
                              <span className="mt-1 px-1 sm:px-1.5 py-0.5 rounded text-[7px] sm:text-[8px] md:text-[9px] font-bold text-[#38BDF8] bg-[#050811]/90 border border-[#38BDF8]/40 tracking-wider shadow-[0_0_8px_rgba(56,189,248,0.2)] whitespace-nowrap">
                                {node.label}
                              </span>
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </AnimatePresence>

              {/* 3D Flipping Card Body (Face Recognition CV <-> Photo) */}
              <motion.div
                className="relative w-36 h-36 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center z-20"
                animate={{
                  rotateY: isTurned ? 180 : 0,
                  scale: absorbShockwave ? [1, 1.12, 1] : isTurned ? [1, 1.06, 1] : 1,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* BACK VIEW (0s - 1.55s): High-Tech Face Recognition / Computer Vision Wireframe */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    {/* Multi-layered Rotating HUD Rings around Face Recognition */}
                    <div
                      className="absolute -inset-3 sm:-inset-6 rounded-full border-2 border-dashed border-[#38BDF8]/50 animate-spin pointer-events-none"
                      style={{ animationDuration: "14s" }}
                    />
                    <div
                      className="absolute -inset-6 sm:-inset-12 rounded-full border border-dotted border-[#38BDF8]/30 animate-spin pointer-events-none"
                      style={{ animationDuration: "24s", animationDirection: "reverse" }}
                    />
                    <div className="absolute -inset-1.5 sm:-inset-2 rounded-full border border-[#38BDF8]/60 shadow-[0_0_25px_rgba(56,189,248,0.35)] pointer-events-none" />

                    {/* Circular Face Recognition Container */}
                    <div className="relative w-30 h-30 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-full bg-[#070D1E]/95 border-2 border-[#38BDF8] shadow-[0_0_40px_rgba(56,189,248,0.5),inset_0_0_25px_rgba(56,189,248,0.3)] flex items-center justify-center overflow-hidden">
                      {/* Detailed Computer Vision Face Mesh Graphic */}
                      <div className="relative w-24 h-30 sm:w-36 sm:h-44 md:w-40 md:h-48 flex items-center justify-center">
                        <Image
                          src="/me/cyber_facerecon.svg"
                          alt="Computer Vision Face Recognition"
                          fill
                          priority
                          className="object-contain filter drop-shadow-[0_0_14px_#38BDF8]"
                        />

                        {/* Moving Vertical Laser Scanner Beam across face mesh */}
                        <div
                          className="absolute left-0 right-0 h-1.5 bg-[#38BDF8] shadow-[0_0_18px_#38BDF8,0_0_30px_#fff] pointer-events-none"
                          style={{
                            top: `${scanLaserPos * 100}%`,
                            transition: "top 0.05s linear",
                          }}
                        >
                          <div className="absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-[#38BDF8]/40 to-transparent pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Face Recognition Status Badge */}
                    <div className="absolute -bottom-7 sm:-bottom-8 px-2.5 sm:px-3.5 py-1 rounded-full bg-[#0A0F1D]/90 border border-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.4)] text-[9px] sm:text-xs text-[#38BDF8] tracking-wider sm:tracking-widest uppercase font-bold flex items-center gap-1.5 whitespace-nowrap">
                      <span
                        className={`w-2 h-2 rounded-full ${faceVerified ? "bg-[#34D399]" : "bg-[#38BDF8] animate-ping"}`}
                      />
                      <span>
                        {faceVerified
                          ? "FACE IDENTIFIED [99.85%]"
                          : "AI_CV // TRACKING FACE..."}
                      </span>
                    </div>
                  </div>
                </div>

                {/* FRONT VIEW (1.55s+): Kaisar's photo with biometric HUD rings & data absorption shockwave */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative flex flex-col items-center"
                  >
                    {/* Outer Rotating Cyan Tick Rings */}
                    <div
                      className="absolute -inset-3 sm:-inset-6 rounded-full border-2 border-dashed border-[#38BDF8]/50 pointer-events-none animate-spin"
                      style={{ animationDuration: "18s" }}
                    />
                    <div
                      className="absolute -inset-6 sm:-inset-10 rounded-full border border-dotted border-[#38BDF8]/30 pointer-events-none animate-spin"
                      style={{ animationDuration: "30s", animationDirection: "reverse" }}
                    />

                    {/* Absorption Shockwave ring when nodes converge back into photo */}
                    <AnimatePresence>
                      {absorbShockwave && (
                        <motion.div
                          initial={{ opacity: 1, scale: 0.8 }}
                          animate={{ opacity: 0, scale: 1.6 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="absolute -inset-8 rounded-full border-2 border-[#38BDF8] shadow-[0_0_40px_#38BDF8] pointer-events-none"
                        />
                      )}
                    </AnimatePresence>

                    {/* Circular Photo Aperture */}
                    <div
                      className={`relative w-30 h-30 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-full overflow-hidden border-2 border-[#38BDF8] transition-all duration-300 ${
                        absorbShockwave
                          ? "shadow-[0_0_60px_#38BDF8,inset_0_0_30px_#38BDF8]"
                          : "shadow-[0_0_40px_rgba(56,189,248,0.5),inset_0_0_20px_rgba(56,189,248,0.3)]"
                      } bg-[#050811]`}
                    >
                      {/* Kaisar's Real Photo */}
                      <Image
                        src="/me/my.jpg"
                        alt="Kaisar Rayfa Al Baihaqqi"
                        fill
                        priority
                        className="object-cover object-[center_35%] filter contrast-110 brightness-105"
                      />

                      {/* Cyan Tint Hologram Filter */}
                      <div className="absolute inset-0 bg-[#38BDF8]/10 mix-blend-color pointer-events-none" />

                      {/* Moving Vertical Biometric Laser Scan Beam */}
                      <div
                        className="absolute left-0 right-0 h-1.5 bg-[#38BDF8] shadow-[0_0_15px_#38BDF8,0_0_30px_#fff] pointer-events-none"
                        style={{
                          top: `${scanLaserPos * 100}%`,
                          transition: "top 0.05s linear",
                        }}
                      >
                        <div className="absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-[#38BDF8]/35 to-transparent pointer-events-none" />
                      </div>
                    </div>

                    {/* Biometric Verified Pill Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mt-4 flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0B132B]/90 border border-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.4)] backdrop-blur-md"
                    >
                      <FiCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span className="text-[10px] sm:text-xs font-bold text-white tracking-widest uppercase">
                        {isRetracting ? (
                          <>
                            INTEGRATED : <span className="text-[#38BDF8]">KAISAARU</span>
                          </>
                        ) : (
                          <>
                            MATCH : <span className="text-[#38BDF8]">99.98%</span> | KAISAARU
                          </>
                        )}
                      </span>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Lower-Third: 5 Floating Holographic Katakana Glass Plates */}
            <div className="w-full flex flex-col items-center mt-3 sm:mt-5 min-h-[140px] justify-center z-20">
              <AnimatePresence>
                {showPlates && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center space-y-3"
                  >
                    {/* Floating Katakana Plates Row */}
                    <div
                      className="flex items-center justify-center gap-1 sm:gap-3.5 md:gap-5"
                      style={{ perspective: "1000px" }}
                    >
                      {NAME_PLATES.map((plate) => (
                        <motion.div
                          key={plate.id}
                          initial={{
                            opacity: 0,
                            scale: 0.2,
                            y: 40,
                            rotateX: 30,
                            rotateY: plate.rotY * 2,
                            rotateZ: plate.rotZ * 3,
                            filter: "blur(10px) brightness(2)",
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            y: [0, -8, 0],
                            rotateX: [0, -4, 0],
                            rotateY: plate.rotY,
                            rotateZ: plate.rotZ,
                            filter: "blur(0px) brightness(1)",
                          }}
                          transition={{
                            opacity: { duration: 0.35, delay: plate.delay },
                            scale: {
                              type: "spring",
                              stiffness: 280,
                              damping: 18,
                              delay: plate.delay,
                            },
                            y: {
                              duration: 2.8,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: plate.delay,
                            },
                            rotateX: {
                              duration: 3.2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: plate.delay,
                            },
                            filter: { duration: 0.35, delay: plate.delay },
                          }}
                          className="group relative"
                        >
                          {/* Holographic Frosted Glass Container */}
                          <div
                            className="relative w-10 h-16 sm:w-18 sm:h-26 md:w-24 md:h-36 rounded-lg sm:rounded-xl flex flex-col items-center justify-between p-1 sm:p-2 md:p-2.5 overflow-hidden transition-all duration-300 border border-[#38BDF8]/70 shadow-[0_0_25px_rgba(56,189,248,0.45),inset_0_0_15px_rgba(56,189,248,0.25)]"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(14, 165, 233, 0.32) 0%, rgba(3, 105, 161, 0.18) 50%, rgba(2, 44, 84, 0.4) 100%)",
                              backdropFilter: "blur(16px)",
                              WebkitBackdropFilter: "blur(16px)",
                            }}
                          >
                            {/* Holographic light sweep streak */}
                            <div
                              className="absolute -inset-full bg-gradient-to-r from-transparent via-[#38BDF8]/20 to-transparent rotate-45 pointer-events-none"
                              style={{ animation: "pulse 3s infinite ease-in-out" }}
                            />

                            {/* Tech corner brackets */}
                            <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-[#38BDF8]" />
                            <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-[#38BDF8]" />
                            <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-[#38BDF8]" />
                            <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-[#38BDF8]" />

                            {/* Top Romaji & ID */}
                            <div className="w-full flex items-center justify-between text-[6px] sm:text-[9px] md:text-[10px] text-[#38BDF8]/90 font-bold tracking-tighter">
                              <span>{plate.romaji}</span>
                              <span className="opacity-60">{plate.id}</span>
                            </div>

                            {/* Center Katakana Character */}
                            <div className="flex-1 flex items-center justify-center">
                              <span
                                className="text-xl sm:text-4xl md:text-6xl font-black text-white select-none transition-transform"
                                style={{
                                  textShadow:
                                    "0 0 12px #38BDF8, 0 0 25px #0284C7, 0 0 45px rgba(56, 189, 248, 0.8)",
                                  fontFamily:
                                    "system-ui, -apple-system, sans-serif, 'Noto Sans JP', 'Hiragino Kaku Gothic ProN'",
                                }}
                              >
                                {plate.katakana}
                              </span>
                            </div>

                            {/* Bottom Tech Bar */}
                            <div className="w-full flex items-center justify-center">
                              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent shadow-[0_0_6px_#38BDF8]" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Identity Tag (No subtitle as instructed) */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.35 }}
                      className="flex items-center gap-2 px-3 py-1 rounded bg-[#050811]/80 border border-[#38BDF8]/30 backdrop-blur-md"
                    >
                      <span className="text-[10px] sm:text-xs text-[#94A3B8] tracking-[0.25em] uppercase font-bold">
                        IDENTITY : <span className="text-[#38BDF8]">KAISAARU</span> (カイサール)
                      </span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Telemetry & Progress Strip */}
          <div className="relative z-20 w-full px-4 py-3 sm:px-8 sm:py-4 flex flex-col gap-1.5 sm:gap-2">
            <div className="flex items-center justify-between text-[9px] sm:text-xs text-[#64748B] tracking-wider uppercase">
              <span className="truncate max-w-[130px] sm:max-w-none">INITIALIZING PORTFOLIO...</span>
              <span className="hidden sm:inline">SYNCHRONIZING PROFILE STREAM</span>
              <span>{Math.round(progress)}%</span>
            </div>

            {/* Neon Cyan Timeline Bar */}
            <div className="w-full h-1 bg-[#1E293B] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#0284C7] via-[#38BDF8] to-[#67E8F9] shadow-[0_0_10px_#38BDF8]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
