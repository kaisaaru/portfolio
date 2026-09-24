"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { skills, SkillItem } from "@/data/skills";
import { FiCpu, FiLayers, FiBox, FiActivity, FiTerminal } from "react-icons/fi";

const TechSphere3D = dynamic(() => import("./TechSphere3D"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-[420px] sm:h-[480px] md:h-[540px] rounded-2xl bg-[#070D1E]/70 border border-[#1E293B] shadow-[0_0_40px_rgba(56,189,248,0.08)] flex items-center justify-center font-mono">
      <span className="text-xs text-[#94A3B8] animate-pulse">INITIALIZING_3D_CORE...</span>
    </div>
  ),
});

export default function Skills() {
  const [viewMode, setViewMode] = useState<"3d" | "grid">("3d");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(skills[1]); // Default to Laravel

  // Split skills for dual-row continuous marquee
  const row1Skills = skills.slice(0, Math.ceil(skills.length / 2));
  const row2Skills = skills.slice(Math.ceil(skills.length / 2));

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 font-mono relative">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#1E293B] pb-4 gap-4"
        >
          <div>
            <div className="text-xs text-primary flex items-center gap-1.5 mb-1">
              <FiCpu className="w-3.5 h-3.5" />
              <span>STACK_REGISTRY // 3D_VISUALIZATION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              sys.tech_stack --all
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-lg bg-[#0B0F19] border border-[#1E293B] text-xs">
              <button
                onClick={() => setViewMode("3d")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  viewMode === "3d"
                    ? "bg-primary text-[#050811] font-bold shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                <FiBox className="w-3.5 h-3.5" />
                <span>3D SPHERE</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-primary text-[#050811] font-bold shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                <FiLayers className="w-3.5 h-3.5" />
                <span>SPEC GRID</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-[#94A3B8]">
              <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
              <span>17 PACKAGES ACTIVE</span>
            </div>
          </div>
        </motion.div>

        {/* CONTINUOUS MOVING MARQUEE (Yang bergerak terus menerus) */}
        <div className="space-y-3 overflow-hidden py-1">
          {/* Row 1: Leftward Infinite Flow */}
          <div className="relative overflow-hidden w-full">
            <div className="animate-marquee-left flex items-center gap-3">
              {[...row1Skills, ...row1Skills, ...row1Skills].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={`row1-${item.name}-${idx}`}
                    onClick={() => {
                      setSelectedSkill(item);
                      setViewMode("3d");
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0B0F19]/90 border border-[#1E293B] hover:border-primary/60 transition-all cursor-pointer group shrink-0"
                  >
                    <Icon aria-hidden="true" className="w-4 h-4 transition-transform group-hover:scale-115" style={{ color: item.color }} />
                    <span className="text-xs font-bold text-white group-hover:text-primary transition-colors">
                      {item.name}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#050811] text-[#94A3B8] border border-[#1E293B]">
                      {item.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 2: Rightward Infinite Flow */}
          <div className="relative overflow-hidden w-full">
            <div className="animate-marquee-right flex items-center gap-3">
              {[...row2Skills, ...row2Skills, ...row2Skills].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={`row2-${item.name}-${idx}`}
                    onClick={() => {
                      setSelectedSkill(item);
                      setViewMode("3d");
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0B0F19]/90 border border-[#1E293B] hover:border-primary/60 transition-all cursor-pointer group shrink-0"
                  >
                    <Icon aria-hidden="true" className="w-4 h-4 transition-transform group-hover:scale-115" style={{ color: item.color }} />
                    <span className="text-xs font-bold text-white group-hover:text-primary transition-colors">
                      {item.name}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#050811] text-[#94A3B8] border border-[#1E293B]">
                      {item.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3D HOLOGRAPHIC CLUSTER VIEW */}
        {viewMode === "3d" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
          >
            {/* 3D Three.js Interactive Sphere Canvas */}
            <div className="lg:col-span-8 flex flex-col">
              <TechSphere3D
                selectedSkill={selectedSkill}
                onSelectSkill={(skill) => setSelectedSkill(skill)}
              />
            </div>

            {/* Live Telemetry / Skill Inspector Panel */}
            <div className="lg:col-span-4 flex flex-col">
              <div className="terminal-window p-6 rounded-2xl border border-[#1E293B] bg-[#0B0F19]/95 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  {/* Panel Header */}
                  <div className="flex items-center justify-between text-xs text-[#94A3B8] pb-3 border-b border-[#1E293B]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                      <span className="ml-1 text-white font-semibold">NODE_INSPECTOR</span>
                    </div>
                    <span className="text-primary text-[10px]">LIVE_TELEMETRY</span>
                  </div>

                  {/* Selected Skill Details */}
                  {selectedSkill && (
                    <div className="mt-5 space-y-5">
                      <div className="flex items-center gap-3.5">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#050811] border border-[#1E293B] text-2xl shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                          style={{ color: selectedSkill.color || "#38BDF8" }}
                        >
                          <selectedSkill.icon className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white tracking-wide">
                            {selectedSkill.name}
                          </h3>
                          <div className="text-xs text-[#38BDF8] uppercase tracking-wider font-semibold">
                            {selectedSkill.category} subsystem
                          </div>
                        </div>
                      </div>

                      {/* Specs and details */}
                      <div className="space-y-3 pt-3">
                        <div className="p-3 rounded-lg bg-[#050811] border border-[#1E293B] space-y-1">
                          <div className="text-[10px] text-[#94A3B8] uppercase">SPECIFICATION</div>
                          <div className="text-xs text-[#CBD5E1] font-semibold">
                            {selectedSkill.spec}
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-[#050811] border border-[#1E293B] space-y-1">
                          <div className="text-[10px] text-[#94A3B8] uppercase">RUNTIME STATUS</div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[#34D399] font-bold">
                              ✓ {selectedSkill.status}
                            </span>
                            <span className="text-[#94A3B8]">LATENCY: &lt;1ms</span>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-[#050811] border border-[#1E293B] space-y-1 font-mono">
                          <div className="text-[10px] text-[#94A3B8] uppercase">COMMAND EXEC</div>
                          <div className="text-xs text-primary truncate">
                            $ which {selectedSkill.name.toLowerCase().replace(/[^a-z0-9]/g, "")}
                          </div>
                        </div>
                      </div>

                      {/* Quick Node Selector Pills */}
                      <div className="pt-2">
                        <div className="text-[10px] text-[#94A3B8] mb-2 uppercase flex items-center gap-1.5">
                          <FiActivity className="w-3 h-3 text-primary" />
                          <span>QUICK SELECT:</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {skills.slice(0, 8).map((s) => (
                            <button
                              key={s.name}
                              onClick={() => setSelectedSkill(s)}
                              className={`px-2 py-0.5 rounded text-[10px] transition-all cursor-pointer border ${
                                selectedSkill.name === s.name
                                  ? "bg-primary/20 text-primary border-primary/60 font-bold"
                                  : "bg-[#050811] text-[#94A3B8] border-[#1E293B] hover:text-white"
                              }`}
                            >
                              {s.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between text-[11px] text-[#94A3B8]">
                  <span>HOLOGRAPHIC_ORBIT</span>
                  <span className="text-primary font-mono">[CLICK 3D TO INSPECT]</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* DETAILED SPEC GRID VIEW */}
        {viewMode === "grid" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.name}
                  onClick={() => {
                    setSelectedSkill(skill);
                    setViewMode("3d");
                  }}
                  className="group relative p-4 rounded-xl bg-[#0B0F19] border border-[#1E293B] hover:border-primary/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#050811] border border-[#1E293B] text-xl transition-transform group-hover:scale-110"
                        style={{ color: skill.color || "#38BDF8" }}
                      >
                        <Icon aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                          {skill.name}
                        </div>
                        <div className="text-[11px] text-[#94A3B8]">{skill.spec}</div>
                      </div>
                    </div>

                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                        skill.status === "PRIMARY"
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : skill.status === "ACTIVE"
                          ? "bg-accent/20 text-accent border border-accent/30"
                          : "bg-[#1E293B] text-[#94A3B8]"
                      }`}
                    >
                      {skill.status}
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#1E293B]/60 flex items-center justify-between text-[10px] text-[#94A3B8]">
                    <span>STATUS: 200_OK</span>
                    <span className="text-primary font-medium">[INSPECT IN 3D]</span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
