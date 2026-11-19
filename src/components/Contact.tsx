"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, RotateCcw } from "lucide-react";

// Form validation schema using Zod
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  company: z.string().optional(),
  email: z.string().email("Please provide a valid email address."),
  phone: z.string().optional(),
  projectType: z.enum(["commercial", "documentary", "music-video", "social-content", "other"]),
  budget: z.enum(["under-2k", "2k-5k", "5k-10k", "10k-plus"]),
  timeline: z.enum(["immediately", "1-2-months", "3-plus-months"]),
  message: z.string().min(10, "Message must be at least 10 characters.")
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      projectType: "commercial",
      budget: "2k-5k",
      timeline: "1-2-months"
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate API request (1.5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    console.log("Contact form submitted successfully:", data);
  };

  const handleReset = () => {
    reset();
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 md:py-36 bg-bg-charcoal relative z-10 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col gap-2 mb-16 text-center">
          <span className="text-xs font-display tracking-[0.4em] text-accent uppercase font-bold">
            LET'S COLLABORATE
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tighter text-white">
            START A PROJECT
          </h2>
          <p className="text-text-secondary text-sm font-display tracking-wide mt-2">
            Tell me about your film, timeline, and budget. Let's create something memorable.
          </p>
        </div>

        {/* Contact Form Wrapper */}
        <div className="glass-panel p-8 sm:p-12 border border-white/5 relative">
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-8"
              >
                {/* Row 1: Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-display text-[10px] tracking-widest text-text-secondary uppercase font-bold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...register("name")}
                      placeholder="John Doe"
                      className={`w-full bg-bg-matte border ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-accent'} p-4 text-sm font-display text-white outline-none transition-colors duration-300`}
                    />
                    {errors.name && (
                      <span className="text-[10px] font-display text-red-400 tracking-wide mt-1">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-display text-[10px] tracking-widest text-text-secondary uppercase font-bold">
                      Company / Studio
                    </label>
                    <input
                      type="text"
                      {...register("company")}
                      placeholder="Red Bull Media"
                      className="w-full bg-bg-matte border border-white/10 focus:border-accent p-4 text-sm font-display text-white outline-none transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Row 2: Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-display text-[10px] tracking-widest text-text-secondary uppercase font-bold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="john@example.com"
                      className={`w-full bg-bg-matte border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-accent'} p-4 text-sm font-display text-white outline-none transition-colors duration-300`}
                    />
                    {errors.email && (
                      <span className="text-[10px] font-display text-red-400 tracking-wide mt-1">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-display text-[10px] tracking-widest text-text-secondary uppercase font-bold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...register("phone")}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-bg-matte border border-white/10 focus:border-accent p-4 text-sm font-display text-white outline-none transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Row 3: Project Type, Budget & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-display text-[10px] tracking-widest text-text-secondary uppercase font-bold">
                      Project Type
                    </label>
                    <select
                      {...register("projectType")}
                      className="w-full bg-bg-matte border border-white/10 focus:border-accent p-4 text-sm font-display text-white outline-none transition-colors duration-300 appearance-none"
                    >
                      <option value="commercial">Commercial / Ad</option>
                      <option value="documentary">Short Documentary</option>
                      <option value="music-video">Music Video</option>
                      <option value="social-content">Social Content</option>
                      <option value="other">Other / Custom</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-display text-[10px] tracking-widest text-text-secondary uppercase font-bold">
                      Project Budget
                    </label>
                    <select
                      {...register("budget")}
                      className="w-full bg-bg-matte border border-white/10 focus:border-accent p-4 text-sm font-display text-white outline-none transition-colors duration-300 appearance-none"
                    >
                      <option value="under-2k">Under $2,000</option>
                      <option value="2k-5k">$2,000 - $5,000</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-plus">$10,000+</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-display text-[10px] tracking-widest text-text-secondary uppercase font-bold">
                      Timeline
                    </label>
                    <select
                      {...register("timeline")}
                      className="w-full bg-bg-matte border border-white/10 focus:border-accent p-4 text-sm font-display text-white outline-none transition-colors duration-300 appearance-none"
                    >
                      <option value="immediately">Immediately</option>
                      <option value="1-2-months">1 - 2 Months</option>
                      <option value="3-plus-months">3+ Months</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="font-display text-[10px] tracking-widest text-text-secondary uppercase font-bold">
                    Project details *
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Describe your project, editing style, references, and deliverables..."
                    className={`w-full bg-bg-matte border ${errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-accent'} p-4 text-sm font-display text-white outline-none transition-colors duration-300 resize-none`}
                  />
                  {errors.message && (
                    <span className="text-[10px] font-display text-red-400 tracking-wide mt-1">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white text-bg-matte hover:bg-accent hover:text-white transition-all duration-300 font-display text-sm font-bold tracking-widest flex items-center justify-center gap-3 relative overflow-hidden disabled:opacity-50"
                  data-cursor="click"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      SUBMITTING PROPOSAL...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      SEND PROPOSAL
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              // Success Screen Animation
              <motion.div
                key="success-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="text-accent mb-6"
                >
                  <CheckCircle2 size={64} className="shadow-[0_0_20px_rgba(0,102,255,0.4)] rounded-full" />
                </motion.div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase mb-3">
                  PROPOSAL DELIVERED
                </h3>
                <p className="text-text-secondary text-sm sm:text-base font-display max-w-md tracking-wide leading-relaxed mb-8">
                  Your project details have been safely queued. I will review the scope and reach back to you within 24 hours.
                </p>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white text-text-secondary hover:text-white font-display text-xs font-bold tracking-widest transition-colors duration-300"
                >
                  <RotateCcw size={12} />
                  SEND ANOTHER MESSAGE
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>

      </div>
    </section>
  );
}
