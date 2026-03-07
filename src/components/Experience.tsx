"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    title: "Full Stack Developer (Personal Project)",
    org: "Learning Management System (LMS)",
    period: "Mar 2026 — Present",
    description:
      "Developing a Learning Management System (LMS) designed for schools and universities to support digital learning and course management.",
    contributions: [
      "Designing and developing a web-based LMS platform for managing courses, users, and learning materials.",
      "Implementing role-based access control for administrators, instructors, and students.",
      "Building features for course enrollment, assignment management, and progress tracking.",
      "Developing a scalable backend architecture and database structure to support academic workflows.",
    ],
    tags: ["Next.js", "Node.js", "MySQL", "Tailwind CSS"],
  },
  {
    title: "Full Stack Developer (Freelance)",
    org: "SUNURTECH",
    period: "Feb 2026 — Present",
    description:
      "Developing a web-based Project Management system (Manproy) to streamline project planning and operational workflows.",
    contributions: [
      "Designed and developed modules for task management and project tracking.",
      "Implemented financial and operational modules including Budget Planning (RAB) and Unit Price Analysis (AHS).",
      "Built workflow features for material requests, purchase orders, goods receiving, and fund requests.",
      "Developed tools to help teams monitor project progress, manage resources, and improve coordination across project activities.",
    ],
    tags: ["Laravel", "MySQL", "JavaScript", "Tailwind CSS"],
  },
  {
    title: "Software Engineering Student",
    org: "Telkom University",
    period: "Sep 2024 — Present",
    description:
      "Pursuing a degree in Software Engineering with a focus on web development, database systems, and software architecture. Actively building real-world projects and continuously sharpening development skills through coursework and independent work.",
    tags: ["Software Engineering", "Web Development", "Algorithms"],
  },
  {
    title: "Member",
    org: "Google Developer Groups on Campus (GDGoC)",
    period: "Jan 2025 — Apr 2025",
    description:
      "Participated in the Web Development program and collaborated with a team to build a Travel Dashboard, a web-based travel management system with authentication, admin dashboard, and CRUD features.",
    tags: ["React", "Tailwind CSS", "Firebase"],
  },
  {
    title: "Web Developer Intern",
    org: "Kantor Jasa Akuntan KJA Kasir CA BKP",
    period: "Oct 2023 — Mar 2024",
    description:
      "Worked as a Back-End Developer developing a web-based financial reporting system to support accounting and operational processes.",
    contributions: [
      "Developed backend modules for managing purchase orders, goods receipts, purchase invoices, and sales transactions.",
      "Implemented financial reporting features including general ledger history, balance sheets, and profit & loss statements.",
      "Built inventory and financial reconciliation features such as stock opname and cash reconciliation.",
      "Collaborated with the development team to support system development and data management.",
    ],
    tags: ["Laravel", "MySQL", "JavaScript", "Bootstrap"],
  },
  {
    title: "Software Engineering Student (RPL)",
    org: "SMKN 13 Bandung",
    period: "Jul 2021 — May 2024",
    description:
      "Built a strong foundation in programming fundamentals and web development while delivering multiple web-based projects as part of the vocational curriculum.",
    tags: ["HTML", "CSS", "PHP", "MySQL"],
  },
];

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
