"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useHeroSlider } from "@/hooks/useHeroSlider";
import { HERO_CONTENT } from "@/data/heroData";

export default function Hero() {
  const { videos, currentVideo, videoKey, mousePos, handleMouseMove, goToVideo } = useHeroSlider(8000);

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* ============ VIDEO BACKGROUND ============ */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.video
            key={videoKey}
            autoPlay
            muted
            loop
            playsInline
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.08 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 8, ease: "linear" },
            }}
            className="h-full w-full object-cover"
          >
            <source src={videos[currentVideo]} type="video/mp4" />
          </motion.video>
        </AnimatePresence>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/75" />
        <div className="absolute inset-0 bg-[#C9A961]/5 mix-blend-overlay" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />

        {/* Spotlight */}
        <div
          className="pointer-events-none absolute inset-0 hidden md:block transition-opacity duration-700"
          style={{
            background: `radial-gradient(500px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(201,169,97,0.10), transparent 60%)`,
          }}
        />
      </div>

      {/* ============ DECORATIVE CORNERS ============ */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="absolute top-24 left-8 sm:top-28 sm:left-12">
          <div className="w-16 h-px bg-white/30" /><div className="w-px h-16 bg-white/30" />
          <div className="absolute top-0 left-0 w-[3px] h-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A961]" />
        </div>
        <div className="absolute top-24 right-8 sm:top-28 sm:right-12">
          <div className="w-16 h-px bg-white/30" /><div className="absolute top-0 right-0 w-px h-16 bg-white/30" />
          <div className="absolute top-0 right-0 w-[3px] h-[3px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A961]" />
        </div>
        <div className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12">
          <div className="w-16 h-px bg-white/30" /><div className="absolute bottom-0 left-0 w-px h-16 bg-white/30" />
          <div className="absolute bottom-0 left-0 w-[3px] h-[3px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[#C9A961]" />
        </div>
        <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12">
          <div className="w-16 h-px bg-white/30" /><div className="absolute bottom-0 right-0 w-px h-16 bg-white/30" />
          <div className="absolute bottom-0 right-0 w-[3px] h-[3px] translate-x-1/2 translate-y-1/2 rounded-full bg-[#C9A961]" />
        </div>
      </div>

      {/* ============ SIDE TEXT ============ */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-4">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 [writing-mode:vertical-rl] rotate-180">{HERO_CONTENT.estText}</p>
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
      </div>

      <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-4">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 [writing-mode:vertical-rl]">{HERO_CONTENT.copyrightText}</p>
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
      </div>

      {/* ============ MAIN CONTENT ============ */}
      <div className="relative z-10 flex h-screen flex-col items-center justify-center px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-[#C9A961]/30 bg-white/[0.03] backdrop-blur-sm px-5 py-2 mt-10"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C9A961]/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#C9A961]" />
            </span>
            <p className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#C9A961] font-medium">{HERO_CONTENT.eyebrow}</p>
          </motion.div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-wide text-white leading-[0.95] mb-6">
            {HERO_CONTENT.titleWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom pb-1">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.55 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                  className={`inline-block ${word === "&" ? "italic font-light text-[#C9A961] mx-4 sm:mx-6" : ""}`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 64, opacity: 1 }}
            transition={{ duration: 1, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-transparent via-[#C9A961] to-transparent mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.15 }}
            className="max-w-xl mx-auto text-sm sm:text-base text-white/70 leading-relaxed mb-12 tracking-wide font-light"
          >
            {HERO_CONTENT.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.3, ease: "easeOut" }}>
              <Link href="/shop"><Button hoverText="Discover">Shop Collection</Button></Link>
            </motion.div>
            <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.3, ease: "easeOut" }}>
              <Link href="/collections"><Button hoverText="View All">Explore Lookbook</Button></Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ============ SCROLL INDICATOR ============ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute md:bottom-12 xl:bottom-17 sm:bottom-18 left-1/2 -translate-x-2/3 z-20 flex flex-col items-center gap-3"
      >
        <p className="text-[9px] tracking-[0.3em] uppercase text-white/50">Scroll</p>
        <div className="relative w-1 h-10 overflow-hidden rounded-full bg-white/15">
          <motion.div
            animate={{ y: [0, 28, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-1 h-3 rounded-full bg-[#C9A961]"
          />
        </div>
      </motion.div>

      {/* ============ TICKER ============ */}
      <div className="absolute bottom-8 sm:bottom-12 right-8 sm:right-12 z-20 flex items-end gap-4">
        {videos.map((_, i) => (
          <button key={i} onClick={() => goToVideo(i)} className="group flex flex-col items-center gap-2">
            <span className={`text-[9px] tracking-[0.2em] font-medium transition-colors duration-500 ${i === currentVideo ? "text-[#C9A961]" : "text-white/35 group-hover:text-white/60"}`}>
              0{i + 1}
            </span>
            <div className="relative h-px w-8 bg-white/15 overflow-hidden">
              {i === currentVideo && (
                <motion.div
                  key={videoKey}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 8, ease: "linear" }}
                  className="absolute inset-y-0 left-0 bg-[#C9A961]"
                />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}