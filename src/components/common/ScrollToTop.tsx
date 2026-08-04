"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RiArrowUpLine } from "react-icons/ri";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (totalHeight > 0) {
        const progress = (currentScroll / totalHeight) * 100;
        setScrollProgress(progress);
      }

      if (currentScroll > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG Circular progress calculation for larger 60px frame
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="group relative flex items-center justify-center w-[60px] h-[60px] rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-2xl border border-black/10 dark:border-white/10 hover:scale-105 transition-transform duration-300"
      >
        {/* SVG Circular Scroll Indicator */}
        <svg className="absolute w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 60 60">
          {/* Base Background Circle Track */}
          <circle
            cx="30"
            cy="30"
            r={radius}
            className="stroke-neutral-200 dark:stroke-neutral-800 fill-none"
            strokeWidth="2"
          />
          {/* Active Progress Circle */}
          <circle
            cx="30"
            cy="30"
            r={radius}
            className="stroke-black dark:stroke-white fill-none transition-all duration-150 ease-out"
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Logo & Hover Arrow Effect */}
        <div className="relative w-7 h-7 flex items-center justify-center overflow-hidden">
          {/* Public folder logo */}
          <Image
            src="/logo/fahimOne.png"
            alt="AL-FAHIM"
            width={28}
            height={28}
            className="object-contain transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-5"
          />
          {/* Hover Arrow */}
          <RiArrowUpLine className="absolute text-lg text-black dark:text-white opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
        </div>
      </button>
    </div>
  );
}