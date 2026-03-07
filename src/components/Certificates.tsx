"use client";

import { motion } from "framer-motion";
import { FiAward, FiExternalLink } from "react-icons/fi";

const certificates = [
  {
    title: "Web Development Fundamentals",
    issuer: "Online Course Platform",
    date: "2024",
    link: "#",
  },
  {
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    date: "2024",
    link: "#",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "2023",
    link: "#",
  },
  {
    title: "PHP & Laravel Development",
    issuer: "Online Course Platform",
    date: "2024",
    link: "#",
  },
  {
    title: "Database Management with MySQL",
    issuer: "Online Course Platform",
    date: "2023",
    link: "#",
  },
  {
    title: "React for Beginners",
    issuer: "Online Course Platform",
    date: "2024",
    link: "#",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Certificates() {
  return (
    <section id="certificates" className="py-24 px-6">
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
            Certificates &{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Courses
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4" />
          <p className="text-muted max-w-lg mx-auto">
            Continuous learning and professional development.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {certificates.map((cert) => (
            <motion.div
              key={cert.title}
              variants={item}
              whileHover={{ y: -4 }}
              className="group p-5 rounded-2xl bg-surface border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-primary/10">
                  <FiAward className="w-5 h-5 text-primary" />
                </div>
                {cert.link !== "#" && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-primary transition-colors"
                  >
                    <FiExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-200 mb-1">
                {cert.title}
              </h3>
              <p className="text-xs text-muted mb-2">{cert.issuer}</p>
              <span className="text-xs text-primary/70 font-medium">
                {cert.date}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
