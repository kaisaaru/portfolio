"use client";

import { FiGithub, FiLinkedin, FiMail, FiInstagram } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-16 pb-12 px-4 sm:px-6 font-mono relative">
      <div className="max-w-6xl mx-auto">
        {/* Terminal Footer Window (Mirroring footer.svg) */}
        <div className="terminal-window rounded-xl overflow-hidden border border-[#1E293B] shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
          {/* Terminal Window Header */}
          <div className="bg-[#0A0F1D] px-3.5 sm:px-4 py-2.5 sm:py-3 border-b border-[#1E293B] flex items-center justify-between gap-2 text-xs overflow-hidden">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] shrink-0" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shrink-0" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0" />
              <span className="ml-1 sm:ml-2 text-[#64748B] text-[11px] sm:text-xs truncate">
                bash - footer.sh<span className="hidden sm:inline"> // kaisaaru@system</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0B132B] border border-[#1E293B] text-[#94A3B8] text-[10px] font-semibold shrink-0 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_6px_#10B981] shrink-0" />
              <span>SYSTEM: NOMINAL</span>
            </div>
          </div>

          {/* Terminal Center Content */}
          <div className="py-10 px-6 text-center space-y-6 bg-gradient-to-b from-[#090D1A] to-[#05070E]">
            {/* Audio / Frequency Visualizer Bars (Mirroring footer.svg) */}
            <div className="flex items-center justify-center gap-1.5 h-7">
              <span className="w-0.5 bg-primary rounded-full eq-bar-1" />
              <span className="w-0.5 bg-secondary rounded-full eq-bar-2" />
              <span className="w-0.5 bg-secondary rounded-full eq-bar-3" />
              <span className="w-0.5 bg-primary rounded-full eq-bar-4" />
              <span className="w-0.5 bg-secondary rounded-full eq-bar-2" />
              <span className="w-0.5 bg-secondary rounded-full eq-bar-3" />
              <span className="w-0.5 bg-primary rounded-full eq-bar-1" />
            </div>

            {/* Echo Quote with Blinking Cursor */}
            <div className="text-sm sm:text-base font-medium">
              <span className="text-primary font-bold">&gt; echo </span>
              <span className="text-[#E2E8F0]">&quot;Constantly learning, continuously evolving.&quot;</span>
              <span className="text-primary font-bold term-cursor"> _</span>
            </div>

            {/* Developer Identity & Location with Vector Pin */}
            <div className="text-xs sm:text-sm text-[#94A3B8] flex flex-wrap items-center justify-center gap-2">
              <span className="text-secondary font-bold tracking-wider">
                KAISAR RAYFA AL BAIHAQQI
              </span>
              <span className="text-[#475569]">·</span>
              <span className="text-[#94A3B8]">Software Developer</span>
              <span className="text-[#475569]">·</span>
              <span className="text-primary flex items-center gap-1">
                <span>⚲</span> Bandung, Indonesia
              </span>
            </div>

            {/* Social Channels */}
            <div className="flex items-center justify-center gap-4 pt-2">
              {[
                { icon: FiGithub, href: "https://github.com/kaisaaru", label: "GitHub" },
                { icon: FiLinkedin, href: "https://linkedin.com/in/kaisaaru", label: "LinkedIn" },
                { icon: FiMail, href: "mailto:ryf.kaisaaru@gmail.com", label: "Email" },
                { icon: FiInstagram, href: "https://instagram.com/ka1sai", label: "Instagram" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-[#94A3B8] hover:text-primary hover:border-primary/50 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Bottom Hairline & Copyright */}
            <div className="pt-6 border-t border-[#1E293B]/60 text-[11px] text-[#64748B] flex flex-col sm:flex-row items-center justify-between gap-2">
              <div>
                © {currentYear} Kaisar Rayfa Al Baihaqqi. All system rights preserved.
              </div>
              <div className="text-[#475569]">
                BUILT WITH NEXT.JS 16 · TAILWIND CSS · FRAMER MOTION
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
