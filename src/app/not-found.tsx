"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { RiArrowRightLine, RiSearchLine } from "react-icons/ri";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white flex flex-col overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 flex flex-col items-center justify-center px-6 text-center py-24"
      >
        <motion.span
          variants={item}
          className="text-[10px] uppercase tracking-[0.5em] text-neutral-500 mb-8 block"
        >
          Page Not Found
        </motion.span>

        {/* Giant serif mark — gentle float + settle-in scale */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
            y: {
              delay: 0.9,
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="font-serif text-[26vw] sm:text-[16vw] leading-[0.8] tracking-tight select-none"
        >
          404
        </motion.h1>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 64, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-black/20 dark:bg-white/20 my-8"
        />

        <motion.h2
          variants={item}
          className="text-2xl sm:text-3xl font-serif tracking-tight uppercase mb-4"
        >
          This path leads nowhere
        </motion.h2>
        <motion.p
          variants={item}
          className="text-sm font-serif italic text-neutral-500 dark:text-neutral-400 max-w-sm leading-relaxed mb-12"
        >
          The page you&apos;re looking for has been moved, renamed, or never
          existed. Let us guide you back to the collection.
        </motion.p>

        {/* Actions */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center gap-6 mb-14"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/"
              className="group inline-flex items-center gap-2 border border-black dark:border-white px-8 py-3.5 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
            >
              Return Home
              <RiArrowRightLine className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <Link
            href="/shop"
            className="relative inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-medium text-neutral-500 hover:text-black dark:hover:text-white transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-black dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Browse Shop
          </Link>
        </motion.div>

        {/* Search */}
        <motion.form
          variants={item}
          action="/search"
          className="relative w-full max-w-xs border-b border-black/25 dark:border-white/25 focus-within:border-black dark:focus-within:border-white transition-colors"
        >
          <input
            type="text"
            name="q"
            placeholder="Search the collection"
            className="w-full bg-transparent pb-2.5 text-sm font-serif italic tracking-wide placeholder:text-neutral-400 focus:outline-none pr-8"
          />
          <button
            type="submit"
            aria-label="Search"
            className="absolute right-0 bottom-2 text-black dark:text-white hover:opacity-60 transition-opacity"
          >
            <RiSearchLine className="w-4 h-4" />
          </button>
        </motion.form>
      </motion.div>

      {/* Footer strip — slow infinite marquee, consistent with the site's giant brand banner */}
      <div className="w-full border-t border-black/15 dark:border-white/15 select-none py-2 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((i) => (
            <p
              key={i}
              className="text-[13vw] sm:text-[8vw] font-black tracking-tighter leading-[0.85] uppercase opacity-[0.06] pr-8"
            >
              AL&#8209;FAHIM &nbsp; AL&#8209;FAHIM &nbsp; AL&#8209;FAHIM
            </p>
          ))}
        </motion.div>
      </div>
    </main>
  );
}