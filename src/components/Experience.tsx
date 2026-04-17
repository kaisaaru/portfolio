"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experiences";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-surface/50">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4" />
          <p className="text-muted max-w-lg mx-auto">
            My journey and experiences in software development.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 shadow-lg shadow-primary/30" />

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />

                {/* Card */}
                <div className="ml-14 md:ml-0 md:w-1/2">
                  <div className="p-6 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all duration-300 group">
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-3">
                      {exp.period}
                    </span>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-200 mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-primary/70 font-medium mb-3">
                      {exp.org}
                    </p>
                    <p className="text-sm text-muted leading-relaxed mb-4">
                      {exp.description}
                    </p>
                    {/* Contributions */}
                    {"contributions" in exp && exp.contributions && (
                      <ul className="mb-4 space-y-1.5">
                        {(exp.contributions as string[]).map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-muted"
                          >
                            <span className="text-primary mt-0.5 shrink-0">✦</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 text-xs rounded-full bg-surface text-muted border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
