"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ShowreelModal from "../components/ShowreelModal";
import FeaturedProjects from "../components/FeaturedProjects";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import Services from "../components/Services";
import Workflow from "../components/Workflow";
import SoftwareStack from "../components/SoftwareStack";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showreelOpen, setShowreelOpen] = useState(false);

  return (
    <>
      {/* Cinematic Custom Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Main Website content */}
      {!isLoading && (
        <div className="relative min-h-screen bg-bg-matte">
          {/* Film Grain overlay */}
          <div className="film-grain" />

          {/* Navigation Bar */}
          <Navbar />

          <main>
            {/* Hero Banner Section */}
            <Hero onWatchShowreel={() => setShowreelOpen(true)} />

            {/* Featured Projects Grid Showcase */}
            <FeaturedProjects />

            {/* Interactive Color Grading Before & After Slider */}
            <BeforeAfterSlider />

            {/* Services Cards Grid */}
            <Services />

            {/* Vertical Scroll-Triggered Editing Workflow */}
            <Workflow />

            {/* Software Stack badging */}
            <SoftwareStack />

            {/* Client Testimonials Carousel */}
            <Testimonials />


            {/* FAQ Accordion Menu */}
            <FAQ />

            {/* Project Intake form with validations */}
            <Contact />
          </main>

          {/* Cinematic Footer Section */}
          <Footer />

          {/* Fullscreen Immersive Showreel video modal */}
          <ShowreelModal 
            isOpen={showreelOpen} 
            onClose={() => setShowreelOpen(false)} 
            videoUrl="/videos/shiva_edit.mp4" 
          />
        </div>
      )}
    </>
  );
}
