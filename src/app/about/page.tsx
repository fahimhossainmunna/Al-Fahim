"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProductButton } from "@/components/ui/ProductButton";
import { useAboutAnimations } from "@/hooks/use-about-animations";

function AnimatedHeading({ text, className }: { text: string; className?: string }) {
  const { wordReveal, wordItem } = useAboutAnimations();

  return (
    <motion.h1
      variants={wordReveal}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap mr-[0.25em]">
          <motion.span variants={wordItem} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

export default function AboutPage() {
  const { slideFromLeft, slideFromRight, defaultViewport } = useAboutAnimations();

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#0A0A0A] text-neutral-900 dark:text-neutral-100 pt-28 pb-24 transition-colors duration-500 overflow-hidden">

      {/* Subtle Luxury Dot Grid Background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,_#000_1px,_transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,_#fff_1px,_transparent_0)] [background-size:24px_24px]" />

      {/* Ambient Gold Glow */}
      <motion.div
        animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] rounded-full bg-[#C9A961]/20 blur-[120px]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-36">

        {/* ----------------- 1. HERO SECTION ----------------- */}
        <section className="text-center max-w-3xl mx-auto pt-6">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-px bg-[#C9A961] mb-5"
            />
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-[#C9A961] font-semibold block mb-3">
              The Heritage of Excellence
            </span>
          </motion.div>

          <div className="space-y-1 mb-6">
            <AnimatedHeading
              text="Crafting Timeless"
              className="text-3xl sm:text-5xl md:text-6xl uppercase tracking-wider text-black dark:text-white font-light leading-tight"
            />
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-5xl md:text-6xl uppercase tracking-wider font-light text-black dark:text-white"
            >
              Luxury Apparel
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed tracking-wide max-w-2xl mx-auto"
          >
            At <strong className="font-semibold text-black dark:text-white">AL-FAHIM</strong>, fashion is more than garments—it is an expression of identity, precision engineering, and modern luxury tailored for the discerning individual.
          </motion.p>
        </section>

        {/* ----------------- 2. SECTION: THE ART OF DESIGN ----------------- */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="lg:col-span-6 space-y-4"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A961] font-semibold block">
              Step 01 — Ideation & Sketching
            </span>
            <h2 className="text-2xl md:text-3xl uppercase tracking-wide text-black dark:text-white font-light leading-snug">
              Every Stitch Starts <br />
              With a Sketch
            </h2>
            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              Before fabric meets needle, our master designers sketch every silhouette by hand. We conceptualize structures that balance minimalist aesthetics with contemporary elegance, ensuring each piece carries a distinct personality.
            </p>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={defaultViewport}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-px bg-[#C9A961] pt-1"
            />
          </motion.div>

          <motion.div
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="lg:col-span-6 relative aspect-[4/3] rounded-sm overflow-hidden border border-black/10 dark:border-white/10 shadow-lg bg-neutral-100 dark:bg-neutral-900 group"
          >
            <video
              src="/video/about/designDrowAbout.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 dark:bg-black/20 pointer-events-none" />
            <div className="absolute inset-3 border border-white/0 group-hover:border-[#C9A961]/40 transition-colors duration-700 pointer-events-none" />
          </motion.div>
        </section>

        {/* ----------------- 3. SECTION: FABRIC & CHOICE ----------------- */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="lg:col-span-6 lg:order-2 space-y-4"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A961] font-semibold block">
              Step 02 — Uncompromising Quality
            </span>
            <h2 className="text-2xl md:text-3xl uppercase tracking-wide text-black dark:text-white font-light leading-snug">
              Selecting the Finest <br />
              Textiles & Cuts
            </h2>
            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              Luxury begins with raw material. We meticulously source premium, breathable fabrics with tactile elegance. From silk-blend finishes to high-density organic cottons, every fabric is hand-selected to guarantee comfort and durability.
            </p>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={defaultViewport}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-px bg-[#C9A961] pt-1"
            />
          </motion.div>

          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="lg:col-span-6 lg:order-1 relative aspect-[4/3] rounded-sm overflow-hidden border border-black/10 dark:border-white/10 shadow-lg bg-neutral-100 dark:bg-neutral-900 group"
          >
            <video
              src="/video/about/dressChoiceAbout.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 dark:bg-black/20 pointer-events-none" />
            <div className="absolute inset-3 border border-white/0 group-hover:border-[#C9A961]/40 transition-colors duration-700 pointer-events-none" />
          </motion.div>
        </section>

        {/* ----------------- 4. DUAL VIDEO SHOWCASE ----------------- */}
        <section className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-xl mx-auto space-y-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A961] font-semibold block">
              The Collection Essentials
            </span>
            <h2 className="text-3xl md:text-4xl uppercase tracking-wide text-black dark:text-white font-light">
              Precision in Every Fit
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light tracking-wide">
              Whether structured formality or casual refinement, our tailoring reflects pure sophistication.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

            {/* Card 1 */}
            <motion.div
              variants={slideFromLeft}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              className="group space-y-4"
            >
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900 shadow-md">
                <video
                  src="/video/about/shirtAbout.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-3 border border-white/0 group-hover:border-[#C9A961]/40 transition-colors duration-700 pointer-events-none" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#C9A961] font-medium block">
                  Tailored Excellence
                </span>
                <h3 className="text-base uppercase tracking-wider text-black dark:text-white font-normal">
                  Formal & Business Apparel
                </h3>
                <p className="text-xs text-neutral-500 font-light leading-relaxed">
                  Crisp collars, seamless button placements, and sharp silhouettes designed for high-impact presence.
                </p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              variants={slideFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              className="group space-y-4"
            >
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900 shadow-md">
                <video
                  src="/video/about/tshirtAboutOne.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-3 border border-white/0 group-hover:border-[#C9A961]/40 transition-colors duration-700 pointer-events-none" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#C9A961] font-medium block">
                  Minimalist Comfort
                </span>
                <h3 className="text-base uppercase tracking-wider text-black dark:text-white font-normal">
                  Luxury Everyday Essentials
                </h3>
                <p className="text-xs text-neutral-500 font-light leading-relaxed">
                  Engineered luxury t-shirts crafted from heavyweight fabrics for structured drape and longevity.
                </p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ----------------- 5. BRAND STATS ----------------- */}
        <section className="relative border-y border-black/10 dark:border-white/10 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "100%", label: "Premium Cotton" },
            { value: "Hand-Cut", label: "Master Craftsmanship" },
            { value: "Bespoke", label: "Attention to Detail" },
            { value: "Global", label: "Standard Quality" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={i % 2 === 0 ? slideFromLeft : slideFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              className="relative"
            >
              <span className="text-2xl md:text-3xl text-[#C9A961] block mb-1 font-light">
                {stat.value}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </section>

        {/* ----------------- 6. CTA BANNER ----------------- */}
        <section className="relative text-center space-y-5 pb-6">
          <motion.h2
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="text-2xl md:text-4xl uppercase tracking-wider text-black dark:text-white font-light"
          >
            Experience the Legacy
          </motion.h2>
          <motion.p
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="text-xs md:text-sm text-neutral-500 max-w-md mx-auto font-light"
          >
            Explore our curated catalog and elevate your personal wardrobe today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            className="pt-2"
          >
            <Link href="/shop">
              <ProductButton
                hoverText="DISCOVER SHOP"
                className="px-10 py-4 text-[11px] font-bold uppercase tracking-[0.25em]"
              >
                Explore Collection
              </ProductButton>
            </Link>
          </motion.div>
        </section>

      </div>
    </div>
  );
}