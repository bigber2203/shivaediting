"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { 
  FaInstagram, 
  FaYoutube, 
  FaLinkedin, 
  FaBehance, 
  FaDribbble, 
  FaVimeo, 
  FaWhatsapp 
} from "react-icons/fa6";

export default function Footer() {
  const socialLinks = [
    { name: "Instagram", icon: FaInstagram, href: "#" },
    { name: "Vimeo", icon: FaVimeo, href: "#" },
    { name: "YouTube", icon: FaYoutube, href: "#" },
    { name: "LinkedIn", icon: FaLinkedin, href: "#" },
    { name: "Behance", icon: FaBehance, href: "#" },
    { name: "Dribbble", icon: FaDribbble, href: "#" },
    { name: "WhatsApp", icon: FaWhatsapp, href: "#" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-bg-matte border-t border-white/5 py-12 md:py-20 relative z-10 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-12 md:gap-16">
        
        {/* Top: Logo & Back to Top */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="font-display text-2xl font-black tracking-tight text-white">
              SHIVA
            </span>
            <span className="text-[10px] tracking-[0.4em] text-text-secondary font-display font-semibold uppercase mt-1">
              Cinematic Video Editor • Colorist
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-3 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white hover:text-bg-matte hover:border-white transition-all duration-300"
            data-cursor="click"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>

        {/* Middle: Social Links Row */}
        <div className="flex flex-wrap gap-6 md:gap-8 items-center border-y border-white/5 py-8">
          <span className="font-display text-[10px] tracking-widest text-text-secondary uppercase font-bold mr-2">
            CONNECT:
          </span>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {socialLinks.map((soc) => {
              const Icon = soc.icon;
              return (
                <a
                  key={soc.name}
                  href={soc.href}
                  className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors duration-250 text-sm font-display tracking-widest"
                  aria-label={soc.name}
                >
                  <Icon size={14} />
                  <span className="hidden sm:inline text-xs uppercase">{soc.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom: Copyright & Legal */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] text-text-secondary font-display tracking-widest">
          <span>&copy; {new Date().getFullYear()} SHIVA. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
