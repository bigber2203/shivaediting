"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-white/5 py-6">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left gap-4"
        aria-expanded={isOpen}
      >
        <span className="font-display font-bold text-lg sm:text-xl text-white tracking-tight uppercase hover:text-accent transition-colors duration-300">
          {question}
        </span>
        <span className="text-text-secondary">
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-text-secondary text-sm sm:text-base font-display tracking-wide leading-relaxed pt-4 max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What software do you use for post-production?",
      answer: "I work primarily within DaVinci Resolve Studio for editorial cuts, color grading, and mastering. For advanced motion tracking, VFX, and heavy kinetic text layouts, I integrate Adobe After Effects and Blender. Audio restoration and foley mixes are polished in Adobe Audition."
    },
    {
      question: "What is your typical project turnaround time?",
      answer: "Turnaround times vary based on scope. Commercial edits (30-60s) are typically delivered within 5-10 business days. Short-form documentaries and showreels take between 2-4 weeks. I establish clear timelines and checkpoint edits during our initial consultation."
    },
    {
      question: "Do you offer sound design and color grading as standalone services?",
      answer: "Absolutely. While I prefer handling the entire post-production pipeline to maintain stylistic unity, I regularly collaborate with production houses and agencies solely as a colorist or sound designer."
    },
    {
      question: "How do we handle large file transfers and footage delivery?",
      answer: "For file sharing, I utilize high-speed cloud portals like Frame.io, Dropbox Business, or MASV. Clients upload raw cards directly, and we use Frame.io for timestamped frame-accurate review notes and revisions."
    },
    {
      question: "Can you work with mixed formats and 8K RAW footage?",
      answer: "Yes. I am equipped to handle REDCODE RAW, ARRI RAW, Sony X-OCN, and ProRes files. I build optimized proxy workflows to ensure seamless performance, editing speed, and high-efficiency timelines regardless of mixed camera sources."
    },
    {
      question: "What is your pricing and booking structure?",
      answer: "Projects are billed either on a project flat rate or a day rate, depending on the predictability of the scope. A 50% deposit secures the timeline slot, with the remaining balance due upon delivery of final unwatermarked assets."
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 md:py-36 bg-bg-matte relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col gap-2 mb-16 text-center">
          <span className="text-xs font-display tracking-[0.4em] text-accent uppercase font-bold">
            COMMON INQUIRIES
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tighter text-white">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </div>

        {/* FAQ Accordion Stack */}
        <div className="flex flex-col border-t border-white/5">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
