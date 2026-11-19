"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Play, ArrowDown } from "lucide-react";

interface HeroProps {
  onWatchShowreel: () => void;
}

export default function Hero({ onWatchShowreel }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse Coordinates for parallax
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);

  // Smooth springs for parallax
  const springX = useSpring(mX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mY, { stiffness: 60, damping: 25 });

  // Parallax offsets (subtle)
  const videoX = useTransform(springX, [-0.5, 0.5], ["-2%", "2%"]);
  const videoY = useTransform(springY, [-0.5, 0.5], ["-2%", "2%"]);
  const videoScale = useTransform(springY, [-0.5, 0.5], [1.05, 1.1]);

  const textX = useTransform(springX, [-0.5, 0.5], ["-1%", "1%"]);
  const textY = useTransform(springY, [-0.5, 0.5], ["-1%", "1%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mX.set(x);
      mY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mX, mY]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-bg-matte flex items-center justify-center"
    >
      {/* Background Video */}
      <motion.div 
        style={{
          x: videoX,
          y: videoY,
          scale: videoScale,
        }}
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60 transform scale-[1.08] origin-center"
          src="/videos/shiva_edit.mp4"
        />
        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-matte via-transparent to-bg-matte/80" />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        style={{
          x: textX,
          y: textY,
        }}
        className="relative z-10 text-center max-w-5xl px-6 flex flex-col items-center justify-center"
      >
        {/* Decorative Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 mb-6 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
          <span className="text-[10px] tracking-[0.3em] font-display text-text-secondary uppercase font-semibold">
            AVAILABLE FOR PROJECTS
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-[5.5rem] leading-[0.95] tracking-tighter text-white mb-6 uppercase">
          <span className="block overflow-hidden py-1">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="block"
            >
              Transforming Raw Footage
            </motion.span>
          </span>
          <span className="block overflow-hidden py-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-accent">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1 }}
              className="block"
            >
              Into Cinematic Stories.
            </motion.span>
          </span>
        </h1>

        {/* Subtitle */}
        <div className="overflow-hidden mb-12">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
            className="text-text-secondary font-display text-xs sm:text-sm tracking-[0.2em] font-medium leading-relaxed max-w-2xl"
          >
            PROFESSIONAL VIDEO EDITING <span className="text-accent">•</span> COLOR GRADING <span className="text-accent">•</span> MOTION GRAPHICS <span className="text-accent">•</span> VISUAL STORYTELLING
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          {/* Watch Showreel Button */}
          <button
            onClick={onWatchShowreel}
            data-cursor="play"
            className="group flex items-center gap-3 px-8 py-4 bg-white text-bg-matte font-display text-sm font-bold tracking-widest transition-all duration-300 hover:bg-accent hover:text-white relative overflow-hidden"
          >
            <Play size={16} fill="currentColor" className="transition-transform duration-300 group-hover:scale-125" />
            WATCH SHOWREEL
          </button>

          {/* View Portfolio Button */}
          <a
            href="#projects"
            className="group flex items-center gap-2 px-8 py-4 border border-white/20 hover:border-white text-white font-display text-sm font-bold tracking-widest transition-all duration-300"
          >
            VIEW PORTFOLIO
          </a>
        </motion.div>
      </motion.div>

      {/* Down Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5, y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none z-10"
      >
        <span className="font-display text-[9px] tracking-[0.4em] text-text-secondary uppercase">SCROLL</span>
        <ArrowDown size={14} className="text-white" />
      </motion.div>
    </section>
  );
}
