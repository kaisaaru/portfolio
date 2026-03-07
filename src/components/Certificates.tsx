"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import Image from "next/image";

const certificates = [
  {
    title: "Finalist – Inovasi Adikara 2025",
    issuer: "Adikara",
    date: "2025",
    image: "/certificates/adikara2025.png",
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
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    if (selectedCert) {
      window.addEventListener("keydown", handleKeyDown);
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedCert]);

  const activeCert = certificates.find((c) => c.image === selectedCert);

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
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Certificates
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4" />
          <p className="text-muted max-w-lg mx-auto">
            Achievements and recognitions in the tech field.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certificates.map((cert) => (
            <motion.div
              key={cert.title}
              variants={item}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedCert(cert.image)}
              className="group cursor-pointer rounded-2xl bg-surface border border-border hover:border-primary/50 overflow-hidden transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative w-full aspect-[4/3] bg-background">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-full text-sm">
                    Click to view
                  </span>
                </div>
              </div>
              <div className="p-5 mt-auto border-t border-border">
                <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-200 mb-1">
                  {cert.title}
                </h3>
                <div className="flex items-center justify-between text-muted text-sm mt-3">
                  <span>{cert.issuer}</span>
                  <span className="text-primary/70 font-medium">{cert.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-all p-3 z-50"
              aria-label="Close modal"
            >
              <FiX className="w-6 h-6" />
            </button>

            {/* Image container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-[85vh] aspect-auto bg-black rounded-lg overflow-hidden shadow-2xl flex items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing
            >
              <img
                src={selectedCert}
                alt={activeCert.title}
                className="max-w-full max-h-[85vh] object-contain"
              />
              
              {/* Optional: Caption at the bottom */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-1">{activeCert.title}</h3>
                <p className="text-white/80 text-sm">{activeCert.issuer} — {activeCert.date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
