"use client";

import { useMousePosition } from "@/hooks/useMousePosition";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface FashionItem {
  id: number;
  image: string;
  gridClass: string;
}

export default function FashionGrid() {
  const [items, setItems] = useState<FashionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFashionItems() {
      try {
        const response = await fetch("/api/fashion");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching fashion grid data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFashionItems();
  }, []);

  if (loading) {
    return (
      <section className="py-32 px-6 max-w-7xl mx-auto text-center">
        <span className="text-xs tracking-[0.3em] uppercase text-gray-400 animate-pulse">
          Loading Editorial Collection...
        </span>
      </section>
    );
  }

  return (
    <section className="relative py-18 md:py-10 px-6 max-w-7xl mx-auto bg-[#FCFCFC] dark:bg-[#0A0A0A] transition-colors duration-500 overflow-hidden">
      {/* সূক্ষ্ম ব্যাকগ্রাউন্ড টেক্সচার - প্রিমিয়াম ডেপথ দেওয়ার জন্য */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-size-[24px_24px]" />

      {/* ============ সেকশন হেডার (Premium Magazine Style) ============ */}
      <div className="relative flex flex-col items-center text-center mb-20 md:mb-28">
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: 56 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-px bg-gradient-to-b from-transparent via-[#C9A961] to-transparent mb-8"
        />
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[10px] md:text-[11px] tracking-[0.5em] font-medium uppercase text-[#C9A961] mb-5"
        >
          Fall / Winter Selection
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl text-black dark:text-white tracking-wide"
        >
          The Signature Line
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 max-w-xl text-sm md:text-base text-gray-500 dark:text-gray-400 font-light tracking-wide"
        >
          Crafted silhouettes, considered detail — a curated edit for the modern
          wardrobe.
        </motion.p>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-[#C9A961] mt-8"
        />
      </div>

      {/* ============ ডাইনামিক ম্যাসনরি গ্রিড ============ */}
      {items.length > 0 && (
        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 md:gap-y-16 items-start">
          {/* Left Column (1 item) */}
          <div className="md:col-span-1 md:mt-12">
            <GridCard item={items[0]} delay={0.1} />
          </div>

          {/* Center Column (4 items in 2x2) */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10 md:gap-y-16">
            <GridCard item={items[1]} delay={0.2} />
            <GridCard item={items[2]} delay={0.3} />
            <GridCard item={items[3]} delay={0.4} />
            <GridCard item={items[4]} delay={0.5} />
          </div>

          {/* Right Column (1 item) */}
          <div className="md:col-span-1 md:mt-24">
            <GridCard item={items[5]} delay={0.6} />
          </div>
        </div>
      )}
    </section>
  );
}

function GridCard({ item, delay = 0 }: { item: FashionItem; delay?: number }) {
  const {
    elementRef,
    isHovered,
    setIsHovered,
    handleMouseMove,
    cursorX,
    cursorY,
  } = useMousePosition();

  return (
    <motion.div
      ref={elementRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={`group relative overflow-hidden cursor-none bg-neutral-100 dark:bg-neutral-900 ${item.gridClass}`}
    >
      <motion.div
        className="relative w-full h-full"
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
      >
        <Image
          src={item.image}
          alt="AL-FAHIM Fashion Editorial"
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 25vw"
          priority={item.id === 1 || item.id === 6}
        />
      </motion.div>

      <div className="absolute inset-4 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="pointer-events-none absolute left-0 top-0 z-30 hidden md:flex items-center justify-center w-24 h-24  overflow-hidden p-4"
      >
        <div className="block dark:hidden relative w-full h-full">
          <Image
            src="/logo/fahimTwo.png"
            alt="AL-FAHIM Logo Light"
            fill
            className="object-contain"
          />
        </div>

        <div className="hidden dark:block relative w-full h-full">
          <Image
            src="/logo/fahimTwo.png"
            alt="AL-FAHIM Logo Dark"
            fill
            className="object-contain"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
