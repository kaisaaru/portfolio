"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiTerminal, FiMapPin, FiCopy, FiCheck, FiExternalLink } from "react-icons/fi";
import { contactInfo } from "@/data/contact";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("ryf.kaisaaru@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 font-mono relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#1E293B] pb-4 gap-2"
        >
          <div>
            <div className="text-xs text-primary flex items-center gap-1.5 mb-1">
              <FiTerminal className="w-3.5 h-3.5 shrink-0" />
              <span>TRANSMISSION_UPLINK // DIRECT COMMS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              ./contact_relay.sh
            </h2>
          </div>
          <div className="text-xs text-[#94A3B8] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981] shrink-0" />
            <span>SOCKET: OPEN (DIRECT UPLINK)</span>
          </div>
        </motion.div>

        {/* Central Communications Relay Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="terminal-window p-4 sm:p-8 rounded-2xl border border-[#1E293B] bg-[#0B0F19]/90 backdrop-blur-md space-y-6 overflow-hidden"
        >
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between text-xs text-[#94A3B8] pb-4 border-b border-[#1E293B]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80" />
              <span className="ml-2 text-white font-semibold tracking-wider">
                ACTIVE_COMMS_CHANNELS
              </span>
            </div>
            <span className="text-[#38BDF8] text-[11px] font-mono">STATUS: 200 OK</span>
          </div>

          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-2xl">
            Open to software engineering opportunities, AI &amp; systems collaboration, and exciting tech initiatives.
            Reach out directly through any of the channels below.
          </p>

          {/* Grid of Communication Channels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
            {contactInfo.map((info) => (
              <div
                key={info.label}
                className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-[#050811] border border-[#1E293B] hover:border-[#38BDF8]/50 transition-all duration-300 group min-w-0"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#070D1E] border border-[#1E293B] group-hover:border-[#38BDF8]/40 flex items-center justify-center shrink-0 transition-colors">
                    <info.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] text-[#94A3B8] font-mono uppercase tracking-wider">
                      {info.label}
                    </div>
                    <div className="text-xs sm:text-sm text-[#CBD5E1] font-semibold group-hover:text-primary transition-colors truncate">
                      {info.value}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {info.label === "Email" ? (
                    <>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        title="Copy email address"
                        aria-label="Copy email address to clipboard"
                        className="p-2 rounded-lg bg-[#0A0F1D] border border-[#1E293B] hover:border-primary/50 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
                      >
                        {copied ? (
                          <FiCheck className="w-3.5 h-3.5 text-[#10B981]" aria-hidden="true" />
                        ) : (
                          <FiCopy className="w-3.5 h-3.5" aria-hidden="true" />
                        )}
                      </button>
                      <a
                        href={info.href}
                        title="Send email"
                        aria-label="Send direct email"
                        className="p-2 rounded-lg bg-[#0A0F1D] border border-[#1E293B] hover:border-primary/50 text-[#94A3B8] hover:text-primary transition-colors"
                      >
                        <FiExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </>
                  ) : (
                    <a
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Visit ${info.label}`}
                      aria-label={`Open external link to ${info.label}: ${info.value}`}
                      className="p-2 rounded-lg bg-[#0A0F1D] border border-[#1E293B] hover:border-primary/50 text-[#94A3B8] group-hover:text-primary transition-colors"
                    >
                      <FiExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Location & Quick Direct Mailto CTA */}
          <div className="pt-4 border-t border-[#1E293B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#94A3B8] flex-wrap">
              <FiMapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="hidden sm:inline">Bandung, West Java, Indonesia · UTC+7 (WIB)</span>
              <span className="sm:hidden">Bandung, Indonesia · UTC+7 (WIB)</span>
            </div>

            <a
              href="mailto:ryf.kaisaaru@gmail.com"
              className="w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-light text-[#050811] font-bold text-xs transition-all shadow-[0_0_20px_rgba(56,189,248,0.25)] flex items-center justify-center gap-2"
            >
              <span>$ mailto:ryf.kaisaaru@gmail.com</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
