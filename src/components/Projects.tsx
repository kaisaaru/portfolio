"use client";

import { motion } from "framer-motion";
import { FiGitBranch, FiTerminal } from "react-icons/fi";
import { projects } from "@/data/projects";
import IdeWorkstationView from "./projects/IdeWorkstationView";

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 font-mono relative">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#1E293B] pb-4 gap-2"
        >
          <div>
            <div className="text-xs text-primary flex items-center gap-1.5 mb-1.5 font-bold tracking-wider">
              <FiGitBranch className="w-3.5 h-3.5" />
              <span>VCS_LOG // SHIPPED REPOSITORIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              git log --featured-projects
            </h2>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
            <span className="flex items-center gap-1.5 text-primary">
              <FiTerminal className="w-3 h-3" />
              <span>CYBER_IDE WORKSTATION</span>
            </span>
            <span>·</span>
            <span>{projects.length} REPOSITORIES SYNCED</span>
          </div>
        </motion.div>

        {/* Dedicated Cyber IDE Workstation */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <IdeWorkstationView projects={projects} />
        </motion.div>
      </div>
    </section>
  );
}
