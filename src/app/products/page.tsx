"use client";

import { ProductButton } from "@/components/ui/ProductButton";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";

interface Product {
  id: number | string;
  name: string;
  category: string;
  price: number;
  image: string;
  isNew?: boolean;
  mainCategory?: "men" | "women" | "kids";
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // ফিল্টার স্টেট
  const [activeTab, setActiveTab] = useState<"all" | "men" | "women" | "kids">(
    "all",
  );
  const [selectedSubCat, setSelectedSubCat] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [onlyNew, setOnlyNew] = useState<boolean>(false);

  // পেজিনেশন স্টেট
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  // প্রোডাক্ট ডেটা ফেচ করা
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const categories = [
          "men",
          "casual",
          "formal",
          "jeans",
          "panjabi",
          "polo",
          "t-shirt",
          "women",
          "kids",
        ];

        const requests = categories.map((cat) =>
          fetch(`/api/category/${cat}`).then((res) =>
            res.ok ? res.json() : null,
          ),
        );

        const results = await Promise.all(requests);
        let allProds: Product[] = [];

        results.forEach((data, index) => {
          if (data && Array.isArray(data.products)) {
            const catName = categories[index];
            const mapped = data.products.map((p: Product) => ({
              ...p,
              mainCategory:
                catName === "women"
                  ? "women"
                  : catName === "kids"
                    ? "kids"
                    : "men",
            }));
            allProds = [...allProds, ...mapped];
          }
        });

        setProducts(allProds);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // ফিল্টারিং লজিক
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      if (activeTab !== "all" && item.mainCategory !== activeTab) return false;
      if (
        selectedSubCat !== "all" &&
        item.category.toLowerCase() !== selectedSubCat.toLowerCase()
      ) {
        return false;
      }
      if (item.price > maxPrice) return false;
      if (onlyNew && !item.isNew) return false;
      return true;
    });
  }, [products, activeTab, selectedSubCat, maxPrice, onlyNew]);

  // পেজিনেশন ক্যালকুলেশন
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const hasActiveFilters =
    activeTab !== "all" ||
    selectedSubCat !== "all" ||
    maxPrice < 10000 ||
    onlyNew;

  const handleTabChange = (tab: "all" | "men" | "women" | "kids") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#0A0A0A] text-neutral-900 dark:text-neutral-100 pt-24 pb-24 transition-colors duration-500 overflow-hidden">

      {/* সূক্ষ্ম ব্যাকগ্রাউন্ড টেক্সচার */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,_#000_1px,_transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,_#fff_1px,_transparent_0)] [background-size:24px_24px]" />

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12">

        {/* হেডার */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-12"
        >
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 40 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-px bg-gradient-to-b from-transparent via-[#C9A961] to-transparent mb-6"
          />
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-[#C9A961] font-medium">
            Collection &apos;26
          </span>
          <h1 className="font-serif text-3xl md:text-5xl uppercase tracking-wider text-black dark:text-white mt-3">
            All Products
          </h1>
          <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 mt-4">
            {filteredProducts.length} {filteredProducts.length === 1 ? "Item" : "Items"} Found
          </span>
        </motion.div>

        {/* টপ ফিল্টার ট্যাব */}
        <div className="flex justify-center items-center gap-3 md:gap-10 border-b border-black/10 dark:border-white/10 pb-4 mb-10">
          {(["all", "men", "women", "kids"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`text-xs md:text-sm uppercase tracking-[0.3em] font-semibold transition-colors relative py-2 cursor-pointer ${
                activeTab === tab
                  ? "text-black dark:text-white"
                  : "text-neutral-400 hover:text-black dark:hover:text-white"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabBorder"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-[#C9A961]"
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* সাইডবার ফিল্টার */}
          <aside className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-24 h-fit">
            <div className="border border-black/10 dark:border-white/10 min-h-[560px] flex flex-col">
              <div className="flex items-center justify-between px-6 py-5 border-b border-black/10 dark:border-white/10">
                <span className="text-xs tracking-[0.25em] uppercase font-bold text-black dark:text-white">
                  Filters
                </span>
              </div>

              <div className="flex-1 px-6 py-8 space-y-10">
                {/* সাব-ক্যাটাগরি */}
                <div className="space-y-3">
                  <h3 className="text-[11px] uppercase tracking-[0.2em] font-medium text-neutral-500">
                    Categories
                  </h3>
                  <div className="flex flex-col gap-2.5 text-xs">
                    {[
                      "all",
                      "panjabi",
                      "polo",
                      "casual",
                      "formal",
                      "jeans",
                      "t-shirt",
                    ].map((sub) => (
                      <button
                        key={sub}
                        onClick={() => {
                          setSelectedSubCat(sub);
                          setCurrentPage(1);
                        }}
                        className={`text-left capitalize tracking-wide py-0.5 transition-colors cursor-pointer ${
                          selectedSubCat === sub
                            ? "text-[#C9A961] font-semibold"
                            : "text-neutral-500 hover:text-black dark:hover:text-white"
                        }`}
                      >
                        {sub === "all" ? "All Categories" : sub}
                      </button>
                    ))}
                  </div>
                </div>

                {/* প্রাইস ফিল্টার */}
                <div className="space-y-3 border-t border-black/10 dark:border-white/10 pt-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[11px] uppercase tracking-[0.2em] font-medium text-neutral-500">
                      Max Price
                    </h3>
                    <span className="text-xs font-semibold text-black dark:text-white">
                      ৳ {maxPrice.toLocaleString("en-BD")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="500"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="w-full h-px bg-black/15 dark:bg-white/15 rounded-full appearance-none cursor-pointer accent-[#C9A961]"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 tracking-wider">
                    <span>৳ 500</span>
                    <span>৳ 10,000</span>
                  </div>
                </div>

                {/* নিউ অ্যারাইভাল টগল */}
                <div className="space-y-3 border-t border-black/10 dark:border-white/10 pt-8">
                  <span className="text-[11px] tracking-[0.2em] uppercase font-medium text-neutral-500 block">
                    Availability
                  </span>
                  <label className="flex items-center justify-between text-xs cursor-pointer text-black dark:text-white group">
                    <span className="tracking-wide group-hover:text-neutral-500 transition-colors">
                      New Arrivals Only
                    </span>
                    <span
                      onClick={() => {
                        setOnlyNew(!onlyNew);
                        setCurrentPage(1);
                      }}
                      className={`relative w-9 h-5 rounded-full transition-colors duration-300 shrink-0 ${
                        onlyNew ? "bg-[#C9A961]" : "bg-black/15 dark:bg-white/15"
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
              </div>

              {/* ফিল্টার রিসেট বাটন - ফুটার */}
              <div className="px-6 py-6 border-t border-black/10 dark:border-white/10">
                <button
                  onClick={() => {
                    setActiveTab("all");
                    setSelectedSubCat("all");
                    setMaxPrice(10000);
                    setOnlyNew(false);
                    setCurrentPage(1);
                  }}
                  disabled={!hasActiveFilters}
                  className={`w-full flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] transition-colors cursor-pointer ${
                    hasActiveFilters
                      ? "text-neutral-500 hover:text-black dark:hover:text-white"
                      : "text-neutral-300 dark:text-neutral-700 cursor-not-allowed"
                  }`}
                >
                  <X size={12} />
                  Reset Filters
                </button>
              </div>
            </div>
          </aside>

          {/* প্রোডাক্ট গ্রিড ও পেজিনেশন */}
          <main className="flex-1">
            {loading ? (
              <div className="py-24 flex justify-center">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "80px" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="h-px bg-[#C9A961]"
                />
              </div>
            ) : currentProducts.length === 0 ? (
              <div className="text-center py-24 border border-dashed border-black/15 dark:border-white/15">
                <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
                  No products match your filters.
                </p>
              </div>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeTab}-${selectedSubCat}-${maxPrice}-${onlyNew}-${currentPage}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                  >
                    {currentProducts.map((product, i) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                        className="group flex flex-col justify-between bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 hover:border-[#C9A961]/50 rounded-sm overflow-hidden transition-all duration-500 hover:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.25)]"
                      >
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
                              className="object-cover grayscale-[8%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                            />
                          </div>
                        </Link>

                        <div className="p-3.5 flex flex-col gap-1">
                          <span className="text-[8px] uppercase tracking-[0.25em] text-neutral-400">
                            {product.category}
                          </span>
                          <h3 className="text-xs md:text-sm font-serif line-clamp-1 text-black dark:text-white">
                            {product.name}
                          </h3>
                          <span className="text-xs md:text-sm font-semibold text-black dark:text-white">
                            ৳ {product.price.toLocaleString("en-BD")}
                          </span>
                        </div>

                        {/* 🌟 ফিক্সড বাটন অংশ 🌟 */}
                        <div className="p-3.5 pt-3">
                          <Link
                            href={`/product/${product.id}`}
                            className="block w-full"
                          >
                            <ProductButton
                              hoverText="Buy Now →"
                              className="w-full py-2.5 text-[10px] uppercase tracking-[0.15em] font-bold rounded-sm"
                            >
                              <span>View Product</span>
                            </ProductButton>
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* পেজিনেশন */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-16">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-[10px] uppercase tracking-[0.2em] border border-black/10 dark:border-white/10 disabled:opacity-30 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
                    >
                      ← Prev
                    </button>

                    {Array.from({ length: totalPages }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentPage(idx + 1)}
                        className={`w-9 h-9 text-xs font-medium border transition-colors cursor-pointer ${
                          currentPage === idx + 1
                            ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                            : "border-black/10 dark:border-white/10 text-neutral-500 hover:border-[#C9A961] hover:text-black dark:hover:text-white"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}

                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-[10px] uppercase tracking-[0.2em] border border-black/10 dark:border-white/10 disabled:opacity-30 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}