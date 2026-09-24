"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STATUS_MESSAGES = [
  "Initializing core components...",
  "Loading neural matrix engine...",
  "Mounting workspace kaisaaru@system...",
  "Syncing #2030IslaNyata vision protocols...",
  "Verifying biometric credentials...",
  "All subsystems nominal.",
];

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState(STATUS_MESSAGES[0]);
  const [isFinished, setIsFinished] = useState(false);
  const [resolution, setResolution] = useState("1920x1080");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setResolution(`${window.innerWidth}x${window.innerHeight}`);
    }

    let current = 0;
    const interval = setInterval(() => {
      // Smooth incremental progress
      current += Math.floor(Math.random() * 8) + 4;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        setStatusText(STATUS_MESSAGES[STATUS_MESSAGES.length - 1]);
        clearInterval(interval);

        // Smooth transition out after reaching 100%
        setTimeout(() => {
          setIsFinished(true);
          onComplete?.();
        }, 500);
      } else {
        setProgress(current);
        const msgIdx = Math.min(
          Math.floor((current / 100) * (STATUS_MESSAGES.length - 1)),
          STATUS_MESSAGES.length - 2
        );
        setStatusText(STATUS_MESSAGES[msgIdx]);
      }
    }, 65);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="system-boot-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(8px)",
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[99990] bg-[#050811] flex flex-col items-center justify-center p-6 font-mono select-none overflow-hidden"
        >
          {/* Subtle Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Giant Background Watermark Percentage (matching reference screenshot) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <span className="text-[26vw] font-extrabold tracking-tighter text-[#38BDF8]/[0.035] leading-none select-none">
              {progress}%
            </span>
          </div>

          {/* Central System Boot Content */}
          <div className="relative z-10 w-full max-w-xl flex flex-col items-center text-center space-y-6">
            {/* Header: SYSTEM BOOT */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-[0.28em] text-white uppercase">
                SYSTEM BOOT
              </h1>

              {/* Subtitle: Dynamic Initializing message */}
              <p className="text-xs sm:text-sm text-[#94A3B8] font-normal tracking-wide min-h-[20px] transition-all">
                {statusText}
              </p>
            </motion.div>

            {/* Glowing Progress Bar + Percentage (Matching reference) */}
            <div className="w-full flex items-center gap-4 pt-3">
              {/* Sleek Cyan Glowing Pill Bar */}
              <div className="relative flex-1 h-2 sm:h-2.5 bg-[#090E1A] rounded-full overflow-hidden border border-[#1E293B]/80 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
                {/* Glowing neon fill */}
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#0284C7] via-[#38BDF8] to-[#67E8F9] relative shadow-[0_0_16px_rgba(56,189,248,0.7)]"
                  style={{ width: `${progress}%` }}
                >
                  {/* High-intensity leading head light */}
                  <div className="absolute right-0 top-0 bottom-0 w-3 bg-white rounded-full shadow-[0_0_12px_#fff]" />
                </motion.div>
              </div>

              {/* Numerical Percentage */}
              <div className="text-xs sm:text-sm font-bold text-[#38BDF8] tracking-wider min-w-[48px] text-right drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
                {progress}%
              </div>
            </div>
          </div>

          {/* Bottom Technical Telemetry (Matching reference screenshot) */}
          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-[10px] sm:text-xs text-[#475569] tracking-widest uppercase">
            <div>
              <span>FRAME : </span>
              <span className="text-[#94A3B8]">{String(progress * 2 + 10).padStart(4, "0")}</span>
            </div>

            <div>
              <span>SYS : </span>
              <span className="text-primary font-semibold">
                {progress === 100 ? "ONLINE" : "BOOTING"}
              </span>
            </div>

            <div>
              <span>RES : </span>
              <span className="text-[#94A3B8]">{resolution}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
