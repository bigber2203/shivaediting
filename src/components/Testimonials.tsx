"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Marcus Thorne",
      role: "Creative Director",
      company: "Red Bull Media House",
      text: "The pacing of Shiva's cuts is masterclass. He doesn't just assemble shots—he creates a visceral, emotional rhythm that grabs you by the throat."
    },
    {
      name: "Yuki Tanaka",
      role: "Marketing Director",
      company: "Sony Asia",
      text: "Every frame Shiva grades feels like a canvas painting. He has an intuitive sense of lighting and narrative rhythm that is incredibly rare."
    },
    {
      name: "Sarah Jenkins",
      role: "Senior Producer",
      company: "National Geographic",
      text: "Shiva respects the quiet moments. His audio soundscapes and editing pace created a powerful atmospheric tension that elevated our docu series."
    },
    {
      name: "Adam Kiciński",
      role: "Trailer Lead",
      company: "CD Projekt Red",
      text: "Stunning speed ramp workflows and glitch animations. He delivered a high-octane commercial cut that completely blew our team away."
    }
  ];

  return (
    <section className="py-24 bg-bg-charcoal border-y border-white/5 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="flex flex-col gap-2 max-w-lg">
          <span className="text-xs font-display tracking-[0.4em] text-accent uppercase font-bold">
            CLIENT FEEDBACK
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-white">
            TRUSTED WORDS
          </h2>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Container */}
      <div className="relative w-full flex overflow-hidden py-4 select-none">
        {/* Left and Right blur vignettes */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-bg-charcoal to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-bg-charcoal to-transparent z-10 pointer-events-none" />

        {/* Scrolling tracks */}
        <motion.div 
          animate={{ x: [0, "-50%"] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex gap-8 whitespace-nowrap min-w-max px-4"
        >
          {/* Double array for seamless loop */}
          {[...reviews, ...reviews].map((rev, index) => (
            <div
              key={`${rev.name}-${index}`}
              className="glass-panel w-[320px] sm:w-[420px] p-8 flex flex-col justify-between gap-6 border border-white/5 relative overflow-hidden"
            >
              {/* Quotes Icon Overlay */}
              <Quote className="absolute right-6 top-6 w-16 h-16 text-white/5 pointer-events-none" />

              <p className="text-text-secondary text-sm sm:text-base font-display tracking-wide leading-relaxed whitespace-normal italic">
                &ldquo;{rev.text}&rdquo;
              </p>

              <div className="flex flex-col gap-1 border-t border-white/5 pt-4">
                <span className="font-display font-bold text-sm text-white tracking-wide uppercase">
                  {rev.name}
                </span>
                <span className="font-display text-[10px] tracking-widest text-accent font-semibold uppercase">
                  {rev.role} • {rev.company}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
