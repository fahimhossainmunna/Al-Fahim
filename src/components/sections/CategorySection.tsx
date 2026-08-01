"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMousePosition } from "@/hooks/useMousePosition";

interface Category {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  position: "left" | "center" | "right";
}

export default function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[40vh]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100px" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-px bg-[#C9A961] mb-6"
        />
        <span className="text-[10px] tracking-[0.4em] uppercase text-gray-400 animate-pulse">
          Loading Collections...
        </span>
      </section>
    );
  }

  // পজিশন অনুযায়ী ফিল্টার
  const womenCat = categories.find((c) => c.id === "women");
  const menCat = categories.find((c) => c.id === "men");
  const kidsCat = categories.find((c) => c.id === "kids");

  return (
    <section className="relative py-17 md:py-25 px-6 max-w-7xl mx-auto bg-white dark:bg-[#0A0A0A] transition-colors duration-500 overflow-hidden">

      {/* সূক্ষ্ম ব্যাকগ্রাউন্ড টেক্সচার */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,_#000_1px,_transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,_#fff_1px,_transparent_0)] [background-size:24px_24px]" />

      {/* হেডার */}
      <div className="relative flex flex-col items-center text-center mb-20 md:mb-24">
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: 48 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-px bg-gradient-to-b from-transparent via-[#C9A961] to-transparent mb-7"
        />
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[10px] md:text-[11px] tracking-[0.5em] font-medium uppercase text-[#C9A961] mb-4"
        >
          Curated Lines
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl md:text-5xl uppercase tracking-[0.15em] text-black dark:text-white"
        >
          Explore Categories
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 56 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-[#C9A961] mt-7"
        />
      </div>

      {/* ৩টি কার্ডের গ্রিড - মাঝের Men Card সেন্টার্ড ও লম্বা */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-center">

        {/* ১. বামে: Women Fashion (খাটো কার্ড) */}
        {womenCat && (
          <CategoryCard
            category={womenCat}
            heightClass="h-[450px] md:h-[520px]"
            delay={0.1}
          />
        )}

        {/* ২. মাঝে: Men Fashion (লম্বা হাইট কার্ড) */}
        {menCat && (
          <CategoryCard
            category={menCat}
            heightClass="h-[550px] md:h-[680px]"
            delay={0.25}
            featured
          />
        )}

        {/* ৩. ডানে: Kids Fashion (খাটো কার্ড) */}
        {kidsCat && (
          <CategoryCard
            category={kidsCat}
            heightClass="h-[450px] md:h-[520px]"
            delay={0.4}
          />
        )}

      </div>
    </section>
  );
}

// সিঙ্গেল ক্যাটাগরি কার্ড
function CategoryCard({
  category,
  heightClass,
  delay = 0,
  featured = false,
}: {
  category: Category;
  heightClass: string;
  delay?: number;
  featured?: boolean;
}) {
  const { elementRef, isHovered, setIsHovered, handleMouseMove, cursorX, cursorY } = useMousePosition();

  return (
    <motion.div
      ref={elementRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden cursor-none rounded-sm bg-neutral-100 dark:bg-neutral-900 shadow-sm hover:shadow-2xl transition-shadow duration-700 ease-out ${heightClass} ${
        featured ? "ring-1 ring-[#C9A961]/0 group-hover:ring-[#C9A961]/20" : ""
      }`}
    >
      <Link href={category.link} className="block w-full h-full">
        {/* ব্যাকগ্রাউন্ড ইমেজ জুম অ্যানিমেশন */}
        <motion.div
          className="relative w-full h-full"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
        >
          <Image
            src={category.image}
            alt={category.title}
            fill
            className="object-cover object-center grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </motion.div>

        {/* ওভারলে গ্রেডিয়েন্ট - নিচের টেক্সট স্পষ্ট করার জন্য */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

        {/* সূক্ষ্ম গোল্ড বর্ডার - হোভারে */}
        <div className="absolute inset-3 border border-white/0 group-hover:border-[#C9A961]/30 transition-colors duration-700 pointer-events-none z-10" />

        {/* কর্নার অ্যাকসেন্ট */}
        <div className="absolute top-6 left-6 w-6 h-px bg-white/0 group-hover:bg-[#C9A961] transition-colors duration-500 delay-100 z-10" />
        <div className="absolute top-6 left-6 w-px h-6 bg-white/0 group-hover:bg-[#C9A961] transition-colors duration-500 delay-100 z-10" />

        {/* কার্ডের তথ্য (নিচে পজিশন করা) */}
        <div className="absolute bottom-0 left-0 w-full p-7 md:p-8 z-20 flex flex-col items-start justify-end">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#C9A961] mb-2 font-medium">
            {category.subtitle}
          </span>
          <h3 className="font-serif text-2xl md:text-3xl text-white uppercase tracking-wider mb-4">
            {category.title}
          </h3>

          {/* বাটন লিংক উইথ অ্যারো */}
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/80 group-hover:text-white transition-colors">
            <span className="relative">
              Discover Collection
              <span className="absolute left-0 -bottom-1 w-0 h-px bg-[#C9A961] group-hover:w-full transition-all duration-500 ease-out" />
            </span>
            <span className="transform group-hover:translate-x-2 transition-transform duration-300">
              →
            </span>
          </div>
        </div>

        {/* মাউস ফলোয়িং লোগো কার্সার */}
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
          className="pointer-events-none absolute left-0 top-0 z-30 hidden md:flex items-center justify-center w-20 h-20 rounded-full border border-white/30 bg-black/40 backdrop-blur-md shadow-2xl p-3"
        >
          <div className="block dark:hidden relative w-full h-full">
            <Image
              src="/logo/fahimTwo.png"
              alt="AL-FAHIM"
              fill
              className="object-contain"
            />
          </div>
          <div className="hidden dark:block relative w-full h-full">
            <Image
              src="/logo/fahimTwo.png"
              alt="AL-FAHIM"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}