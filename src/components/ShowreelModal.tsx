"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

export default function ShowreelModal({ isOpen, onClose, videoUrl }: ShowreelModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Esc key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Focus modal container on mount
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12 select-none"
          role="dialog"
          aria-modal="true"
        >
          {/* Background overlay click handler */}
          <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-3 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white hover:text-bg-matte hover:border-white transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0)] hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            aria-label="Close modal"
          >
            <X size={20} />
          </motion.button>

          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.1 }}
            className="relative w-full max-w-5xl aspect-video bg-bg-surface border border-white/10 shadow-[0_20px_50px_rgba(0,102,255,0.15)] overflow-hidden"
          >
            <video
              ref={videoRef}
              src={videoUrl}
              autoPlay
              controls
              className="w-full h-full object-contain"
              playsInline
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
