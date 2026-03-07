"use client";

import { FiGithub, FiLinkedin, FiMail, FiHeart } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="text-sm text-muted flex items-center gap-1">
          © {currentYear} Kai. Built with{" "}
          <FiHeart className="w-3.5 h-3.5 text-red-400 fill-current" /> using
          Next.js
        </p>

        {/* Social links */}
        <div className="flex items-center gap-4">
          {[
            { icon: FiGithub, href: "https://github.com/kai", label: "GitHub" },
            {
              icon: FiLinkedin,
              href: "https://linkedin.com/in/kai",
              label: "LinkedIn",
            },
            { icon: FiMail, href: "mailto:kai@email.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary transition-colors duration-200"
              aria-label={label}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
