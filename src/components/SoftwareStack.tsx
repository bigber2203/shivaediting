"use client";

import { motion } from "framer-motion";
import { SiDavinciresolve, SiBlender } from "react-icons/si";

// Custom Adobe-like application badge components
const PremiereIcon = () => (
  <div className="w-12 h-12 rounded-md bg-[#000020] border-2 border-[#0000d6] flex items-center justify-center font-display font-black text-lg text-[#00c3ff] select-none shadow-[0_0_10px_rgba(0,195,255,0.15)]">
    Pr
  </div>
);

const AfterEffectsIcon = () => (
  <div className="w-12 h-12 rounded-md bg-[#000020] border-2 border-[#d600d6] flex items-center justify-center font-display font-black text-lg text-[#ec5eff] select-none shadow-[0_0_10px_rgba(236,94,255,0.15)]">
    Ae
  </div>
);

const PhotoshopIcon = () => (
  <div className="w-12 h-12 rounded-md bg-[#000020] border-2 border-[#00c3ff] flex items-center justify-center font-display font-black text-lg text-[#00c3ff] select-none shadow-[0_0_10px_rgba(0,195,255,0.15)]">
    Ps
  </div>
);

const IllustratorIcon = () => (
  <div className="w-12 h-12 rounded-md bg-[#000020] border-2 border-[#ff9a00] flex items-center justify-center font-display font-black text-lg text-[#ff9a00] select-none shadow-[0_0_10px_rgba(255,154,0,0.15)]">
    Ai
  </div>
);

const AuditionIcon = () => (
  <div className="w-12 h-12 rounded-md bg-[#000020] border-2 border-[#00e6a1] flex items-center justify-center font-display font-black text-lg text-[#00e6a1] select-none shadow-[0_0_10px_rgba(0,230,161,0.15)]">
    Au
  </div>
);

export default function SoftwareStack() {
  const tools = [
    {
      name: "DaVinci Resolve",
      isCustom: false,
      icon: SiDavinciresolve,
      color: "#ff8c00",
      floatDelay: 0,
      floatDuration: 5,
    },
    {
      name: "Premiere Pro",
      isCustom: true,
      icon: PremiereIcon,
      color: "#00c3ff",
      floatDelay: 0.5,
      floatDuration: 6,
    },
    {
      name: "After Effects",
      isCustom: true,
      icon: AfterEffectsIcon,
      color: "#ec5eff",
      floatDelay: 1.0,
      floatDuration: 5.5,
    },
    {
      name: "Blender",
      isCustom: false,
      icon: SiBlender,
      color: "#e87d0d",
      floatDelay: 0.3,
      floatDuration: 6.5,
    },
    {
      name: "Photoshop",
      isCustom: true,
      icon: PhotoshopIcon,
      color: "#00c3ff",
      floatDelay: 0.8,
      floatDuration: 4.8,
    },
    {
      name: "Illustrator",
      isCustom: true,
      icon: IllustratorIcon,
      color: "#ff9a00",
      floatDelay: 1.2,
      floatDuration: 5.2,
    },
    {
      name: "Audition",
      isCustom: true,
      icon: AuditionIcon,
      color: "#00e6a1",
      floatDelay: 0.2,
      floatDuration: 5.8,
    }
  ];

  return (
    <section className="py-24 bg-bg-matte relative z-10 overflow-hidden">
      {/* Background radial soft light leaks */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col gap-2 mb-16 text-center max-w-xl mx-auto">
          <span className="text-xs font-display tracking-[0.4em] text-accent uppercase font-bold">
            THE TOOLKIT
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-white">
            SOFTWARE STACK
          </h2>
          <p className="text-text-secondary text-sm font-display tracking-wide mt-2">
            Leveraging industry-standard post-production platforms to execute clean cuts, complex VFX, and rich color profiles.
          </p>
        </div>

        {/* Floating Badges Container */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 max-w-4xl mx-auto py-8">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            
            return (
              <motion.div
                key={tool.name}
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: tool.floatDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: tool.floatDelay
                }}
                whileHover={{
                  scale: 1.1,
                  y: -18,
                  transition: { type: "spring", stiffness: 400, damping: 15 }
                }}
                className="group p-5 sm:p-7 bg-bg-charcoal border border-white/5 flex flex-col items-center gap-4 cursor-pointer relative shadow-lg min-w-[120px] sm:min-w-[150px] aspect-square justify-center transition-all duration-300"
              >
                {/* Brand-specific hover neon shadow glow */}
                <div 
                  style={{
                    backgroundColor: tool.color,
                    boxShadow: `0 0 40px 10px ${tool.color}`
                  }}
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rounded-none"
                />

                {/* Glow frame */}
                <div 
                  style={{ borderColor: tool.color }}
                  className="absolute inset-0 border border-transparent group-hover:border-opacity-30 transition-colors duration-300 pointer-events-none"
                />

                {/* Icon wrapper */}
                <div 
                  style={{ color: "var(--color-text-secondary)" }}
                  className="text-4xl sm:text-5xl group-hover:scale-105 transition-transform duration-300 ease-[0.16,1,0.3,1] flex items-center justify-center h-12 w-12"
                >
                  {tool.isCustom ? (
                    <IconComponent />
                  ) : (
                    <IconComponent 
                      className="transition-colors duration-300"
                      style={{ color: "inherit" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = tool.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "inherit";
                      }}
                    />
                  )}
                </div>

                {/* Name */}
                <span className="font-display text-[10px] sm:text-xs font-bold tracking-widest text-text-secondary uppercase select-none group-hover:text-white transition-colors duration-300">
                  {tool.name}
                </span>

                {/* Tiny glowing dot */}
                <div 
                  style={{ backgroundColor: tool.color }}
                  className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_currentColor]"
                />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
