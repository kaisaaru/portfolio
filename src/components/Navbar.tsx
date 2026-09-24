"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navLinks = [
  { label: "~/about", href: "#about" },
  { label: "~/tech.stack", href: "#skills" },
  { label: "~/projects", href: "#projects" },
  { label: "~/logs", href: "#experience" },
  { label: "~/certs", href: "#certificates" },
  { label: "~/contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);

    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(timer);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-mono ${
        scrolled
          ? "bg-[#050811]/90 backdrop-blur-md border-b border-[#1E293B] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
          : "bg-[#050811]/40 backdrop-blur-sm border-b border-[#1E293B]/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Terminal Title / Prompt Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group text-sm font-semibold tracking-wide text-foreground hover:text-primary transition-colors"
        >
          {/* Mac window dots */}
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
          </div>

          <span className="text-primary font-bold">kai@system</span>
          <span className="text-[#475569]">:</span>
          <span className="text-[#94A3B8]">~</span>
          <span className="text-primary font-bold">$</span>
        </a>

        {/* Live Status Beacon */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-md bg-[#0B0F19] border border-[#1E293B] text-[11px] text-[#94A3B8]">
          <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
          <span>LEARNING_IN_PUBLIC</span>
          <span className="text-[#334155]">|</span>
          <span className="text-primary font-semibold">UTC+7</span>
          <span className="text-muted">{time || "00:00:00"}</span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#94A3B8] hover:text-primary hover:neon-glow-cyan transition-colors duration-200 relative py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-primary hover:text-white transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A0F1D] border-b border-[#1E293B] px-6 py-4 space-y-3"
          >
            <div className="flex items-center justify-between text-xs text-[#94A3B8] border-b border-[#1E293B] pb-2">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                SYS: ONLINE
              </span>
              <span className="text-primary font-mono text-[11px]">PORTFOLIO // LIVE</span>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm text-[#94A3B8] hover:text-primary py-1.5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
