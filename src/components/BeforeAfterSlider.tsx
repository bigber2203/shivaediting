"use client";

import { useRef, useEffect, useState } from "react";
import { Play, Pause } from "lucide-react";

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoGradedRef = useRef<HTMLVideoElement>(null);
  const videoRawRef = useRef<HTMLVideoElement>(null);

  // Sync Video Playback
  useEffect(() => {
    const vGraded = videoGradedRef.current;
    const vRaw = videoRawRef.current;
    if (!vGraded || !vRaw) return;

    const syncPlay = () => {
      vRaw.currentTime = vGraded.currentTime;
      vRaw.play().catch(() => {});
    };

    const syncPause = () => {
      vRaw.pause();
    };

    const syncTime = () => {
      if (Math.abs(vGraded.currentTime - vRaw.currentTime) > 0.15) {
        vRaw.currentTime = vGraded.currentTime;
      }
    };

    vGraded.addEventListener("play", syncPlay);
    vGraded.addEventListener("pause", syncPause);
    vGraded.addEventListener("timeupdate", syncTime);

    // Initial play trigger
    vGraded.play().catch(() => setIsPlaying(false));
    vRaw.play().catch(() => {});

    return () => {
      vGraded.removeEventListener("play", syncPlay);
      vGraded.removeEventListener("pause", syncPause);
      vGraded.removeEventListener("timeupdate", syncTime);
    };
  }, []);

  const handlePlayPause = () => {
    const vGraded = videoGradedRef.current;
    const vRaw = videoRawRef.current;
    if (!vGraded || !vRaw) return;

    if (isPlaying) {
      vGraded.pause();
      vRaw.pause();
      setIsPlaying(false);
    } else {
      vGraded.play().catch(() => {});
      vRaw.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Drag handlers
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section className="py-24 bg-bg-charcoal border-y border-white/5 relative z-10 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Title */}
        <div className="flex flex-col gap-2 mb-16 text-center">
          <span className="text-xs font-display tracking-[0.4em] text-accent uppercase font-bold">
            COLOR SCIENCE
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-white">
            BEFORE & AFTER GRADING
          </h2>
          <p className="text-text-secondary text-sm font-display max-w-lg mx-auto tracking-wide mt-2">
            Drag the slider to wipe between the flat 10-bit LOG sensor footage and the final color-graded cinematic print emulation.
          </p>
        </div>

        {/* Video Canvas Container */}
        <div 
          ref={containerRef}
          className="relative w-full aspect-video bg-bg-matte border border-white/10 overflow-hidden cursor-ew-resize shadow-2xl"
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          {/* Base Layer: Graded Video */}
          <video
            ref={videoGradedRef}
            src="/videos/shiva_edit.mp4"
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute top-6 right-6 z-30 bg-black/60 px-3 py-1 border border-white/10 backdrop-blur-md text-[10px] tracking-widest font-display font-bold text-accent uppercase">
            GRADED REC.709
          </div>

          {/* Sliding Layer: Raw Log Video */}
          <div 
            style={{ width: `${sliderPosition}%` }}
            className="absolute inset-y-0 left-0 overflow-hidden z-25 border-r border-accent/80 shadow-[0_0_15px_rgba(0,102,255,0.4)]"
          >
            {/* Same Video with CSS Filter simulating LOG */}
            <video
              ref={videoRawRef}
              src="/videos/shiva_edit.mp4"
              loop
              muted
              playsInline
              style={{ filter: "saturate(0.25) contrast(0.6) brightness(1.2) sepia(0.04)" }}
              className="absolute inset-0 w-[100vw] h-full object-cover max-w-none pointer-events-none"
            />
            {/* Set width of inner video to match parent container's width */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                width: containerRef.current ? containerRef.current.getBoundingClientRect().width : "100%",
                height: "100%"
              }}
            />
            
            <div className="absolute top-6 left-6 z-30 bg-black/60 px-3 py-1 border border-white/10 backdrop-blur-md text-[10px] tracking-widest font-display font-bold text-text-secondary uppercase">
              10-BIT RAW LOG
            </div>
          </div>

          {/* Slider Drag Handle */}
          <div 
            style={{ left: `${sliderPosition}%` }}
            className="absolute inset-y-0 -translate-x-1/2 z-30 flex items-center justify-center pointer-events-none"
          >
            <div className="w-10 h-10 rounded-full bg-accent border-2 border-white flex items-center justify-center text-white shadow-lg pointer-events-none transition-transform duration-200 scale-100 group-hover:scale-110">
              <span className="text-xs font-bold font-mono tracking-tighter select-none">&lt;&gt;</span>
            </div>
          </div>

          {/* Inline Play/Pause Control Overlay */}
          <div className="absolute bottom-6 left-6 z-30">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePlayPause();
              }}
              className="p-3 bg-black/70 border border-white/10 rounded-full text-white hover:bg-white hover:text-bg-matte transition-all duration-300 shadow-md"
              data-cursor="click"
              aria-label={isPlaying ? "Pause Video" : "Play Video"}
            >
              {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
