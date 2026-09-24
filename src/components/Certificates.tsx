"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiAward, FiCheckCircle, FiMaximize2, FiExternalLink } from "react-icons/fi";
import Image from "next/image";
import { certificates } from "@/data/certificates";

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    if (selectedCert) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedCert]);

  const activeCert = certificates.find((c) => c.image === selectedCert);

  return (
    <section id="certificates" className="py-24 px-4 sm:px-6 font-mono relative">
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
              <FiAward className="w-3.5 h-3.5" />
              <span>KEYRING_REGISTRY // VERIFIED CREDENTIALS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              gpg --verify-credentials
            </h2>
          </div>
          <div className="text-xs text-[#64748B] flex items-center gap-2">
            <FiCheckCircle className="text-accent w-3 h-3" />
            <span>ALL {certificates.length} SIGNATURES VALID</span>
          </div>
        </motion.div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="terminal-window rounded-xl overflow-hidden border border-[#1E293B] group hover:border-primary/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Terminal Titlebar */}
                <div className="bg-[#0A0F1D] px-4 py-2.5 border-b border-[#1E293B] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                    <span className="ml-2 text-[#94A3B8] font-bold text-[11px]">
                      cert_{index + 1}.sha256
                    </span>
                  </div>
                  <span className="text-[10px] text-accent uppercase font-bold">
                    [VERIFIED]
                  </span>
                </div>

                {/* Certificate Image Preview */}
                <div
                  onClick={() => setSelectedCert(cert.image)}
                  className="relative h-56 w-full bg-[#050811] cursor-pointer overflow-hidden group/img"
                >
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover group-hover/img:scale-105 transition-transform duration-500 opacity-90 group-hover/img:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-80" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/50 backdrop-blur-xs">
                    <div className="px-3 py-1.5 rounded-lg bg-[#0B0F19] border border-primary text-primary text-xs flex items-center gap-1.5">
                      <FiMaximize2 className="w-3.5 h-3.5" />
                      <span>View Inspection Frame</span>
                    </div>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="p-5 space-y-2">
                  <h3 className="text-sm font-bold text-white group-hover:text-primary transition-colors leading-snug">
                    {cert.title}
                  </h3>
                  <div className="text-xs text-[#94A3B8] space-y-1">
                    <div>
                      ISSUER: <strong className="text-secondary font-semibold">{cert.issuer}</strong>
                    </div>
                    <div className="text-[#64748B]">DATE: {cert.date}</div>
                  </div>
                </div>
              </div>

              {/* Card Action Link */}
              {cert.verifyUrl && (
                <div className="px-5 py-3 border-t border-[#1E293B]/70 bg-[#0A0F1D]/50 flex items-center justify-between text-xs">
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-white flex items-center gap-1.5 transition-colors font-mono"
                  >
                    <FiExternalLink className="w-3.5 h-3.5" />
                    <span>Verify Credential</span>
                  </a>
                  <span className="text-[10px] text-[#64748B]">coursera.org</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Terminal Modal Document Viewer */}
      <AnimatePresence>
        {selectedCert && activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full terminal-window rounded-xl overflow-hidden border border-[#38BDF8]/60 shadow-[0_0_50px_rgba(56,189,248,0.2)]"
            >
              {/* Modal Window Bar */}
              <div className="bg-[#0A0F1D] px-4 py-3 border-b border-[#1E293B] flex items-center justify-between gap-2">
                <div className="text-xs text-[#E2E8F0] font-bold truncate min-w-0 pr-2">
                  display --cert &quot;{activeCert.title}&quot;
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1 rounded text-[#94A3B8] hover:text-white hover:bg-[#1E293B] transition-colors cursor-pointer shrink-0"
                  aria-label="Close Preview"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 bg-[#050811] flex items-center justify-center max-h-[75vh] overflow-hidden">
                <div className="relative w-full h-[60vh]">
                  <Image
                    src={selectedCert}
                    alt={activeCert.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="p-3 bg-[#0B0F19] border-t border-[#1E293B] text-xs text-[#94A3B8] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span>ISSUED_BY: <strong className="text-white">{activeCert.issuer}</strong></span>
                  {activeCert.verifyUrl && (
                    <a
                      href={activeCert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 font-bold"
                    >
                      <FiExternalLink className="w-3.5 h-3.5" />
                      <span>Verify Credential</span>
                    </a>
                  )}
                </div>
                <span>ESC to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
