"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Filter,
  ShoppingBag,
  SlidersHorizontal,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  isNew: boolean;
}

export default function NestedCategoryPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const resolvedParams = use(params);
  const { category, id } = resolvedParams;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrice, setSelectedPrice] = useState<number>(5000);
  const [onlyNew, setOnlyNew] = useState<boolean>(false);

  // 🚀 Mouse Follower States
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchNestedData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/category/${id}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching nested products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNestedData();
  }, [category, id]);

  const pageTitle = id.replace(/-/g, " ").toUpperCase();

  const filteredProducts = products.filter((p) => {
    const matchesPrice = p.price <= selectedPrice;
    const matchesNew = onlyNew ? p.isNew : true;
    return matchesPrice && matchesNew;
  });

  const hasActiveFilters = selectedPrice < 5000 || onlyNew;

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Added to cart:", product);
    alert(`${product.name} added to cart!`);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100px" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-px bg-white"
        />
        <span className="text-[11px] tracking-[0.4em] uppercase text-neutral-400 font-light animate-pulse">
          Loading {pageTitle} Collection...
        </span>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      {/* 1. Header */}
      <section className="pt-28 pb-8 px-6 max-w-7xl mx-auto border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-neutral-500 font-semibold mb-4">
          <Link
            href="/"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            SHOP
          </Link>
          <ChevronRight size={12} className="text-neutral-400" />
          <Link
            href={`/category/${category}`}
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            {category.toUpperCase()}
          </Link>
          <ChevronRight size={12} className="text-neutral-400" />
          <span className="text-black dark:text-white">{pageTitle}</span>
        </div>

        <div className="flex items-end justify-between flex-wrap gap-4">
          <h1 className="text-3xl sm:text-5xl font-serif uppercase tracking-widest text-black dark:text-white font-light">
            {pageTitle}
          </h1>
          <span className="text-[11px] tracking-[0.25em] uppercase text-neutral-500 pb-1">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "Item" : "Items"}
          </span>
        </div>
      </section>

      {/* 2. Main Layout */}
      <section className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Left Sidebar Filter */}
          <aside className="lg:col-span-1 h-fit lg:sticky lg:top-24">
            <div className="border border-black/10 dark:border-white/10 min-h-[640px] flex flex-col">
              <div className="flex items-center justify-between px-6 py-7 border-b border-black/10 dark:border-white/10">
                <span className="text-xs tracking-[0.25em] uppercase font-bold flex items-center gap-2 text-black dark:text-white">
                  <Filter size={14} />
                  Filters
                </span>
                <SlidersHorizontal size={14} className="text-neutral-400" />
              </div>

              <div className="flex-1 px-6 py-10 space-y-12">
                {/* Price Filter */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] tracking-[0.2em] uppercase font-medium text-neutral-500">
                      Max Price
                    </label>
                    <span className="text-xs font-semibold text-black dark:text-white">
                      ৳ {selectedPrice.toLocaleString("en-BD")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={5000}
                    step={250}
                    value={selectedPrice}
                    onChange={(e) => setSelectedPrice(Number(e.target.value))}
                    className="w-full h-px bg-black/15 dark:bg-white/15 rounded-full appearance-none cursor-pointer accent-black dark:accent-white"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 tracking-wider">
                    <span>৳ 1,000</span>
                    <span>৳ 5,000</span>
                  </div>
                </div>

                {/* Availability Filter */}
                <div className="space-y-4 border-t border-black/10 dark:border-white/10 pt-10">
                  <span className="text-[11px] tracking-[0.2em] uppercase font-medium text-neutral-500 block">
                    Availability
                  </span>
                  <label className="flex items-center justify-between text-xs cursor-pointer text-black dark:text-white group py-1">
                    <span className="tracking-wide group-hover:text-neutral-500 transition-colors">
                      New Arrivals Only
                    </span>
                    <span
                      onClick={() => setOnlyNew(!onlyNew)}
                      className={`relative w-9 h-5 rounded-full transition-colors duration-300 shrink-0 ${
                        onlyNew
                          ? "bg-black dark:bg-white"
                          : "bg-black/15 dark:bg-white/15"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white dark:bg-black transition-transform duration-300 ${
                          onlyNew ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </span>
                  </label>
                </div>

                {/* Sort By */}
                <div className="space-y-4 border-t border-black/10 dark:border-white/10 pt-10">
                  <span className="text-[11px] tracking-[0.2em] uppercase font-medium text-neutral-500 block">
                    Sort By
                  </span>
                  <div className="space-y-3">
                    {[
                      "Newest First",
                      "Price: Low to High",
                      "Price: High to Low",
                    ].map((label) => (
                      <label
                        key={label}
                        className="flex items-center gap-3 text-xs cursor-pointer text-black dark:text-white group"
                      >
                        <span className="w-3.5 h-3.5 rounded-full border border-black/30 dark:border-white/30 flex items-center justify-center shrink-0 group-hover:border-black dark:group-hover:border-white transition-colors">
                          <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white opacity-0 group-hover:opacity-40 transition-opacity" />
                        </span>
                        <span className="tracking-wide text-neutral-600 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white transition-colors">
                          {label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <div className="px-6 py-6 border-t border-black/10 dark:border-white/10">
                <button
                  onClick={() => {
                    setSelectedPrice(5000);
                    setOnlyNew(false);
                  }}
                  disabled={!hasActiveFilters}
                  className={`w-full flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] transition-colors ${
                    hasActiveFilters
                      ? "text-neutral-500 hover:text-black dark:hover:text-white cursor-pointer"
                      : "text-neutral-300 dark:text-neutral-700 cursor-not-allowed"
                  }`}
                >
                  <X size={12} />
                  Reset Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Right Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="py-24 flex flex-col items-center justify-center text-center border border-dashed border-black/15 dark:border-white/15">
                <span className="text-neutral-500 uppercase tracking-widest text-xs">
                  No products match your selected filters.
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group/card relative border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-[#0A0A0A] p-3 hover:border-black/30 dark:hover:border-white/30 transition-colors duration-500"
                  >
                    {/* Image Container */}
                    <div
                      className="relative w-full h-[360px] overflow-hidden bg-neutral-200 dark:bg-[#151515]"
                      onMouseMove={handleMouseMove}
                      onMouseEnter={() => setHoveredCardId(product.id)}
                      onMouseLeave={() => setHoveredCardId(null)}
                    >
                      {product.isNew && (
                        <span className="absolute top-3 left-3 z-10 text-[8px] tracking-[0.25em] uppercase bg-black dark:bg-white text-white dark:text-black px-2.5 py-1 font-bold">
                          NEW
                        </span>
                      )}

                      {/* 🚀 Mouse Follower Logo */}
                      {hoveredCardId === product.id && (
                        <motion.div
                          className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2"
                          animate={{
                            x: mousePos.x,
                            y: mousePos.y,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 250,
                            damping: 20,
                            mass: 0.5,
                          }}
                        >
                          <Image
                            src="/logo/fahimOne.png"
                            alt="AF Logo Follower"
                            width={45}
                            height={45}
                            className="object-contain drop-shadow-xl dark:invert"
                          />
                        </motion.div>
                      )}

                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover object-top grayscale-[10%] group-hover/card:grayscale-0 group-hover/card:scale-105 transition-all duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />

                      {/* Card Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      {/* Cikon Add to Cart Button */}
                      <div
                        className="absolute bottom-3 left-3 right-3 z-40 translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300 ease-out"
                        onClick={(e) => handleAddToCart(e, product)}
                      >
                        <Button
                          type="button"
                          hoverText={
                            <>
                              <ShoppingBag className="w-3.5 h-3.5 -mt-0.5 shrink-0" />
                              <span>ADD TO CART</span>
                            </>
                          }
                          className="w-full !py-2.5 !text-[10px] !tracking-[0.2em] uppercase shadow-lg font-semibold cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 -mt-0.5 shrink-0" />
                          <span>Add to cart</span>
                        </Button>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="mt-4 space-y-1 px-1 pb-1">
                      <span className="text-[8px] tracking-[0.3em] uppercase text-neutral-500 font-semibold">
                        {product.category}
                      </span>
                      <h3 className="font-serif text-lg uppercase tracking-wide text-black dark:text-white">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between pt-1">
                        <p className="text-xs font-semibold text-black dark:text-white">
                          ৳ {product.price.toLocaleString("en-BD")} BDT
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}