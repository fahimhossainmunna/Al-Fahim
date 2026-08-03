"use client";

import { useProductSlider } from "@/hooks/useProductSlider";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";
import { ProductButton } from "../ui/ProductButton";

export default function FeaturedProducts() {
  const { products, currentIndex, loading, handleNext, handlePrev } =
    useProductSlider(10000);

  if (loading) {
    return (
      <section className="w-full py-24 bg-white dark:bg-[#0A0A0A] flex justify-center items-center">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-px bg-[#C9A961]"
        />
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="relative w-full py-16 md:py-24 bg-white dark:bg-[#0A0A0A] text-neutral-900 dark:text-neutral-100 overflow-hidden border-t border-black/5 dark:border-white/5 transition-colors duration-500">
      {/* সূক্ষ্ম ব্যাকগ্রাউন্ড টেক্সচার */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,_#000_1px,_transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,_#fff_1px,_transparent_0)] [background-size:24px_24px]" />

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12">
        {/* সেকশন হেডার ও নেভিগেশন বাটন */}
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A961]" />
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-neutral-500 font-medium">
                New Arrivals &apos;26
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-normal uppercase tracking-wider text-black dark:text-white">
              Featured Products
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 56 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-px bg-[#C9A961] mt-5"
            />
          </div>

          {/* নেভিগেশন অ্যারো */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-black/10 dark:border-white/15 bg-transparent flex items-center justify-center text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-black dark:hover:border-white transition-all duration-300 cursor-pointer"
              aria-label="Previous Product"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-black/10 dark:border-white/15 bg-transparent flex items-center justify-center text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-black dark:hover:border-white transition-all duration-300 cursor-pointer"
              aria-label="Next Product"
            >
              →
            </button>
          </div>
        </div>

        {/* ১টি ১টি করে কার্ড স্লাইড হওয়ার কন্টেইনার */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex"
            animate={{
              x: `-${currentIndex * 20}%`,
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {products.map((product, idx) => (
              <div
                key={`${product.category}-${product.id}-${idx}`}
                className="w-1/2 sm:w-1/3 md:w-1/5 flex-shrink-0 px-2 md:px-3"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* View All Products Button */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <Link href="/products">
            <Button
              hoverText={"Explore Catalog →"}
              className="px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-bold bg-transparent text-black dark:text-white border border-black/20 dark:border-white/20 hover:border-[#C9A961] dark:hover:border-[#C9A961] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-sm transition-all duration-300"
            >
              <span>View All Products</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
}: {
  product: {
    id: number | string;
    name: string;
    category: string;
    price: number;
    image: string;
    isNew?: boolean;
  };
}) {
  return (
    <div className="group flex flex-col justify-between h-full bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 hover:border-[#C9A961]/50 rounded-sm overflow-hidden transition-all duration-500 hover:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.25)]">
      {/* ইমেজে ক্লিক করলে ডিটেইলস পেজে যাবে */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative w-full aspect-[4/5] bg-neutral-50 dark:bg-[#181818] overflow-hidden">
          {product.isNew && (
            <span className="absolute top-2.5 left-2.5 z-10 text-[8px] tracking-[0.2em] uppercase bg-black dark:bg-white text-white dark:text-black px-2.5 py-1 font-bold">
              NEW
            </span>
          )}
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            unoptimized
            className="object-cover grayscale-[8%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
          />
        </div>
      </Link>

      {/* প্রোডাক্ট ইনফো (নামে ক্লিক করলেও ডিটেইলসে যাবে) */}
      <Link
        href={`/products/${product.id}`}
        className="flex flex-col gap-1 px-3.5 pt-3.5"
      >
        <span className="text-[8px] uppercase tracking-[0.25em] text-neutral-400 font-medium">
          {product.category}
        </span>
        <h3 className="text-xs md:text-sm font-serif text-black dark:text-white line-clamp-1 group-hover:underline">
          {product.name}
        </h3>
        <span className="text-xs md:text-sm font-semibold text-black dark:text-white mt-0.5">
          ৳ {product.price.toLocaleString("en-BD")}
        </span>
      </Link>

      {/* অ্যাকশন বাটন (ক্লিক করলে ডিটেইলস পেজে যাবে) */}
      <div className="p-3.5 pt-3">
        <Link href={`/products/${product.id}`} className="block w-full">
          <ProductButton
            hoverText={"View Details →"}
            className="w-full py-2.5 text-[11px] uppercase tracking-[0.15em] rounded-sm"
          >
            <span>View Product</span>
          </ProductButton>
        </Link>
      </div>
    </div>
  );
}
