"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useBannerSlider } from "@/hooks/useBannerSlider";
import { Button } from "../ui/Button";

export default function BannerSlider() {
  const {
    slides,
    currentSlide,
    currentIndex,
    loading,
    handleNext,
    handlePrev,
    goToSlide,
  } = useBannerSlider(6000);

  if (loading || !currentSlide) {
    return (
      <div className="w-full h-[85vh] md:h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="relative w-full h-[85vh] md:h-screen overflow-hidden bg-[#0a0a0a] text-white">
      {/* ১. ব্যাকগ্রাউন্ড ইমেজ (object-contain) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <Image
              src={currentSlide.image}
              alt={currentSlide.title}
              fill
              priority
              quality={100}
              className="object-contain object-center md:object-right"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* ২. মেইন কন্টেন্ট লেআউট */}
      <div className="relative z-20 w-full h-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col justify-between py-12 md:py-20 pointer-events-none">
        {/* টপ মেটা বার */}
        <div className="flex items-center justify-between pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 hover:border-white/30 transition-colors duration-300"
          >
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white font-medium group-hover:text-white">
              Al-Fahim Exclusive
            </span>
          </motion.div>

          <div className="font-mono text-xs md:text-sm tracking-widest text-white bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            {currentSlide.number} <span className="text-white/40">/ 0{slides.length}</span>
          </div>
        </div>

        {/* কন্টেন্ট বক্স */}
        <div className="max-w-xl flex flex-col items-start gap-4 md:gap-5 my-auto pointer-events-auto bg-black/60 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl hover:border-white/20 transition-colors duration-300">
          <AnimatePresence mode="wait">
            <div
              key={currentSlide.id}
              className="flex flex-col items-start gap-3"
            >
              {/* ট্যাগলাইন */}
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xs md:text-sm tracking-[0.25em] uppercase text-white/80 font-medium cursor-pointer transition-all duration-300 hover:text-[#C9A961] hover:tracking-[0.3em]"
              >
                {currentSlide.tagline}
              </motion.span>

              {/* প্রধান টাইটেল */}
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal uppercase tracking-wider text-white leading-[1.1] cursor-pointer transition-all duration-300 hover:text-[#C9A961] hover:scale-[1.02] origin-left"
              >
                {currentSlide.title}
              </motion.h1>

              {/* সাব-টাইটেল */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xs md:text-sm text-neutral-300 font-light tracking-wide leading-relaxed cursor-pointer transition-all duration-300 hover:text-white hover:tracking-wide"
              >
                {currentSlide.subtitle}
              </motion.p>

              {/* বাটন */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-3"
              >
                <Link href={currentSlide.link} className="inline-block">
                  <Button
                    hoverText={
                      <span className="flex items-center gap-2 font-bold uppercase tracking-[0.2em] text-xs">
                        {currentSlide.buttonText} →
                      </span>
                    }
                    className="px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-bold bg-white text-black border-0"
                  >
                    <span className="flex items-center gap-2">
                      {currentSlide.buttonText} →
                    </span>
                  </Button>
                </Link>
              </motion.div>
            </div>
          </AnimatePresence>
        </div>

        {/* বটম নেভিগেশন বার */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4 pointer-events-auto">
          {/* স্লাইড ইণ্ডিকেটর */}
          <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className="group flex items-center gap-2 cursor-pointer"
              >
                <span
                  className={`text-[10px] font-mono transition-all duration-300 ${
                    currentIndex === idx
                      ? "text-white font-bold"
                      : "text-white/40 group-hover:text-white/70"
                  }`}
                >
                  0{idx + 1}
                </span>
                <span
                  className={`h-[2px] transition-all duration-300 ${
                    currentIndex === idx
                      ? "w-8 bg-white"
                      : "w-3 bg-white/20 group-hover:bg-white/50"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* নেভিগেশন বাটন */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
              aria-label="Previous Slide"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
              aria-label="Next Slide"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}