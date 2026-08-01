"use client";

import { useEffect, useState, use } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMousePosition } from "@/hooks/useMousePosition";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ShoppingBag } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  price?: number;
  isNew: boolean;
}

interface CategoryResponse {
  cover: string;
  subtitle: string;
  title: string;
  products: Product[];
}

export default function CategoryDynamicPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = use(params);
  const categoryName = resolvedParams.category;

  const [data, setData] = useState<CategoryResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const response = await fetch(`/api/category/${categoryName}`);
        if (!response.ok) throw new Error("Category not found");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategoryData();
  }, [categoryName]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] flex items-center justify-center">
        <span className="text-[11px] tracking-[0.4em] uppercase text-neutral-400 font-light animate-pulse">
          Loading {categoryName} Collection...
        </span>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-white dark:bg-[#0A0A0A] flex items-center justify-center">
        <h2 className="text-sm uppercase tracking-[0.3em] text-neutral-500 font-light">
          Category Not Available
        </h2>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#080808] text-neutral-900 dark:text-neutral-100 transition-colors duration-500 font-sans selection:bg-[#C9A961] selection:text-black">
      {/* হিরো সেকশন */}
      <section className="relative w-full h-[65vh] md:h-[80vh] overflow-hidden">
        <Image
          src={data.cover}
          alt={data.title}
          fill
          priority
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/30 to-black/20" />

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-6 text-center z-10">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11px] tracking-[0.5em] text-[#C9A961] uppercase font-medium mb-3"
          >
            {data.subtitle}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-[0.2em] text-white font-light"
          >
            {data.title}
          </motion.h1>
        </div>
      </section>

      {/* কালেকশন গ্রিড সেকশন */}
      <section className="max-w-7xl mx-auto pt-20 pb-24 px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-neutral-200 dark:border-neutral-800/80 pb-6 mb-16 gap-4">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A961] mb-2 font-semibold flex items-center gap-2">
              <ShoppingBag size={12} />
              Exclusive Collections
            </p>
            <h2 className="text-2xl md:text-3xl font-serif tracking-widest uppercase">
              Curated Catalog
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 font-light">
              {data.products.length} Collections Available
            </span>
          </div>
        </div>

        {/* প্রোডাক্ট গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {data.products.map((product, index) => (
            <CollectionCard
              key={product.id}
              product={product}
              categoryName={categoryName}
              index={index}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function CollectionCard({
  product,
  categoryName,
  index,
}: {
  product: Product;
  categoryName: string;
  index: number;
}) {
  const {
    elementRef,
    isHovered,
    setIsHovered,
    handleMouseMove,
    cursorX,
    cursorY,
  } = useMousePosition();

  // ডায়নামিক স্লগ জেনারেশন (যেমন: Formal -> formal, Panjabi -> panjabi, Casual -> casual)
  const subcategorySlug = product.category
    ? product.category.toLowerCase().trim().replace(/\s+/g, "-")
    : product.id.toString();

  const targetPath = `/category/${categoryName}/${subcategorySlug}`;

  return (
    <motion.div
      ref={elementRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group/card relative cursor-none"
    >
      <div className="relative w-full h-[480px] sm:h-[520px] overflow-hidden bg-neutral-100 dark:bg-[#111111] border border-neutral-200/50 dark:border-neutral-800/50">
        {product.isNew && (
          <span className="absolute top-5 left-5 z-20 text-[8px] tracking-[0.3em] uppercase bg-[#C9A961] text-white px-3 py-1.5 font-bold backdrop-blur-md pointer-events-none">
            New Collection
          </span>
        )}

        <div className="absolute top-5 right-5 z-20">
          <span className="text-[9px] tracking-[0.2em] uppercase bg-white/90 dark:bg-black/90 text-black dark:text-white px-3 py-1.5 backdrop-blur-md border border-neutral-300 dark:border-neutral-700">
            Collection 0{index + 1}
          </span>
        </div>

        <Link href={targetPath}>
          <motion.div
            className="relative w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={product.image}
              alt={`${product.category} - ${product.name}`}
              fill
              className="object-cover object-top filter brightness-[0.96] hover:brightness-100 transition-all duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
          </motion.div>
        </Link>

        {/* Cursor Follower */}
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
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="pointer-events-none absolute left-0 top-0 z-30 hidden md:flex items-center justify-center w-20 h-20 rounded-full border border-white/20 bg-black/60 backdrop-blur-md shadow-2xl p-3"
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
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] tracking-[0.35em] uppercase text-[#C9A961] font-semibold">
            {product.category}
          </span>
          <div className="h-px flex-1 mx-4 bg-gradient-to-r from-neutral-300 dark:from-neutral-700 to-transparent" />
        </div>

        <div className="flex items-start justify-between gap-4">
          <Link href={targetPath}>
            <h3 className="font-serif text-xl uppercase tracking-wide text-neutral-900 dark:text-neutral-100 group-hover/card:text-[#C9A961] transition-colors duration-300 leading-tight">
              {product.name}
            </h3>
          </Link>

          <Link href={targetPath}>
            <Button hoverText="View">Explore</Button>
          </Link>
        </div>

        <div className="mt-3 flex items-center gap-2 text-[10px] text-neutral-500 dark:text-neutral-400 tracking-wide">
          <span>View Collection</span>
          <ArrowRight
            size={10}
            className="transform group-hover/card:translate-x-1 transition-transform"
          />
        </div>
      </div>
    </motion.div>
  );
}