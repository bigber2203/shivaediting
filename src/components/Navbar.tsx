"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Workflow", href: "#workflow" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "py-4 bg-bg-matte/80 backdrop-blur-md border-b border-white/5" 
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex flex-col group select-none">
            <span className="font-display text-lg font-black tracking-tight text-white transition-colors duration-300 group-hover:text-accent">
              SHIVA
            </span>
            <span className="text-[9px] tracking-[0.4em] text-text-secondary font-display font-semibold transition-colors duration-300 group-hover:text-white uppercase">
              Film Editor
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-display tracking-widest text-text-secondary hover:text-white transition-colors duration-250 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name.toUpperCase()}
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2.5 text-xs font-display font-bold tracking-widest text-white border border-white/20 rounded-none hover:border-accent hover:bg-accent transition-all duration-300 shadow-[0_0_15px_rgba(0,102,255,0)] hover:shadow-[0_0_15px_rgba(0,102,255,0.4)]"
            >
              HIRE ME
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-accent transition-colors p-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg-matte/95 backdrop-blur-lg pt-28 px-6 md:hidden flex flex-col justify-between pb-12"
          >
            <div className="flex flex-col gap-6">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-display font-bold tracking-widest text-text-secondary hover:text-white"
                >
                  {item.name.toUpperCase()}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-4 text-center text-sm font-display font-bold tracking-widest text-white border border-white/20 hover:border-accent hover:bg-accent transition-all duration-300 mt-4"
              >
                HIRE ME
              </a>
            </div>

            {/* Mobile Footer Info */}
            <div className="flex flex-col gap-2 font-display text-[10px] text-text-secondary tracking-widest border-t border-white/5 pt-6">
              <span>EMAIL: rishi@example.com</span>
              <span>OSLO, NORWAY / REMOTE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
