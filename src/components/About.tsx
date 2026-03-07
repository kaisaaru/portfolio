"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
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
            About{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
              <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden border-2 border-border">
                <Image
                  src="/me/profile.jpg"
                  alt="Kai - Software Engineering Student"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 256px, 288px"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3 space-y-5"
          >
            <p className="text-lg text-muted leading-relaxed">
              Hello! I&apos;m{" "}
              <span className="text-primary font-semibold">
                Kaisar Rayfa Al Baihaqqi
              </span>
              , but everyone calls me Kai. I&apos;m a Software Engineering
              student with a deep passion for building web applications that
              solve real-world problems.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              I enjoy the entire process of turning ideas into functional,
              polished products—from planning architectures and designing
              intuitive user experiences to writing clean, maintainable code.
              I&apos;m constantly learning new technologies and improving my
              craft.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              When I&apos;m not coding, I love exploring new tech trends,
              contributing to open-source projects, and collaborating with
              teams to build meaningful systems.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { num: "3+", label: "Projects Built" },
                { num: "3+", label: "Tech Stacks" },
                { num: "2+", label: "Years Learning" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="text-center p-4 rounded-xl bg-surface border border-border"
                >
                  <span className="text-2xl font-bold text-primary">
                    {item.num}
                  </span>
                  <p className="text-xs text-muted mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
