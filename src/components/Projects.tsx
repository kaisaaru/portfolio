"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiChevronDown } from "react-icons/fi";
import ImageCarousel from "./ImageCarousel";

const projects = [
  {
    title: "Project Management System (Manproy)",
    images: [
      { src: "/projects/manproy/ss1.png", alt: "Purchase Order Management" },
      { src: "/projects/manproy/ss2.png", alt: "Purchase Order Document" },
      { src: "/projects/manproy/ss3.png", alt: "Purchase Order Document" },
    ],
    description:
      "A web-based project management platform developed for SUNURTECH to support project planning, financial tracking, and operational workflows.",
    features: [
      "Task and project progress management",
      "Budget Planning (RAB) and Unit Price Analysis (AHS)",
      "Material request and purchase order management",
      "Goods receiving and inventory tracking",
      "Fund request management",
      "Resource monitoring and workflow coordination",
    ],
    tech: ["Laravel", "MySQL", "Vue"],
    github: "https://github.com/kai",
    demo: "#",
  },
  {
    title: "Travel Dashboard — GDGoC Telkom Bandung",
    description:
      "A web-based travel management dashboard developed as part of the GDGoC Web Development program. Built collaboratively in a team environment following a Product Design Requirement (PRD).",
    features: [
      "Email/password authentication & Google sign-in",
      "Admin dashboard with responsive sidebar navigation",
      "CRUD management for destinations, packages, users & bookings",
      "Booking quota validation",
      "Search and pagination",
      "Route protection based on authentication",
      "Mobile & desktop responsive design",
      "Light/Dark mode",
    ],
    tech: ["React", "Firebase"],
    github: "https://github.com/kai",
    demo: "#",
  },
  {
    title: "Financial Report Management System",
    description:
      "A web-based financial reporting system developed during my internship at KJA Kasir CA BKP to manage accounting operations and business transactions.",
    images: [
      { src: "/projects/kjakasir/ss1.png", alt: "Purchase Order Management" },
      { src: "/projects/kjakasir/ss2.png", alt: "Purchase Order Document" },
      { src: "/projects/kjakasir/ss3.png", alt: "Purchase Order Document" },
    ],
    features: [
      "Management of purchase orders, goods receipts, and purchase invoices",
      "Sales management including sales orders, delivery notes, and sales invoices",
      "Financial reporting with general ledger history, balance sheets, and profit & loss statements",
      "Inventory stock opname and cash reconciliation",
      "Data management for purchases and sales reporting",
    ],
    tech: ["Laravel", "MySQL", "JavaScript", "Bootstrap"],
    github: "https://github.com/kai",
    demo: "#",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (title: string) => {
    setExpanded(expanded === title ? null : title);
  };

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4" />
          <p className="text-muted max-w-lg mx-auto">
            A selection of projects that showcase my skills and experience.
          </p>
        </motion.div>

        {/* Projects */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="columns-1 md:columns-2 gap-6 space-y-6"
        >
          {projects.map((project) => {
            const isOpen = expanded === project.title;

            return (
              <motion.div
                key={project.title}
                variants={item}
                className="group relative rounded-2xl bg-surface border border-border hover:border-primary/50 p-6 transition-all duration-300 break-inside-avoid inline-block w-full"
              >
                {/* Gradient border effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />

                {/* Screenshot Carousel */}
                {project.images && project.images.length > 0 && (
                  <ImageCarousel images={project.images} />
                )}

                {/* Project header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                      />
                    </svg>
                  </div>
                  <div className="flex gap-3">
                    <div className="relative group/tooltip">
                      <div className="text-muted cursor-not-allowed flex items-center justify-center p-1">
                        <FiGithub className="w-5 h-5 opacity-50" />
                      </div>
                      
                      {/* Tooltip */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-surface-light border border-border text-foreground text-xs font-medium rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 whitespace-nowrap shadow-xl z-20">
                        Private Repository
                        {/* Tooltip Arrow */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-surface-light border-b border-r border-border rotate-45" />
                      </div>
                    </div>
                    <div className="relative group/tooltip">
                      <div className="text-muted cursor-not-allowed flex items-center justify-center p-1">
                        <FiExternalLink className="w-5 h-5 opacity-50" />
                      </div>
                      
                      {/* Tooltip */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-surface-light border border-border text-foreground text-xs font-medium rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 whitespace-nowrap shadow-xl z-20">
                        Coming Soon
                        {/* Tooltip Arrow */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-surface-light border-b border-r border-border rotate-45" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tech Stack Tags (always visible) */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Expand/Collapse toggle */}
                {project.features && (
                  <div className="pt-4 mt-4 border-t border-border/50">
                    <button
                      onClick={() => toggle(project.title)}
                      className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors duration-200 cursor-pointer"
                    >
                      <span>{isOpen ? "Hide Details" : "View Details"}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FiChevronDown className="w-4 h-4" />
                      </motion.span>
                    </button>

                    {/* Collapsible features */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-4 pt-4 border-t border-border space-y-2">
                            {project.features.map((feature) => (
                              <li
                                key={feature}
                                className="flex items-start gap-2 text-sm text-muted"
                              >
                                <span className="text-primary mt-0.5 shrink-0">
                                  ✦
                                </span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
