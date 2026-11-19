"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import projectsData from "../data/projects.json";

export default function FeaturedProjects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Only show featured projects on home page
  const featuredProjects = projectsData.filter((p) => p.featured);

  return (
    <section id="projects" className="py-24 md:py-36 bg-bg-matte relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 md:mb-24">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-display tracking-[0.4em] text-accent uppercase font-bold">
              PORTFOLIO SHOWCASE
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white">
              FEATURED PROJECTS
            </h2>
          </div>
          <p className="text-text-secondary text-sm md:text-base font-display max-w-sm tracking-wide leading-relaxed">
            A selection of award-winning edits, commercials, and visual documentaries crafted for premium brands and directors.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {featuredProjects.map((project, index) => {
            const isHovered = hoveredId === project.id;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative flex flex-col gap-6"
              >
                {/* Cinematic Card Body */}
                <Link
                  href={`/projects/${project.id}`}
                  data-cursor="watch"
                  className="relative aspect-[16/10] w-full bg-bg-surface overflow-hidden border border-white/5 block shadow-2xl"
                >
                  {/* Poster Thumbnail / Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1c] to-[#0f0f0f] flex flex-col justify-between p-8 z-0">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] tracking-[0.3em] font-display text-white/40 uppercase font-semibold">
                        {project.category}
                      </span>
                      <span className="font-mono text-xs text-white/20">{project.year}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-accent font-display tracking-widest uppercase font-semibold">
                        {project.client}
                      </span>
                      <span className="font-display font-black text-xl tracking-tight text-white/30 uppercase">
                        {project.title}
                      </span>
                    </div>
                  </div>

                  {/* Cinematic Video Hover Preview */}
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 z-10 w-full h-full object-cover bg-black"
                    >
                      <video
                        src={project.videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover scale-[1.03]"
                      />
                    </motion.div>
                  )}

                  {/* Hover vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-20 pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-80" />

                  {/* Project Quick Meta (Fades in on hover) */}
                  <div className="absolute bottom-6 left-6 right-6 z-35 flex justify-between items-end pointer-events-none">
                    <div className="flex flex-col gap-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                      <span className="text-[10px] tracking-[0.2em] font-display text-accent font-bold uppercase">
                        {project.client}
                      </span>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight uppercase">
                        {project.title}
                      </h3>
                    </div>

                    <div className="w-10 h-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-[0.16,1,0.3,1]">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  {/* Thin glowing bottom line */}
                  <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-accent to-accent-glow w-0 group-hover:w-full transition-all duration-500 z-35" />
                </Link>

                {/* Metadata List underneath */}
                <div className="flex flex-wrap justify-between items-center text-xs text-text-secondary tracking-widest font-display pt-2 border-t border-white/5">
                  <div className="flex items-center gap-6">
                    <span>DIR: {project.client.toUpperCase()}</span>
                    <span className="hidden sm:inline text-white/20">•</span>
                    <span className="hidden sm:inline">DUR: {project.duration.toUpperCase()}</span>
                  </div>
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    {project.software.slice(0, 2).map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-white/5 border border-white/10 text-[9px] text-white font-medium uppercase">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
