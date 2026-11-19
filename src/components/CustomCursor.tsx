"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "hover" | "play" | "watch" | "connect" | "click">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Mouse Coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer ring
  const ringX = useSpring(mouseX, { damping: 30, stiffness: 200, mass: 0.6 });
  const ringY = useSpring(mouseY, { damping: 30, stiffness: 200, mass: 0.6 });

  // Direct springs for inner dot
  const dotX = useSpring(mouseX, { damping: 15, stiffness: 400, mass: 0.1 });
  const dotY = useSpring(mouseY, { damping: 15, stiffness: 400, mass: 0.1 });

  useEffect(() => {
    // Check if device is touch-enabled
    const checkDevice = () => {
      const mobile = 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
      setIsMobile(mobile);
      if (!mobile) {
        document.documentElement.classList.add("custom-cursor-active");
      }
    };

    checkDevice();

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Event Delegation for hover behaviors
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const hoverTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (hoverTarget) {
        const type = hoverTarget.getAttribute("data-cursor") as any;
        if (type) {
          setCursorType(type);
          return;
        }
      }

      // Check if it's a link or button
      const standardHover = target.closest("a, button, select, input[type='submit'], [role='button']");
      if (standardHover) {
        setCursorType("hover");
      } else {
        setCursorType("default");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [mouseX, mouseY, isVisible]);

  if (isMobile || !isVisible) return null;

  // Custom styling based on active type
  const isLabeled = ["play", "watch", "connect", "click"].includes(cursorType);

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isLabeled ? 80 : cursorType === "hover" ? 45 : 30,
          height: isLabeled ? 80 : cursorType === "hover" ? 45 : 30,
          backgroundColor: isLabeled ? "rgba(0, 102, 255, 0.15)" : "transparent",
          borderColor: isLabeled ? "#00d2ff" : cursorType === "hover" ? "#0066ff" : "rgba(255, 255, 255, 0.4)",
          borderWidth: isLabeled ? "1px" : "1.5px",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.2 }}
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-9999 flex items-center justify-center font-display text-[10px] font-bold tracking-widest text-white shadow-[0_0_15px_rgba(0,102,255,0.2)]"
      >
        {isLabeled && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            {cursorType.toUpperCase()}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isLabeled ? 0 : cursorType === "hover" ? 1.5 : 1,
          backgroundColor: cursorType === "hover" ? "#00d2ff" : "#ffffff",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 20 }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-9999 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
      />
    </>
  );
}
