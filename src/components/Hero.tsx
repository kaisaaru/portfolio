"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiCornerDownLeft, FiCheck } from "react-icons/fi";

const COMMAND_RESPONSES: Record<string, string> = {
  help: "Available commands: [about, skills, projects, isla, contact, whoami, intro, clear, reload]",
  whoami: "kaisar-rayfa (Kai) — Software Engineering Student · Web Developer & Software Builder.",
  isla: "“Making Isla Real.” #2030IslaNyata — One idea, one project, and one step at a time.",
  skills: "Core: PHP/Laravel, Next.js/React, TypeScript, Python, PostgreSQL, Docker.",
  projects: "Featured: Project AIRI, Medical Inventory System, Web Portals. Scroll down to see full repo dossiers.",
  contact: "Email: ryf.kaisaaru@gmail.com | GitHub: github.com/kaisaaru | Location: Bandung, ID",
  intro: "Playing Detective Conan Movie 22 cinematic intro...",
  reload: "Re-triggering typewriter sequence...",
};

// 5 Katakana plates: ka - i - sa - a - ru (カ イ サ ー ル) matching intro scan
const KATAKANA_PLATES = [
  { katakana: "カ", romaji: "KA", id: "01", rotZ: -5, rotY: 14, delay: 0 },
  { katakana: "イ", romaji: "I", id: "02", rotZ: -2.5, rotY: 7, delay: 0.08 },
  { katakana: "サ", romaji: "SA", id: "03", rotZ: 0, rotY: 0, delay: 0.16 },
  { katakana: "ー", romaji: "—", id: "04", rotZ: 2.5, rotY: -7, delay: 0.24 },
  { katakana: "ル", romaji: "RU", id: "05", rotZ: 5, rotY: -14, delay: 0.32 },
];

export default function Hero() {
  // Terminal Expansion State: height & side elements unfold after typewriter finishes
  const [isExpanded, setIsExpanded] = useState(false);

  // Typewriter States
  const [cmd1Text, setCmd1Text] = useState("");
  const [cmd2Text, setCmd2Text] = useState("");
  const [nameText, setNameText] = useState("");
  const [roleText, setRoleText] = useState("");

  // Scan States for Photo
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanned, setIsScanned] = useState(false);

  // Interactive CLI States
  const [cliInput, setCliInput] = useState("");
  const [cliHistory, setCliHistory] = useState<Array<{ cmd: string; output: string }>>([
    {
      cmd: "cat /etc/developer/profile.json && whoami",
      output: "SYS_STATUS: ALL SYSTEMS NOMINAL",
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  // Re-trigger typewriter sequence with vertical height & side expansion
  const startTypewriter = () => {
    setIsExpanded(false);
    setCmd1Text("");
    setCmd2Text("");
    setNameText("");
    setRoleText("");
    setScanProgress(0);
    setIsScanned(false);

    let timeoutId: NodeJS.Timeout;
    const fullCmd1 = "cat /etc/developer/profile.json && whoami";
    const fullCmd2 = 'echo "#2030IslaNyata" » Making Isla Real.';
    const fullName = "KAISAR RAYFA AL BAIHAQQI";
    const fullRole = "[role] Software Engineering Student · Web Developer & Software Builder";

    // Step 1: Type Cmd 1
    let c1Index = 0;
    const typeCmd1 = () => {
      if (c1Index <= fullCmd1.length) {
        setCmd1Text(fullCmd1.slice(0, c1Index));
        c1Index++;
        timeoutId = setTimeout(typeCmd1, 24);
      } else {
        timeoutId = setTimeout(typeCmd2, 130);
      }
    };

    // Step 2: Type Cmd 2
    let c2Index = 0;
    const typeCmd2 = () => {
      if (c2Index <= fullCmd2.length) {
        setCmd2Text(fullCmd2.slice(0, c2Index));
        c2Index++;
        timeoutId = setTimeout(typeCmd2, 20);
      } else {
        timeoutId = setTimeout(typeName, 160);
      }
    };

    // Step 3: Type Name letter-by-letter
    let nameIndex = 0;
    const typeName = () => {
      if (nameIndex <= fullName.length) {
        setNameText(fullName.slice(0, nameIndex));
        nameIndex++;
        timeoutId = setTimeout(typeName, 36);
      } else {
        timeoutId = setTimeout(typeRole, 160);
      }
    };

    // Step 4: Type Role
    let roleIndex = 0;
    const typeRole = () => {
      if (roleIndex <= fullRole.length) {
        setRoleText(fullRole.slice(0, roleIndex));
        roleIndex++;
        timeoutId = setTimeout(typeRole, 18);
      } else {
        // Text typed: expand height, reveal side avatar and interactive CLI console!
        timeoutId = setTimeout(() => {
          setIsExpanded(true);
        }, 180);
      }
    };

    // Start with a brief delay
    timeoutId = setTimeout(typeCmd1, 450);

    return () => clearTimeout(timeoutId);
  };

  useEffect(() => {
    startTypewriter();
  }, []);

  // Biometric Photo Scanner Sequence - Triggers when side avatar expands
  useEffect(() => {
    if (!isExpanded) return;

    let currentScan = 0;
    const scanTimer = setInterval(() => {
      currentScan += 4;
      if (currentScan >= 100) {
        setScanProgress(100);
        setIsScanned(true);
        clearInterval(scanTimer);
      } else {
        setScanProgress(currentScan);
      }
    }, 45);

    return () => clearInterval(scanTimer);
  }, [isExpanded]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = cliInput.trim().toLowerCase();
    if (!cleanCmd) return;

    if (cleanCmd === "clear") {
      setCliHistory([]);
      setCliInput("");
      return;
    }

    if (cleanCmd === "intro") {
      window.dispatchEvent(new CustomEvent("replay-intro"));
      setCliHistory((prev) => [...prev, { cmd: "intro", output: "Replaying DCM22 cinematic intro sequence..." }]);
      setCliInput("");
      return;
    }

    if (cleanCmd === "reload") {
      startTypewriter();
      setCliHistory((prev) => [...prev, { cmd: "reload", output: "Replayed typewriter sequence." }]);
      setCliInput("");
      return;
    }

    if (cleanCmd === "about") {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    } else if (cleanCmd === "skills") {
      document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
    } else if (cleanCmd === "projects") {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    } else if (cleanCmd === "contact") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }

    const response = COMMAND_RESPONSES[cleanCmd] || `Command not found: "${cleanCmd}". Type "help" for options.`;
    setCliHistory((prev) => [...prev, { cmd: cleanCmd, output: response }]);
    setCliInput("");

    setTimeout(() => {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleQuickCmd = (cmd: string) => {
    setCliInput(cmd);
    if (cmd === "intro") {
      window.dispatchEvent(new CustomEvent("replay-intro"));
      setCliHistory((prev) => [...prev, { cmd: "intro", output: "Replaying DCM22 cinematic intro sequence..." }]);
      return;
    }
    const response = COMMAND_RESPONSES[cmd] || `Command executed: ${cmd}`;
    setCliHistory((prev) => [...prev, { cmd, output: response }]);
    if (["about", "skills", "projects", "contact"].includes(cmd)) {
      document.getElementById(cmd)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 flex items-center justify-center font-mono">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container - Constant Horizontal Width to prevent any horizontal layout shift */}
      <div className="w-full max-w-6xl mx-auto space-y-6 relative z-20">
        {/* Top Status Notification Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-[#0B0F19]/80 border border-[#1E293B] text-xs text-[#94A3B8]"
        >
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981] shrink-0" />
            <span className="text-[#E2E8F0] font-semibold">KERNEL v6.12-kaisaaru</span>
            <span className="text-[#334155]">/</span>
            <span className="text-primary font-medium">HOST: dev.kaisaaru.space</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px]">
            <span className="text-accent font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              <span>STATUS: READY (100%)</span>
            </span>
            <span className="text-[#334155]">|</span>
            <span className="text-[#94A3B8]">ARCH: x86_64</span>
          </div>
        </motion.div>

        {/* Main Terminal Window Frame - Constant Horizontal Width, Smooth Vertical Height & Side Expansion */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            boxShadow: isExpanded
              ? "0 0 50px rgba(56, 189, 248, 0.18), inset 0 0 20px rgba(56, 189, 248, 0.04)"
              : "0 0 25px rgba(2, 132, 199, 0.12)",
          }}
          transition={{
            layout: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.5 },
          }}
          className="terminal-window overflow-hidden border border-[#1E293B]"
        >
          {/* Top Window Titlebar (macOS Style) */}
          <div className="bg-[#0A0F1D] px-3.5 sm:px-4 py-2.5 sm:py-3 border-b border-[#1E293B] flex items-center justify-between gap-2 overflow-hidden">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#EF4444] inline-block shrink-0" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#F59E0B] inline-block shrink-0" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#10B981] inline-block shrink-0" />
              <span className="ml-1.5 sm:ml-3 text-[11px] sm:text-xs text-[#64748B] truncate">
                <span className="hidden sm:inline">bash: </span>kaisaaru@dev:~/workspace
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-[#94A3B8] shrink-0 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_#38BDF8] shrink-0" />
              <span className="font-semibold text-primary hidden sm:inline">
                {isExpanded ? "TERMINAL SESSION // LIVE" : "SYSTEM_INITIALIZING..."}
              </span>
              <span className="font-semibold text-primary sm:hidden">
                {isExpanded ? "LIVE SESSION" : "INIT..."}
              </span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Fixed grid column so text width never jumps */}
              <div className="lg:col-span-8 space-y-4">
                {/* Line 1: Command 1 (Typewriter) */}
                <div className="flex items-center gap-2 text-sm text-[#94A3B8] min-h-[24px]">
                  <span className="text-primary font-bold">&gt;</span>
                  <span className="text-[#E2E8F0]">{cmd1Text}</span>
                  {cmd1Text.length > 0 && !cmd2Text && (
                    <span className="inline-block w-2 h-4 bg-primary term-cursor" />
                  )}
                </div>

                {/* Line 2: Echo Isla Quote (Typewriter) */}
                <div className="flex items-center gap-2 text-sm min-h-[24px]">
                  {cmd2Text && (
                    <>
                      <span className="text-primary font-bold">&gt;</span>
                      <span className="text-[#F472B6] font-semibold">{cmd2Text}</span>
                      {!nameText && (
                        <span className="inline-block w-2 h-4 bg-[#F472B6] term-cursor" />
                      )}
                    </>
                  )}
                </div>

                {/* Line 3: Big Name Output */}
                <div className="pt-2 min-h-[64px] flex items-center">
                  <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white flex items-center flex-wrap">
                    <span>{nameText}</span>
                    {nameText.length < 24 && nameText.length > 0 && (
                      <span className="inline-block w-3 sm:w-4 h-8 sm:h-12 bg-primary ml-1 term-cursor shadow-[0_0_12px_#38bdf8]" />
                    )}
                  </h1>
                </div>

                {/* Line 4: Role & Position */}
                <div className="text-sm sm:text-base text-[#94A3B8] min-h-[26px]">
                  {roleText && (
                    <>
                      <span className="text-secondary font-bold">[role]</span>{" "}
                      <span className="text-white font-medium">{roleText.replace("[role] ", "")}</span>
                    </>
                  )}
                </div>

                {/* Line 5: Specialization */}
                {roleText && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xs sm:text-sm text-[#64748B] leading-relaxed"
                  >
                    <span className="text-accent font-bold">[spec]</span> Backend Systems{" "}
                    <span className="text-[#334155]">·</span> Clean Architecture{" "}
                    <span className="text-[#334155]">·</span> Applied AI/ML{" "}
                    <span className="text-[#334155]">·</span> Open Source
                  </motion.div>
                )}

                {/* Line 6: Interactive Terminal History & CLI (Unfolds smoothly downwards when expanded) */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        duration: 0.55,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="pt-4 border-t border-[#1E293B]/70 space-y-2 overflow-hidden"
                    >
                      <div className="text-[11px] text-[#64748B] flex items-center justify-between">
                        <span>LIVE INTERACTIVE SHELL:</span>
                        <span className="text-primary">TRY: &quot;help&quot;, &quot;isla&quot;, &quot;skills&quot;, &quot;projects&quot;</span>
                      </div>

                      {/* Output history */}
                      <div className="max-h-36 overflow-y-auto space-y-1.5 text-xs text-[#CBD5E1] pr-2">
                        {cliHistory.map((item, idx) => (
                          <div key={idx} className="space-y-0.5">
                            <div className="flex items-center gap-1.5 text-primary">
                              <span>$</span>
                              <span className="text-white">{item.cmd}</span>
                            </div>
                            <div className="text-[#94A3B8] pl-3 border-l border-[#1E293B]">
                              {item.output}
                            </div>
                          </div>
                        ))}
                        <div ref={terminalEndRef} />
                      </div>

                      {/* Input form */}
                      <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-2">
                        <span className="text-accent font-bold text-sm">$</span>
                        <input
                          type="text"
                          value={cliInput}
                          onChange={(e) => setCliInput(e.target.value)}
                          placeholder="Type a command and press Enter (e.g. help, isla, projects)..."
                          className="flex-1 bg-transparent text-xs sm:text-sm text-white focus:outline-none placeholder:text-[#475569]"
                        />
                        <button
                          type="submit"
                          className="px-2.5 py-1 text-xs bg-[#1E293B] hover:bg-primary/20 text-[#94A3B8] hover:text-primary rounded transition-colors flex items-center gap-1"
                        >
                          <FiCornerDownLeft className="w-3 h-3" />
                          <span>EXE</span>
                        </button>
                      </form>

                      {/* Quick Command Pills */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {["help", "intro", "isla", "skills", "projects", "contact", "clear"].map((cmd) => (
                          <button
                            key={cmd}
                            type="button"
                            onClick={() => handleQuickCmd(cmd)}
                            className="px-2 py-0.5 rounded text-[11px] bg-[#0A0F1D] border border-[#1E293B] text-[#94A3B8] hover:text-primary hover:border-primary/50 transition-colors"
                          >
                            ${cmd}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Column: Avatar on the side (Unfolds/Scales in gracefully on the side) */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center">
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7, x: 25 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.7, x: 25 }}
                      transition={{
                        duration: 0.65,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex flex-col items-center justify-center w-full"
                    >
                      <div className="relative group mb-8 sm:mb-9">
                        {/* Ambient Halo behind avatar */}
                        <div
                          className={`absolute inset-0 rounded-full blur-2xl transition-all duration-700 ${
                            isScanned ? "bg-[#0284C7]/25 group-hover:bg-primary/40" : "bg-primary/10"
                          }`}
                        />

                        {/* Circular Avatar Container */}
                        <div className="relative p-1 rounded-full bg-gradient-to-tr from-primary via-secondary to-accent-pink shadow-[0_0_25px_rgba(56,189,248,0.35)]">
                          <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden relative bg-[#050811] border-2 border-[#1E293B]">
                            {/* Photo Image */}
                            <Image
                              src="/me/my.jpg"
                              alt="Kaisar Rayfa Al Baihaqqi"
                              fill
                              className={`object-cover transition-all duration-700 ${
                                isScanned
                                  ? "opacity-100 scale-100 grayscale-0"
                                  : "opacity-35 scale-105 grayscale"
                              }`}
                              priority
                            />

                            {/* Active Laser Scanning Beam (moves over the photo) */}
                            {!isScanned && (
                              <div className="absolute inset-0 pointer-events-none">
                                {/* Moving Laser line */}
                                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent shadow-[0_0_15px_#38BDF8] scanner-laser" />
                                {/* Holographic grid scanner overlay */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.1)_1px,transparent_1px)] bg-[size:16px_16px] scanner-grid" />
                                {/* Scanning watermark */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-[10px] font-mono text-primary font-bold bg-[#050811]/85 px-2 py-0.5 rounded border border-primary/40 tracking-wider">
                                    SCANNING... {scanProgress}%
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* 5 Floating Holographic Katakana Glass Plates: Overlapping photo, tilted & floating */}
                        <div
                          className="absolute -bottom-6 sm:-bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-1 sm:gap-1.5 pointer-events-none"
                          style={{ perspective: "1000px" }}
                        >
                          {KATAKANA_PLATES.map((plate) => (
                            <motion.div
                              key={plate.id}
                              initial={{
                                opacity: 0,
                                scale: 0.8,
                                rotateY: plate.rotY * 1.5,
                                rotateZ: plate.rotZ * 2,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                                y: [0, -6, 0],
                                rotateX: [0, -4, 0],
                                rotateY: plate.rotY,
                                rotateZ: plate.rotZ,
                              }}
                              transition={{
                                opacity: { duration: 0.35, delay: plate.delay },
                                scale: { duration: 0.4, delay: plate.delay },
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
                              }}
                              className="group/plate relative"
                            >
                              {/* Holographic Frosted Glass Container */}
                              <div
                                className="relative w-9 h-14 sm:w-11 sm:h-17 rounded-md sm:rounded-lg flex flex-col items-center justify-between p-1 overflow-hidden transition-all duration-300 border border-[#38BDF8]/70 shadow-[0_0_20px_rgba(56,189,248,0.45),inset_0_0_12px_rgba(56,189,248,0.25)]"
                                style={{
                                  background:
                                    "linear-gradient(135deg, rgba(14, 165, 233, 0.32) 0%, rgba(3, 105, 161, 0.18) 50%, rgba(2, 44, 84, 0.4) 100%)",
                                  backdropFilter: "blur(14px)",
                                  WebkitBackdropFilter: "blur(14px)",
                                }}
                              >
                                {/* Holographic light sweep streak */}
                                <div
                                  className="absolute -inset-full bg-gradient-to-r from-transparent via-[#38BDF8]/20 to-transparent rotate-45 pointer-events-none"
                                  style={{ animation: "pulse 3s infinite ease-in-out" }}
                                />

                                {/* Tech corner brackets */}
                                <div className="absolute top-0.5 left-0.5 w-1 h-1 border-t border-l border-[#38BDF8]" />
                                <div className="absolute top-0.5 right-0.5 w-1 h-1 border-t border-r border-[#38BDF8]" />
                                <div className="absolute bottom-0.5 left-0.5 w-1 h-1 border-b border-l border-[#38BDF8]" />
                                <div className="absolute bottom-0.5 right-0.5 w-1 h-1 border-b border-r border-[#38BDF8]" />

                                {/* Top Romaji & ID */}
                                <div className="w-full flex items-center justify-between text-[6px] sm:text-[7px] text-[#38BDF8]/90 font-bold tracking-tighter">
                                  <span>{plate.romaji}</span>
                                  <span className="opacity-60">{plate.id}</span>
                                </div>

                                {/* Center Katakana Character */}
                                <div className="flex-1 flex items-center justify-center">
                                  <span
                                    className="text-lg sm:text-2xl font-black text-white select-none transition-transform"
                                    style={{
                                      textShadow:
                                        "0 0 10px #38BDF8, 0 0 20px #0284C7, 0 0 35px rgba(56, 189, 248, 0.8)",
                                      fontFamily:
                                        "system-ui, -apple-system, sans-serif, 'Noto Sans JP', 'Hiragino Kaku Gothic ProN'",
                                    }}
                                  >
                                    {plate.katakana}
                                  </span>
                                </div>

                                {/* Bottom Tech Bar */}
                                <div className="w-full flex items-center justify-center">
                                  <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent shadow-[0_0_5px_#38BDF8]" />
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Cyber Identity Pill Badge from Intro */}
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#070D1E]/95 border border-[#38BDF8]/60 shadow-[0_0_15px_rgba(56,189,248,0.35)] backdrop-blur-md">
                        <FiCheck className="w-3 h-3 text-[#38BDF8]" />
                        <span className="text-[10px] sm:text-[11px] font-bold text-white tracking-widest uppercase">
                          IDENTITY : <span className="text-[#38BDF8]">KAISAARU</span>
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Status Chips (Unfolds smoothly downwards when expanded) */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 border-t border-[#1E293B] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-xs">
                      <span className="text-primary font-bold">$</span>
                      <span className="text-[#CBD5E1] truncate">Software Engineer</span>
                    </div>

                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-xs">
                      <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                      <span className="text-[#CBD5E1] truncate">Backend &amp; Web Systems</span>
                    </div>

                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-xs">
                      <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                      <span className="text-[#CBD5E1] truncate">Applied AI &amp; ML Track</span>
                    </div>

                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-xs">
                      <span className="text-primary font-bold shrink-0">⚲</span>
                      <span className="text-[#CBD5E1] truncate">Bandung, Indonesia</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
