"use client";

import { motion } from "framer-motion";
import { Search, Eye, Sparkles, Volume2, Palette, CheckCircle } from "lucide-react";

export default function Workflow() {
  const steps = [
    {
      icon: Search,
      title: "01. Discovery & Conception",
      subtitle: "Aligning on Narrative Vision",
      desc: "Analyzing scripts, storyboards, and director notes. We define the emotional tone, visual references, pacing requirements, and technical formats."
    },
    {
      icon: Eye,
      title: "02. Selects & Assembly",
      subtitle: "Finding the Golden Rushes",
      desc: "Sifting through hours of raw files. Labeling clips, organizing metadata, and selecting the most powerful performance takes and angles to construct the initial rough cut."
    },
    {
      icon: Sparkles,
      title: "03. Narrative Fine Cut",
      subtitle: "Crafting the Story Rhythm",
      desc: "Sculpting the edit frame by frame. Refining timing, managing narrative pacing, placing match-cuts, speed ramps, and shaping the core structure of the film."
    },
    {
      icon: Volume2,
      title: "04. Sound Design & Audio",
      subtitle: "Creating Sonic Immersion",
      desc: "Building a multi-layered acoustic scape. Designing foley effects, integrating atmospheric layers, mixing soundtracks, and balancing dialogue clarity."
    },
    {
      icon: Palette,
      title: "05. Color Grading",
      subtitle: "Unifying the Visual Esthetic",
      desc: "Applying color correction and grading in DaVinci Resolve. Balancing matching cams, setting contrast ratios, and adding custom film emulations."
    },
    {
      icon: CheckCircle,
      title: "06. Delivery & Formats",
      subtitle: "Ready for Screen & Social",
      desc: "Exporting high-quality ProRes master files, web-compressed MP4s, or optimized vertical cuts for social distribution, alongside project archives."
    }
  ];

  return (
    <section id="workflow" className="py-24 md:py-36 bg-bg-charcoal relative z-10 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20 md:mb-28">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-display tracking-[0.4em] text-accent uppercase font-bold">
              THE PIPELINE
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white">
              EDITING WORKFLOW
            </h2>
          </div>
          <p className="text-text-secondary text-sm md:text-base font-display max-w-sm tracking-wide leading-relaxed">
            A precise, industry-tested pipeline designed to guide projects seamlessly from camera raw files to final deliverables.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative pl-6 sm:pl-12 max-w-4xl mx-auto flex flex-col gap-12 sm:gap-16">
          {/* Vertical Glowing Line */}
          <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-white/10">
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-accent to-accent-glow shadow-[0_0_10px_rgba(0,102,255,0.6)]"
            />
          </div>

          {/* Timeline Cards */}
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                className="relative"
              >
                {/* Node Dot */}
                <div className="absolute -left-[30px] sm:-left-[54px] top-1.5 w-3 h-3 sm:w-5 sm:h-5 rounded-full bg-bg-matte border border-white/20 flex items-center justify-center z-10 transition-colors duration-300 group-hover:border-accent">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, delay: index * 0.1 + 0.3 }}
                    className="w-1 sm:w-2 h-1 sm:h-2 rounded-full bg-accent"
                  />
                </div>

                {/* Content Box */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <div className="text-accent">
                      <Icon size={18} />
                    </div>
                    <span className="text-[10px] tracking-[0.2em] font-display text-accent font-bold uppercase">
                      {step.subtitle}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg sm:text-2xl text-white tracking-tight uppercase">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-xs sm:text-sm font-display tracking-wide leading-relaxed max-w-2xl mt-1">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
