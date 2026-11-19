"use client";

import { motion } from "framer-motion";
import { Film, Palette, Volume2, Sparkles, Tv, HelpCircle } from "lucide-react";

export default function Services() {
  const services = [
    {
      num: "01",
      icon: Film,
      title: "Video Editing",
      desc: "Creating rhythmic, narrative-driven cuts from multi-cam shoots, drones, and heavy RAW source files. Specializing in pacing, high-action sports, and storytelling edits."
    },
    {
      num: "02",
      icon: Palette,
      title: "Color Grading",
      desc: "Calibrating and styling colors in DaVinci Resolve. Meticulous skin-tone balancing, contrast control, and custom cinematic film print LUT mapping."
    },
    {
      num: "03",
      icon: Volume2,
      title: "Sound Design & Foley",
      desc: "Crafting fully custom audio environments. Layering SFX, designing environmental ambient noise, tactile foley impact, and balanced dynamic mixes."
    },
    {
      num: "04",
      icon: Sparkles,
      title: "Motion Graphics",
      desc: "Integrating premium titles, typography, visual transitions, glitch animations, and seamless 3D camera tracking inside After Effects and Blender."
    },
    {
      num: "05",
      icon: Tv,
      title: "Commercial & Promo",
      desc: "High-energy commercial edits built to capture immediate attention. Tailored for agency pitches, premium brands, and social media campaigns."
    },
    {
      num: "06",
      icon: HelpCircle,
      title: "Docu Storytelling",
      desc: "Patient, emotion-focused editing for documentaries. Managing interviews, balancing structure, and creating long-form visual arcs that resonate."
    }
  ];

  return (
    <section id="services" className="py-24 md:py-36 bg-bg-matte relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 md:mb-24">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-display tracking-[0.4em] text-accent uppercase font-bold">
              WHAT I DO
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white">
              CRAFTED SERVICES
            </h2>
          </div>
          <p className="text-text-secondary text-sm md:text-base font-display max-w-sm tracking-wide leading-relaxed">
            Delivering end-to-end post-production services tailored to raise raw footage into award-worthy cinema.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group p-8 bg-bg-charcoal border border-white/5 relative overflow-hidden flex flex-col justify-between aspect-[4/3] min-h-[250px] shadow-lg hover:border-accent/40 transition-all duration-300"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Card Top: Number & Icon */}
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs text-white/25 group-hover:text-accent transition-colors duration-300">
                    {service.num}
                  </span>
                  <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary group-hover:text-white group-hover:border-accent transition-all duration-300">
                    <Icon size={18} />
                  </div>
                </div>

                {/* Card Bottom: Text */}
                <div className="flex flex-col gap-3">
                  <h3 className="font-display font-bold text-xl text-white tracking-tight uppercase">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary text-xs sm:text-sm font-display tracking-wide leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                {/* Subtle bottom glow strip */}
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
