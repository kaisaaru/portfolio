"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectItem } from "@/data/projects";
import {
  FiFolder,
  FiFileText,
  FiImage,
  FiCode,
  FiTerminal,
  FiChevronRight,
  FiChevronDown,
  FiGithub,
  FiExternalLink,
  FiGitBranch,
  FiCheckCircle,
  FiPlay,
  FiLayers,
  FiLock,
} from "react-icons/fi";
import ImageCarousel from "../ImageCarousel";

interface Props {
  projects: ProjectItem[];
}

type TabType = "readme" | "preview" | "config" | "log";

export default function IdeWorkstationView({ projects }: Props) {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>("readme");
  const [openFolders, setOpenFolders] = useState<Record<number, boolean>>({
    0: true,
  });

  const currentProject = projects[activeProjectIdx] || projects[0];

  const toggleFolder = (idx: number) => {
    setOpenFolders((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const selectProjectAndTab = (idx: number, tab: TabType) => {
    setActiveProjectIdx(idx);
    setActiveTab(tab);
    setOpenFolders((prev) => ({
      ...prev,
      [idx]: true,
    }));
  };

  return (
    <div className="rounded-2xl border border-[#1E293B] bg-[#070D1E]/95 shadow-[0_0_60px_rgba(56,189,248,0.08)] overflow-hidden font-mono text-xs">
      {/* Top Window Bar */}
      <div className="bg-[#0A0F1D] px-4 py-2.5 border-b border-[#1E293B] flex items-center justify-between text-xs select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-[#EF4444]/90 inline-block shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
            <span className="w-3 h-3 rounded-full bg-[#F59E0B]/90 inline-block shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
            <span className="w-3 h-3 rounded-full bg-[#10B981]/90 inline-block shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </div>
          <span className="text-[#64748B] font-mono hidden sm:inline">CYBER_IDE // WORKSTATION v2.4</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-[#94A3B8]">
          {currentProject.isPrivate ? (
            <span className="px-2 py-0.5 rounded bg-[#EF4444]/20 border border-[#EF4444]/40 text-[#EF4444] flex items-center gap-1 font-bold">
              <FiLock className="w-3 h-3" />
              <span>PRIVATE REPO</span>
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] flex items-center gap-1 font-bold">
              <span>PUBLIC</span>
            </span>
          )}
          <span className="px-2 py-0.5 rounded bg-[#1E293B]/70 border border-[#334155]/50 text-primary flex items-center gap-1">
            <FiGitBranch className="w-3 h-3" />
            <span>{currentProject.isPrivate ? "protected" : currentProject.branch}</span>
          </span>
          <span className="text-[#64748B] hidden md:inline">
            ({currentProject.isPrivate ? "••••••••" : currentProject.commitHash})
          </span>
        </div>
      </div>

      {/* Main IDE Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
        {/* Left Sidebar: Activity + File Tree Explorer */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#1E293B] bg-[#050811]/90 flex flex-col">
          {/* Explorer Header */}
          <div className="p-3 border-b border-[#1E293B] flex items-center justify-between text-[#64748B] tracking-wider text-[11px] uppercase font-bold">
            <span className="flex items-center gap-1.5">
              <FiLayers className="w-3.5 h-3.5 text-primary" />
              <span>EXPLORER : REPOSITORIES</span>
            </span>
            <span className="text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded">
              {projects.length} PROJECTS
            </span>
          </div>

          {/* Tree View */}
          <div className="p-2 space-y-1 overflow-y-auto flex-1 max-h-[260px] lg:max-h-none">
            {projects.map((proj, pIdx) => {
              const isOpen = !!openFolders[pIdx];
              const isCurrentProj = activeProjectIdx === pIdx;

              return (
                <div key={proj.title} className="space-y-0.5">
                  {/* Folder Item */}
                  <button
                    onClick={() => {
                      toggleFolder(pIdx);
                      setActiveProjectIdx(pIdx);
                    }}
                    className={`w-full flex items-center justify-between gap-1.5 px-2.5 py-1.5 rounded text-left transition-colors cursor-pointer ${
                      isCurrentProj
                        ? "bg-[#0B1528] text-white font-bold"
                        : "text-[#94A3B8] hover:bg-[#0B0F19] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      {isOpen ? (
                        <FiChevronDown className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
                      ) : (
                        <FiChevronRight className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
                      )}
                      <FiFolder className={`w-3.5 h-3.5 shrink-0 ${isCurrentProj ? "text-primary" : "text-[#F59E0B]"}`} />
                      <span className="truncate">{proj.repo}</span>
                    </div>
                    {proj.isPrivate && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#EF4444]/20 border border-[#EF4444]/40 text-[#EF4444] font-mono shrink-0 flex items-center gap-0.5">
                        <FiLock className="w-2.5 h-2.5" />
                        <span>PRIVATE</span>
                      </span>
                    )}
                  </button>

                  {/* Sub Files */}
                  {isOpen && (
                    <div className="pl-6 space-y-0.5 border-l border-[#1E293B] ml-3.5">
                      {/* README.md */}
                      <button
                        onClick={() => selectProjectAndTab(pIdx, "readme")}
                        className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left transition-colors cursor-pointer ${
                          isCurrentProj && activeTab === "readme"
                            ? "bg-primary/20 text-primary font-semibold"
                            : "text-[#64748B] hover:text-[#CBD5E1] hover:bg-[#0B0F19]"
                        }`}
                      >
                        <FiFileText className="w-3 h-3 text-[#38BDF8]" />
                        <span>README.md</span>
                      </button>

                      {/* screenshots.gui (if images exist) */}
                      {proj.images && proj.images.length > 0 && (
                        <button
                          onClick={() => selectProjectAndTab(pIdx, "preview")}
                          className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left transition-colors cursor-pointer ${
                            isCurrentProj && activeTab === "preview"
                              ? "bg-primary/20 text-primary font-semibold"
                              : "text-[#64748B] hover:text-[#CBD5E1] hover:bg-[#0B0F19]"
                          }`}
                        >
                          <FiImage className="w-3 h-3 text-[#10B981]" />
                          <span>screenshots.gui</span>
                          <span className="text-[9px] text-[#64748B]">({proj.images.length})</span>
                        </button>
                      )}

                      {/* stack.config.json */}
                      <button
                        onClick={() => selectProjectAndTab(pIdx, "config")}
                        className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left transition-colors cursor-pointer ${
                          isCurrentProj && activeTab === "config"
                            ? "bg-primary/20 text-primary font-semibold"
                            : "text-[#64748B] hover:text-[#CBD5E1] hover:bg-[#0B0F19]"
                        }`}
                      >
                        <FiCode className="w-3 h-3 text-[#F59E0B]" />
                        <span>stack.config.json</span>
                      </button>

                      {/* dev-server.log */}
                      <button
                        onClick={() => selectProjectAndTab(pIdx, "log")}
                        className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left transition-colors cursor-pointer ${
                          isCurrentProj && activeTab === "log"
                            ? "bg-primary/20 text-primary font-semibold"
                            : "text-[#64748B] hover:text-[#CBD5E1] hover:bg-[#0B0F19]"
                        }`}
                      >
                        <FiTerminal className="w-3 h-3 text-[#A855F7]" />
                        <span>dev-server.log</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Git Info Box */}
          <div className="p-3 border-t border-[#1E293B] bg-[#0A0F1D]/80 text-[10px] space-y-1">
            <div className="text-[#64748B] flex items-center justify-between">
              <span>ACTIVE WORKSPACE:</span>
              <span className="text-primary font-bold">
                {currentProject.isPrivate ? "[REDACTED // CLIENT_NDA]" : currentProject.repo}
              </span>
            </div>
            <div className="text-[#64748B] flex items-center justify-between">
              <span>STATUS:</span>
              <span className={currentProject.isPrivate ? "text-[#EF4444]" : "text-[#10B981]"}>
                {currentProject.isPrivate ? "protected, encrypted" : "clean, synced"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Area: Editor Tabs & Content */}
        <div className="lg:col-span-8 flex flex-col bg-[#070D1E]">
          {/* Editor Tabs Header */}
          <div className="flex items-center overflow-x-auto border-b border-[#1E293B] bg-[#0A0F1D] px-2 gap-1 scrollbar-none">
            <button
              onClick={() => setActiveTab("readme")}
              className={`flex items-center gap-1.5 px-3 py-2 border-b-2 text-xs transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === "readme"
                  ? "border-primary text-white bg-[#070D1E] font-bold"
                  : "border-transparent text-[#64748B] hover:text-white"
              }`}
            >
              <FiFileText className="w-3 h-3 text-[#38BDF8]" />
              <span>README.md</span>
            </button>

            {currentProject.images && currentProject.images.length > 0 && (
              <button
                onClick={() => setActiveTab("preview")}
                className={`flex items-center gap-1.5 px-3 py-2 border-b-2 text-xs transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === "preview"
                    ? "border-primary text-white bg-[#070D1E] font-bold"
                    : "border-transparent text-[#64748B] hover:text-white"
                }`}
              >
                <FiImage className="w-3 h-3 text-[#10B981]" />
                <span>screenshots.gui</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab("config")}
              className={`flex items-center gap-1.5 px-3 py-2 border-b-2 text-xs transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === "config"
                  ? "border-primary text-white bg-[#070D1E] font-bold"
                  : "border-transparent text-[#64748B] hover:text-white"
              }`}
            >
              <FiCode className="w-3 h-3 text-[#F59E0B]" />
              <span>stack.config.json</span>
            </button>

            <button
              onClick={() => setActiveTab("log")}
              className={`flex items-center gap-1.5 px-3 py-2 border-b-2 text-xs transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === "log"
                  ? "border-primary text-white bg-[#070D1E] font-bold"
                  : "border-transparent text-[#64748B] hover:text-white"
              }`}
            >
              <FiTerminal className="w-3 h-3 text-[#A855F7]" />
              <span>dev-server.log</span>
            </button>
          </div>

          {/* Breadcrumb Bar */}
          <div className="px-4 py-1.5 text-[10px] text-[#64748B] border-b border-[#1E293B]/70 bg-[#050811]/60 flex items-center gap-1.5">
            <span>workspace</span>
            <span>&gt;</span>
            <span className="text-primary">
              {currentProject.isPrivate ? "[REDACTED]" : currentProject.repo}
            </span>
            <span>&gt;</span>
            <span className="text-[#CBD5E1]">
              {activeTab === "readme" && "README.md"}
              {activeTab === "preview" && "screenshots.gui"}
              {activeTab === "config" && "stack.config.json"}
              {activeTab === "log" && "dev-server.log"}
            </span>
          </div>

          {/* Editor Content Area */}
          <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {/* Tab 1: README.md */}
              {activeTab === "readme" && (
                <motion.div
                  key={`readme-${currentProject.title}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6 max-w-3xl"
                >
                  <div className="border-b border-[#1E293B] pb-4">
                    <div className="text-[11px] text-[#64748B] mb-1 font-mono">
                      # Project Overview
                    </div>
                    <h2 className="text-2xl font-extrabold text-white tracking-tight">
                      {currentProject.title}
                    </h2>
                    <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed">
                      {currentProject.description}
                    </p>
                  </div>

                  {/* Solved Features Checklist */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                      <FiCheckCircle className="w-3.5 h-3.5" />
                      <span>Key Features &amp; Deliverables</span>
                    </h3>
                    <div className="space-y-2">
                      {currentProject.features.map((feat, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 p-2.5 rounded bg-[#0A0F1D] border border-[#1E293B] text-xs text-[#CBD5E1]"
                        >
                          <span className="text-[#10B981] font-bold mt-0.5">✓</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    {currentProject.isPrivate ? (
                      <div className="px-3.5 py-2.5 rounded-lg bg-[#EF4444]/15 border border-[#EF4444]/35 text-[#EF4444] text-xs flex items-center gap-2.5 font-mono">
                        <FiLock className="w-4 h-4 shrink-0 text-[#EF4444]" />
                        <span>RESTRICTED ACCESS // Private Enterprise Client Repository (NDA Protected)</span>
                      </div>
                    ) : (
                      <>
                        <a
                          href={currentProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-light text-[#050811] font-bold text-xs flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                        >
                          <FiGithub className="w-4 h-4" />
                          <span>Open on GitHub</span>
                        </a>

                        {currentProject.demo && currentProject.demo !== "#" && (
                          <a
                            href={currentProject.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-lg bg-[#0A0F1D] border border-primary/50 text-primary hover:bg-primary hover:text-[#050811] font-bold text-xs flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                          >
                            <FiExternalLink className="w-4 h-4" />
                            <span>Launch Live Application</span>
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Tab 2: screenshots.gui */}
              {activeTab === "preview" && (
                <motion.div
                  key={`preview-${currentProject.title}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                    <span>GUI INTERFACE PREVIEW ({currentProject.images?.length || 0} ASSETS)</span>
                    <span className="text-primary font-mono">1080p Resolution</span>
                  </div>
                  {currentProject.images && currentProject.images.length > 0 ? (
                    <div className="p-3 rounded-xl bg-[#050811] border border-[#1E293B]">
                      <ImageCarousel images={currentProject.images} />
                    </div>
                  ) : (
                    <div className="p-8 text-center text-[#64748B] border border-dashed border-[#1E293B] rounded-xl">
                      No GUI preview files available for this repository.
                    </div>
                  )}
                </motion.div>
              )}

              {/* Tab 3: stack.config.json */}
              {activeTab === "config" && (
                <motion.div
                  key={`config-${currentProject.title}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 rounded-xl bg-[#050811] border border-[#1E293B] text-xs font-mono text-[#CBD5E1] space-y-1 overflow-x-auto leading-relaxed"
                >
                  <div className="text-[#64748B]">{"{"}</div>
                  <div className="pl-4">
                    <span className="text-[#38BDF8]">"repository"</span>:{" "}
                    <span className={currentProject.isPrivate ? "text-[#EF4444]" : "text-[#10B981]"}>
                      "{currentProject.isPrivate ? "[REDACTED // CLIENT_NDA]" : currentProject.repo}"
                    </span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-[#38BDF8]">"title"</span>:{" "}
                    <span className="text-[#10B981]">"{currentProject.title}"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-[#38BDF8]">"branch"</span>:{" "}
                    <span className="text-[#F59E0B]">
                      "{currentProject.isPrivate ? "protected" : currentProject.branch}"
                    </span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-[#38BDF8]">"commit"</span>:{" "}
                    <span className="text-[#F59E0B]">
                      "{currentProject.isPrivate ? "••••••••" : currentProject.commitHash}"
                    </span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-[#38BDF8]">"tech_stack"</span>: [
                  </div>
                  <div className="pl-8 flex flex-wrap gap-1">
                    {currentProject.tech.map((t, idx) => (
                      <span key={t} className="text-[#A855F7]">
                        "{t}"{idx < currentProject.tech.length - 1 ? "," : ""}
                      </span>
                    ))}
                  </div>
                  <div className="pl-4">],</div>
                  <div className="pl-4">
                    <span className="text-[#38BDF8]">"status"</span>:{" "}
                    <span className="text-[#10B981]">"PRODUCTION_READY"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-[#38BDF8]">"visibility"</span>:{" "}
                    <span className={currentProject.isPrivate ? "text-[#EF4444]" : "text-[#10B981]"}>
                      "{currentProject.isPrivate ? "PRIVATE_ENTERPRISE (NDA PROTECTED)" : "PUBLIC"}"
                    </span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-[#38BDF8]">"url"</span>:{" "}
                    {currentProject.isPrivate ? (
                      <span className="text-[#EF4444]">"[RESTRICTED // REPOSITORY_IS_PRIVATE]"</span>
                    ) : (
                      <a
                        href={currentProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline hover:text-white"
                      >
                        "{currentProject.github}"
                      </a>
                    )}
                    {currentProject.demo && currentProject.demo !== "#" && ","}
                  </div>
                  {currentProject.demo && currentProject.demo !== "#" && (
                    <div className="pl-4">
                      <span className="text-[#38BDF8]">"live_demo"</span>:{" "}
                      <a
                        href={currentProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#10B981] underline hover:text-white"
                      >
                        "{currentProject.demo}"
                      </a>
                    </div>
                  )}
                  <div className="text-[#64748B]">{"}"}</div>
                </motion.div>
              )}

              {/* Tab 4: dev-server.log */}
              {activeTab === "log" && (
                <motion.div
                  key={`log-${currentProject.title}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 rounded-xl bg-[#050811] border border-[#1E293B] text-xs font-mono text-[#94A3B8] space-y-2 overflow-x-auto"
                >
                  <div className="text-[#64748B] flex items-center gap-2">
                    <FiPlay className="w-3 h-3 text-[#10B981]" />
                    <span>
                      $ npm run build &amp;&amp; systemctl start {currentProject.isPrivate ? "internal-service" : `${currentProject.repo}.service`}
                    </span>
                  </div>
                  <div className="text-[#10B981]">[INFO] Initializing virtual build target: {currentProject.title}</div>
                  {currentProject.isPrivate && (
                    <div className="text-[#EF4444]">[AUTH] Authenticated via enterprise internal VPN token (Protected Repo)</div>
                  )}
                  <div className="text-[#CBD5E1]">[LOG] Resolving dependencies: {currentProject.tech.join(", ")}</div>
                  <div className="text-[#CBD5E1]">[LOG] Compiling static modules and assets...</div>
                  <div className="text-[#10B981]">
                    [SUCCESS] Finished in 1.48s. Bundle size: optimized (0 errors, 0 warnings).
                  </div>
                  <div className="text-primary">
                    [DAEMON] Server listening on port 8080 (healthy / 100% uptime)
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* IDE Bottom Status Bar */}
          <div className="bg-[#0B1528] px-4 py-1.5 border-t border-[#1E293B] flex items-center justify-between text-[11px] text-[#94A3B8]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-primary">
                <FiGitBranch className="w-3 h-3" />
                <span>
                  {currentProject.isPrivate ? "protected (••••••••)" : currentProject.branch}
                </span>
              </span>
              <span className="text-[#64748B] hidden sm:inline">UTF-8</span>
              <span className="text-[#64748B] hidden sm:inline">Ln 1, Col 1</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#10B981] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>Ready</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
