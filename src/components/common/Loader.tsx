"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = prev < 60 ? 3 : prev < 85 ? 1.5 : 0.5;
        return Math.min(prev + step, 100);
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-[#0A0A0A] transition-colors duration-300 overflow-hidden"
    >
      {/* অ্যাম্বিয়েন্ট গোল্ড গ্লো */}
      <motion.div
        animate={{
          opacity: [0.15, 0.3, 0.15],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute w-[420px] h-[420px] rounded-full bg-[#C9A961]/50 blur-[100px]"
      />

      {/* সূক্ষ্ম ব্যাকগ্রাউন্ড টেক্সচার */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,_#000_1px,_transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,_#fff_1px,_transparent_0)] [background-size:24px_24px]" />

      {/* ভিনিয়েট */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.06)_100%)] dark:bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.4)_100%)]" />

      <div className="relative flex flex-col items-center">
        {/* Brand Logo + ঘূর্ণায়মান রিং */}
        <div className="relative mb-10 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute w-[168px] h-[168px] md:w-[188px] md:h-[188px] rounded-full border border-dashed border-[#C9A961]/70"
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[140px] h-[140px] md:w-[156px] md:h-[156px] rounded-full border border-[#C9A961]/70"
          />
            
          <motion.div
            animate={{ scale: [1, 1.04, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-22 w-46 md:h-24 md:w-54"
          >
            <Image
              src="/logo/fahimOne.png"
              alt="AL-FAHIM Logo"
              fill
              priority
              className="object-contain block dark:hidden"
            />
            <Image
              src="/logo/fahimTwo.png"
              alt="AL-FAHIM Logo"
              fill
              priority
              className="object-contain hidden dark:block"
            />
          </motion.div>
        </div>

        {/* Newton's Cradle Loader */}
        <div className="newtons-cradle">
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
        </div>

        <style jsx>{`
          .newtons-cradle {
            --uib-size: 60px; /* কন্টেইনারের সাইজও ৫০px থেকে বাড়িয়ে ৬০px করা হয়েছে */
            --uib-speed: 1.2s;
            --uib-color: currentColor;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: var(--uib-size);
            height: var(--uib-size);
            @apply text-black dark:text-white;
          }

          .newtons-cradle__dot {
            position: relative;
            display: flex;
            align-items: center;
            height: 100%;
            width: 25%;
            transform-origin: center top;
          }

          /* Dot/Ball গুলোর সাইজ বাড়ানোর জন্য height এখানে ২৫% থেকে বাড়িয়ে ৩৫% করা হয়েছে */
          .newtons-cradle__dot::after {
            content: '';
            display: block;
            width: 100%;
            height: 35%; /* ডট বড় করার জন্য মান বাড়ানো হয়েছে */
            border-radius: 50%;
            background-color: var(--uib-color);
          }

          .newtons-cradle__dot:first-child {
            animation: swing var(--uib-speed) linear infinite;
          }

          .newtons-cradle__dot:last-child {
            animation: swing2 var(--uib-speed) linear infinite;
          }

          @keyframes swing {
            0% {
              transform: rotate(0deg);
              animation-timing-function: ease-out;
            }
            25% {
              transform: rotate(70deg);
              animation-timing-function: ease-in;
            }
            50% {
              transform: rotate(0deg);
              animation-timing-function: linear;
            }
          }

          @keyframes swing2 {
            0% {
              transform: rotate(0deg);
              animation-timing-function: linear;
            }
            50% {
              transform: rotate(0deg);
              animation-timing-function: ease-out;
            }
            75% {
              transform: rotate(-70deg);
              animation-timing-function: ease-in;
            }
          }
        `}</style>
      </div>

      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 64, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="h-px bg-gradient-to-r from-transparent via-[#C9A961] to-transparent"
      />
    </motion.div>
  );
}