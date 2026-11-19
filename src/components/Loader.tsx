"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [timecode, setTimecode] = useState("00:00:00:00");

  useEffect(() => {
    // Progress counter simulation (approx 2 seconds)
    const duration = 2400; // ms
    const intervalTime = 30; // ms
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(currentProgress);

      // Frame timecode calculation (24fps simulation)
      // e.g. 00:00:00:xx (counting up to 00:00:02:18)
      const totalFrames = Math.floor((currentProgress / 100) * 60); // 60 frames max
      const seconds = Math.floor(totalFrames / 24);
      const frames = totalFrames % 24;
      const formattedSeconds = String(seconds).padStart(2, "0");
      const formattedFrames = String(frames).padStart(2, "0");
      setTimecode(`00:00:${formattedSeconds}:${formattedFrames}`);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 500); // Small pause for UX before sliding out
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: -100,
        filter: "blur(20px)",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[99999] flex flex-col justify-between bg-bg-matte p-8 md:p-16 select-none overflow-hidden"
    >
      {/* Top Section: Branding & Soundwave */}
      <div className="flex justify-between items-center w-full">
        <span className="font-display text-xs tracking-[0.3em] text-text-secondary uppercase">
          [ EDITOR PORTFOLIO ]
        </span>
        <div className="flex items-end gap-1 h-5">
          <span className="sound-bar h-4"></span>
          <span className="sound-bar h-6"></span>
          <span className="sound-bar h-5"></span>
          <span className="sound-bar h-3"></span>
          <span className="sound-bar h-7"></span>
        </div>
      </div>

      {/* Middle Section: Logo Reveal */}
      <div className="flex flex-col items-center justify-center my-auto">
        <div className="overflow-hidden reveal-text py-2">
          <motion.h1 
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white"
          >
            SHIVA
          </motion.h1>
        </div>
        <div className="overflow-hidden reveal-text">
          <motion.p
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: 0.3 }}
            className="text-xs sm:text-sm tracking-[0.5em] text-accent font-display uppercase font-semibold mt-2"
          >
            FRAME BY FRAME
          </motion.p>
        </div>
      </div>

      {/* Bottom Section: Progress bar & Timecode */}
      <div className="w-full flex flex-col gap-4">
        <div className="flex justify-between items-end font-mono text-xs text-text-secondary">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
            <span>RENDERING REEL</span>
          </div>
          <span className="text-white font-medium text-sm tracking-wider">{timecode}</span>
        </div>
        
        {/* Progress Bar Track */}
        <div className="w-full h-[2px] bg-white/10 relative">
          <motion.div 
            style={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-accent to-accent-glow shadow-[0_0_8px_rgba(0,102,255,0.8)]"
            transition={{ ease: "easeOut" }}
          />
          
          {/* Subdivisions mapping a timeline */}
          <div className="absolute inset-0 flex justify-between pointer-events-none opacity-20">
            {Array.from({ length: 11 }).map((_, i) => (
              <span key={i} className="w-[1px] h-2 bg-white -translate-y-1/2"></span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center text-[10px] text-text-secondary font-display tracking-widest">
          <span>PROGRESS: {progress}%</span>
          <span>FPS: 24.00</span>
        </div>
      </div>
    </motion.div>
  );
}
