"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer ring
  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable custom cursor if device has a fine pointer (mouse/trackpad, not touch)
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if target or its parent is interactive
      const isInteractive = Boolean(
        target.closest("a, button, input, textarea, select, [role='button'], .clickable, .tab-btn")
      );
      setIsPointer(isInteractive);

      // Check if hovering selectable text or code block
      const isCodeOrText = Boolean(
        target.closest("pre, code, input[type='text'], textarea, p, span.selectable")
      );
      setIsText(isCodeOrText && !isInteractive);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!mounted || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999999] overflow-hidden">
      {/* Outer Cyber Reticle / Terminal Brackets */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none z-[9999999]"
      >
        <motion.div
          animate={{
            width: isPointer ? 48 : isText ? 32 : 30,
            height: isPointer ? 48 : isText ? 32 : 30,
            scale: isClicked ? 0.85 : 1,
            rotate: isPointer ? 45 : 0,
            borderColor: isPointer ? "#34d399" : "#38bdf8",
          }}
          transition={{ type: "spring", stiffness: 450, damping: 28 }}
          className="relative rounded-lg border border-dashed opacity-80"
          style={{
            borderColor: isPointer ? "rgba(52, 211, 153, 0.8)" : "rgba(56, 189, 248, 0.6)",
            boxShadow: isPointer
              ? "0 0 15px rgba(52, 211, 153, 0.4)"
              : "0 0 10px rgba(56, 189, 248, 0.25)",
          }}
        >
          {/* Cyber crosshair ticks */}
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-0.5 bg-primary/70" />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-0.5 bg-primary/70" />
          <span className="absolute top-1/2 -left-1 -translate-y-1/2 h-1.5 w-0.5 bg-primary/70" />
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 h-1.5 w-0.5 bg-primary/70" />

          {/* Interactive lock label */}
          {isPointer && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-mono tracking-widest text-[#34d399] uppercase font-bold"
            >
              LOCK
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Inner Precision Point */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 pointer-events-none z-[9999999]"
      >
        <motion.div
          animate={{
            scale: isClicked ? 1.6 : isPointer ? 1.2 : 1,
            backgroundColor: isPointer ? "#34d399" : "#38bdf8",
          }}
          className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_#38bdf8]"
        />
      </motion.div>
    </div>
  );
}
