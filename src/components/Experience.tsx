"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { workExperiences, educations } from "@/data/experiences";
import {
  FiClock,
  FiBriefcase,
  FiBookOpen,
  FiTerminal,
  FiCheckCircle,
  FiAward,
} from "react-icons/fi";

type LogTabType = "work" | "education";

export default function Experience() {
  const [activeTab, setActiveTab] = useState<LogTabType>("work");

  const tabOptions: {
    id: LogTabType;
    label: string;
    shortLabel: string;
    sublabel: string;
    count: number;
    icon: typeof FiBriefcase;
  }[] = [
    {
      id: "work",
      label: "01. WORK_SERVICE",
      shortLabel: "01. WORK",
      sublabel: "Professional & Industry Experience",
      count: workExperiences.length,
      icon: FiBriefcase,
    },
    {
      id: "education",
      label: "02. ACADEMY_SERVICE",
      shortLabel: "02. ACADEMY",
      sublabel: "Education & Academic Background",
      count: educations.length,
      icon: FiBookOpen,
    },
  ];

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 font-mono relative">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1E293B] pb-6 gap-6"
        >
          <div>
            <div className="text-xs text-primary flex items-center gap-1.5 mb-1.5 font-bold tracking-wider">
              <FiTerminal className="w-3.5 h-3.5" />
              <span>SYSTEM_CHRONOLOGY // CAREER &amp; ACADEMY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              journalctl -u{" "}
              <span className="text-primary">
                {activeTab === "work" ? "work.service" : "academy.service"}
              </span>
            </h2>
            <p className="text-xs text-[#94A3B8] mt-1.5 max-w-xl leading-relaxed">
              {activeTab === "work"
                ? "Chronological log stream of engineering internships, freelance projects, and cross-functional teams."
                : "Formal academic background, computer science foundations, and software engineering coursework."}
            </p>
          </div>

          {/* Switcher Tabs - Responsive 2-column on mobile, inline on desktop */}
          <div className="w-full sm:w-auto grid grid-cols-2 sm:flex sm:items-center gap-1.5 p-1 sm:p-1.5 rounded-xl bg-[#070D1E] border border-[#1E293B] shrink-0 min-w-0">
            {tabOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = activeTab === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setActiveTab(opt.id)}
                  className={`w-full min-w-0 flex items-center justify-center gap-1.5 sm:gap-2 px-1.5 sm:px-3.5 py-2 sm:py-2.5 rounded-lg text-[11px] sm:text-xs font-mono transition-all cursor-pointer select-none ${
                    isActive
                      ? "bg-primary text-[#050811] font-bold shadow-[0_0_15px_rgba(56,189,248,0.35)]"
                      : "text-[#94A3B8] hover:text-white hover:bg-[#0B0F19]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden sm:inline whitespace-nowrap">{opt.label}</span>
                  <span className="sm:hidden font-bold truncate">{opt.shortLabel}</span>
                  <span
                    className={`text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded font-bold leading-none shrink-0 ${
                      isActive ? "bg-[#050811]/30 text-[#050811]" : "bg-[#1E293B] text-[#94A3B8]"
                    }`}
                  >
                    {opt.count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#94A3B8] px-1 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
            <span>
              LOG STREAM:{" "}
              <strong className="text-primary font-mono uppercase">
                {activeTab === "work"
                  ? `PROFESSIONAL_WORK_EXPERIENCE (${workExperiences.length} ENTRIES)`
                  : `ACADEMIC_EDUCATION_HISTORY (${educations.length} ENTRIES)`}
              </strong>
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#475569]">
            FILTER: --type={activeTab} --sort=desc
          </span>
        </div>

        {/* Timeline Container with AnimatePresence */}
        <AnimatePresence mode="wait">
          {/* TAB 1: WORK EXPERIENCES */}
          {activeTab === "work" && (
            <motion.div
              key="tab-work"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="relative pl-6 sm:pl-8 border-l border-[#1E293B] space-y-8"
            >
              {workExperiences.map((exp, index) => (
                <div key={exp.title + index} className="relative group">
                  {/* Timeline Glowing Node */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-2 w-3.5 h-3.5 rounded-full bg-[#050811] border-2 border-primary group-hover:bg-primary transition-colors flex items-center justify-center shadow-[0_0_8px_rgba(56,189,248,0.5)]">
                    <span className="w-1 h-1 rounded-full bg-white opacity-90" />
                  </div>

                  {/* Card Window */}
                  <div className="terminal-window p-5 sm:p-6 rounded-xl border border-[#1E293B] bg-[#070D1E]/90 group-hover:border-primary/50 transition-all duration-300 space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                    {/* Header Strip */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#1E293B]/80 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-bold">&gt;</span>
                        <span className="text-white font-bold text-sm tracking-tight">
                          {exp.org}
                        </span>
                        <span className="text-[#475569]">::</span>
                        <span className="text-primary font-semibold">{exp.title}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 border border-primary/30 text-primary uppercase">
                          {exp.statusBadge}
                        </span>
                        <div className="flex items-center gap-1 text-[#94A3B8] text-[11px] ml-1">
                          <FiClock className="w-3 h-3 text-primary" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Key Contributions */}
                    {exp.contributions && exp.contributions.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <div className="text-[11px] text-[#94A3B8] font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <FiCheckCircle className="w-3 h-3 text-primary" />
                          <span>OUTPUT_DELIVERABLES:</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-[#CBD5E1] pl-3 border-l border-[#1E293B]">
                          {exp.contributions.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary font-bold mt-0.5">+</span>
                              <span className="leading-normal">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech Pills */}
                    {exp.tags && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-[10px] bg-[#0A0F1D] border border-[#1E293B] text-primary hover:border-primary/40 transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* TAB 2: ACADEMIC EDUCATION */}
          {activeTab === "education" && (
            <motion.div
              key="tab-education"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="relative pl-6 sm:pl-8 border-l border-[#1E293B] space-y-8"
            >
              {educations.map((edu, index) => (
                <div key={edu.institution + index} className="relative group">
                  {/* Timeline Glowing Node */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-2 w-3.5 h-3.5 rounded-full bg-[#050811] border-2 border-[#10B981] group-hover:bg-[#10B981] transition-colors flex items-center justify-center shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                    <span className="w-1 h-1 rounded-full bg-white opacity-90" />
                  </div>

                  {/* Card Window */}
                  <div className="terminal-window p-5 sm:p-6 rounded-xl border border-[#1E293B] bg-[#070D1E]/90 group-hover:border-[#10B981]/50 transition-all duration-300 space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                    {/* Header Strip */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#1E293B]/80 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-[#10B981] font-bold">&gt;</span>
                        <span className="text-white font-bold text-sm tracking-tight">
                          {edu.institution}
                        </span>
                        <span className="text-[#475569]">::</span>
                        <span className="text-[#10B981] font-semibold">{edu.degree}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#10B981]/15 border border-[#10B981]/35 text-[#10B981] uppercase">
                          {edu.statusBadge}
                        </span>
                        <div className="flex items-center gap-1 text-[#94A3B8] text-[11px] ml-1">
                          <FiClock className="w-3 h-3 text-[#10B981]" />
                          <span>{edu.period}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                      {edu.description}
                    </p>

                    {/* Academic Focus Areas */}
                    {edu.focus && edu.focus.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <div className="text-[11px] text-[#94A3B8] font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <FiAward className="w-3 h-3 text-[#10B981]" />
                          <span>ACADEMIC_FOCUS_AREAS:</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-[#CBD5E1] pl-3 border-l border-[#1E293B]">
                          {edu.focus.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#10B981] font-bold mt-0.5">+</span>
                              <span className="leading-normal">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Skills Pills */}
                    {edu.skills && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {edu.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded text-[10px] bg-[#0A0F1D] border border-[#1E293B] text-[#10B981] hover:border-[#10B981]/40 transition-colors"
                          >
                            #{skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
