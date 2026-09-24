"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiFolder, FiFileText, FiCheckSquare, FiTerminal } from "react-icons/fi";

export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 font-mono relative">
      <div className="max-w-6xl mx-auto space-y-12">
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
              <FiTerminal className="w-3.5 h-3.5" />
              <span>SYSTEM_INFO // DOSSIER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              cat ./about.me
            </h2>
          </div>
          <div className="text-xs text-[#94A3B8]">
            FILE_SIZE: 4.2KB · PERMISSION: -rwxr-xr--
          </div>
        </motion.div>

        {/* Dossier Terminal Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Explorer Tree & System Specs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 space-y-5"
          >
            {/* System File Explorer */}
            <div className="p-4 rounded-xl bg-[#0B0F19] border border-[#1E293B] space-y-3 text-xs">
              <div className="text-[#94A3B8] font-bold pb-2 border-b border-[#1E293B] flex items-center justify-between">
                <span>DIRECTORY TREE</span>
                <span className="text-primary">kaisaaru/</span>
              </div>
              <ul className="space-y-1.5 text-[#94A3B8]">
                <li className="flex items-center gap-2 text-primary font-semibold">
                  <FiFolder className="w-3.5 h-3.5" />
                  <span>~/developer/</span>
                </li>
                <li className="pl-4 flex items-center gap-2 text-[#E2E8F0]">
                  <FiFileText className="w-3.5 h-3.5 text-accent" />
                  <span>about.me <span className="text-[10px] text-primary">[OPEN]</span></span>
                </li>
                <li className="pl-4 flex items-center gap-2">
                  <FiFileText className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <span>tech_stack.json</span>
                </li>
                <li className="pl-4 flex items-center gap-2">
                  <FiFileText className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <span>projects_manifest.yaml</span>
                </li>
                <li className="pl-4 flex items-center gap-2 text-accent-pink font-semibold">
                  <FiFileText className="w-3.5 h-3.5" />
                  <span>2030_isla_nyata.md</span>
                </li>
              </ul>
            </div>

            {/* Isla Inspiration Photo Frame */}
            <div className="p-4 rounded-xl bg-[#0B0F19] border border-[#1E293B] space-y-3">
              <div className="flex items-center justify-between text-xs text-[#94A3B8] pb-2 border-b border-[#1E293B]">
                <span className="text-accent-pink font-bold">🌸 CORE INSPIRATION</span>
                <span className="text-[10px] text-muted">ID: ISLA-001</span>
              </div>
              <div className="w-full h-44 rounded-lg overflow-hidden relative border border-[#1E293B]">
                <Image
                  src="/profile-assets/isla.jpeg"
                  alt="Isla - Inspiration"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-2 left-3 right-3 text-[11px] text-white font-semibold">
                  #2030IslaNyata
                </div>
              </div>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                The future I imagine that pushes me to build real systems rather than just dream about them.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Quote Banner */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Bio Terminal Card */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#0B0F19]/90 border border-[#1E293B] space-y-6">
              <div className="space-y-4 text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                <p>
                  Hi, I&apos;m <span className="text-white font-bold">Kai</span> (
                  <span className="text-primary font-semibold">Kaisar Rayfa Al Baihaqqi</span>).
                </p>
                <p>
                  I&apos;m a Software Engineering student and developer who enjoys{" "}
                  <span className="text-accent font-semibold">building things from ideas</span>.
                </p>
                <p className="text-[#94A3B8]">
                  I explore different sides of technology, from web applications and software
                  systems to AI and whatever catches my curiosity. I don&apos;t really want to be
                  defined by a single stack. I&apos;d rather keep learning, building, and figuring
                  out how things work.
                </p>
              </div>

              {/* Code Box Quote */}
              <div className="p-4 rounded-xl bg-[#050811] border border-[#1E293B] text-xs sm:text-sm text-secondary font-mono leading-loose">
                <p>&gt; Some projects start as coursework.</p>
                <p>&gt; Some start as random ideas.</p>
                <p className="text-white font-semibold">
                  &gt; Some become something I keep building long after the assignment ends.
                </p>
              </div>

              {/* Isla Inspiration Section */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-accent-pink uppercase tracking-wider">
                  <span>🌸 Beyond the code</span>
                </div>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Beyond the code, there&apos;s something more personal that keeps me building.{" "}
                  <strong className="text-white">Isla inspires me.</strong> The things Isla
                  represents to me—the ideas, the feeling, and the future I imagine—became one of
                  the reasons I want to keep creating things instead of just dreaming about them.
                </p>
              </div>

              {/* Interactive Isla Quote Banner (Recreating isla-quote.svg) */}
              <div className="relative rounded-xl p-6 bg-gradient-to-r from-[#080B12] via-[#0B0F19] to-[#080B12] border border-[#1E293B] overflow-hidden text-center space-y-2 shadow-lg">
                <div className="absolute top-0 left-10 right-10 h-[1.5px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />
                <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  &ldquo; Making Isla Real. &rdquo;
                  <span className="text-primary term-cursor">_</span>
                </div>
                <div className="text-xs text-[#94A3B8]">
                  <span className="text-primary font-semibold">#2030IslaNyata</span>{" "}
                  <span className="text-[#334155]">·</span>{" "}
                  <span className="text-[#94A3B8]">One idea, one project, and one step at a time.</span>
                </div>
              </div>

              {/* Concluding Note */}
              <p className="text-xs sm:text-sm text-[#94A3B8] italic">
                &ldquo;Maybe it&apos;s an ambitious goal. Maybe it&apos;ll take longer than I expect.
                But for now, I&apos;ll keep building, one idea, one project, and one step at a time.&rdquo;
              </p>

              {/* Quick Stat Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#1E293B]">
                <div className="p-3 rounded-lg bg-[#050811] border border-[#1E293B] text-center">
                  <div className="text-xl font-bold text-primary">3+</div>
                  <div className="text-[10px] text-[#94A3B8] uppercase mt-0.5">Projects Shipped</div>
                </div>
                <div className="p-3 rounded-lg bg-[#050811] border border-[#1E293B] text-center">
                  <div className="text-xl font-bold text-secondary">3+</div>
                  <div className="text-[10px] text-[#94A3B8] uppercase mt-0.5">Core Stacks</div>
                </div>
                <div className="p-3 rounded-lg bg-[#050811] border border-[#1E293B] text-center">
                  <div className="text-xl font-bold text-accent">2+</div>
                  <div className="text-[10px] text-[#94A3B8] uppercase mt-0.5">Years Learning</div>
                </div>
                <div className="p-3 rounded-lg bg-[#050811] border border-[#1E293B] text-center">
                  <div className="text-xl font-bold text-accent-pink">2030</div>
                  <div className="text-[10px] text-[#94A3B8] uppercase mt-0.5">Vision Target</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
