"use client";

import React, { useState, useEffect, use, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast"; // 👈 1. Import toast
import { ProductButton } from "@/components/ui/ProductButton";
import { useCartStore } from "@/store/useCartStore";

interface Product {
  id: number | string;
  name: string;
  category: string;
  price: number;
  image: string;
  isNew?: boolean;
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  // Zustand Store
  const addToCart = useCartStore((state) => state.addToCart);

  const [product, setProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "shipping">("details");

  // Size Guide Modal State
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Review System States
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      userName: "Abrar Fahim",
      rating: 5,
      comment:
        "The fabric quality is absolutely stunning. Fits perfectly as per the size guide. Highly recommended!",
      date: "2 days ago",
    },
    {
      id: "2",
      userName: "Tanvir Hossain",
      rating: 5,
      comment:
        "Fast delivery and premium packaging. The black tone is solid and hasn't faded after the first wash.",
      date: "1 week ago",
    },
  ]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewerName, setNewReviewerName] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch product data & ALL suggested products
  useEffect(() => {
    async function fetchProductData() {
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
            res.ok ? res.json() : null
          )
        );

        const results = await Promise.all(requests);
        let foundProduct: Product | null = null;
        let allProducts: Product[] = [];

        for (const data of results) {
          if (data && Array.isArray(data.products)) {
            allProducts = [...allProducts, ...data.products];
            if (!foundProduct) {
              const match = data.products.find(
                (p: Product) => String(p.id) === String(productId)
              );
              if (match) foundProduct = match;
            }
          }
        }

        setProduct(foundProduct);

        // Filter suggested products
        if (foundProduct) {
          const related = allProducts.filter(
            (p) => String(p.id) !== String(productId)
          );
          setSuggestedProducts(related);
        }
      } catch (err) {
        console.error("Error fetching product detail:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProductData();
  }, [productId]);

  // Suggested Products Auto Slider Logic
  const maxSliderIndex = Math.max(0, suggestedProducts.length - 4);

  const handleNextSlide = useCallback(() => {
    setSliderIndex((prev) => (prev >= maxSliderIndex ? 0 : prev + 1));
  }, [maxSliderIndex]);

  const handlePrevSlide = useCallback(() => {
    setSliderIndex((prev) => (prev === 0 ? maxSliderIndex : prev - 1));
  }, [maxSliderIndex]);

  useEffect(() => {
    if (suggestedProducts.length === 0) return;
    const interval = setInterval(handleNextSlide, 5000);
    return () => clearInterval(interval);
  }, [suggestedProducts.length, handleNextSlide]);

  const handleQuantity = (type: "inc" | "dec") => {
    if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
    if (type === "inc" && quantity < 10) setQuantity(quantity + 1);
  };

  // 🚀 2. Add to Cart with Professional Toast Notification
  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      size: selectedSize,
      quantity: quantity,
    });

    // Custom Styled Toast Popup
    toast.success(`${product.name} (${selectedSize}) added to bag!`, {
      icon: "🛒",
      style: {
        borderRadius: "9999px",
        background: "#000000",
        color: "#ffffff",
        border: "1px solid #333333",
        fontSize: "12px",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      },
    });
  };

  // Review Submission
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewerName.trim() || !newComment.trim()) return;

    const reviewObj: Review = {
      id: Date.now().toString(),
      userName: newReviewerName,
      rating: newRating,
      comment: newComment,
      date: "Just now",
    };

    setReviews([reviewObj, ...reviews]);
    setNewReviewerName("");
    setNewComment("");
    setNewRating(5);
    setIsReviewModalOpen(false);

    toast.success("Review submitted successfully!");
  };

  // Review Deletion
  const handleDeleteReview = (id: string) => {
    if (!isAdmin) {
      toast.error("Only admin can delete reviews!");
      return;
    }
    setReviews(reviews.filter((r) => r.id !== id));
    toast.success("Review deleted!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-12 h-px bg-black dark:bg-white animate-pulse" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-black dark:text-white pt-32 text-center">
        <h2 className="text-xl uppercase tracking-widest font-bold">
          Product Not Found
        </h2>
        <Link
          href="/products"
          className="mt-4 inline-block text-xs uppercase tracking-widest underline text-neutral-500 hover:text-black dark:hover:text-white"
        >
          ← Back to Catalog
        </Link>
      </div>
    );
  }

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : "5.0";

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-black dark:text-white pt-28 pb-24 px-4 md:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs uppercase tracking-widest text-neutral-500 mb-8 flex items-center gap-2">
          <Link
            href="/"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href="/products"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Products
          </Link>
          <span>/</span>
          <span className="text-black dark:text-white font-semibold line-clamp-1">
            {product.name}
          </span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          {/* LEFT: Product Image */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[4/5] bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden rounded-sm group">
              {product.isNew && (
                <span className="absolute top-4 left-4 z-10 text-[9px] tracking-[0.2em] uppercase bg-black dark:bg-white text-white dark:text-black px-3 py-1 font-bold">
                  NEW
                </span>
              )}
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                unoptimized
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* RIGHT: Product Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center text-xs tracking-widest text-neutral-500 uppercase mb-2">
                <span>CATEGORY: {product.category}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  In Stock
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-wider uppercase mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-bold">
                  ৳ {product.price.toLocaleString("en-BD")}
                </span>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                Premium quality garment designed for exceptional comfort and modern aesthetic. Crafted with high-grade fabric to ensure long-lasting durability.
              </p>

              <hr className="border-neutral-200 dark:border-neutral-800 mb-8" />

              {/* Size Selector */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs uppercase tracking-widest font-bold">
                    Select Size
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs underline text-neutral-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer uppercase tracking-wider"
                  >
                    Size Guide
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-11 w-14 flex items-center justify-center text-xs font-bold tracking-widest uppercase border transition-all cursor-pointer ${
                        selectedSize === size
                          ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                          : "border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <span className="block text-xs uppercase tracking-widest font-bold mb-3">
                  Quantity
                </span>
                <div className="inline-flex items-center border border-neutral-300 dark:border-neutral-700">
                  <button
                    onClick={() => handleQuantity("dec")}
                    className="w-10 h-10 flex items-center justify-center text-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-bold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantity("inc")}
                    className="w-10 h-10 flex items-center justify-center text-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mb-8">
                <ProductButton
                  onClick={handleAddToCart}
                  hoverText="ADD TO BAG +"
                  className="w-full py-4 text-xs tracking-[0.2em] font-bold uppercase rounded-none cursor-pointer"
                >
                  ADD TO CART
                </ProductButton>

                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 text-xs tracking-[0.2em] font-bold uppercase border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300 cursor-pointer"
                >
                  BUY IT NOW
                </button>
              </div>
            </div>

            {/* Quick Info Tabs */}
            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6">
              <div className="flex gap-6 border-b border-neutral-200 dark:border-neutral-800 pb-2 mb-4">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`text-xs uppercase tracking-widest font-bold pb-2 transition-colors relative cursor-pointer ${
                    activeTab === "details"
                      ? "text-black dark:text-white"
                      : "text-neutral-400"
                  }`}
                >
                  Product Highlights
                  {activeTab === "details" && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black dark:bg-white" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("shipping")}
                  className={`text-xs uppercase tracking-widest font-bold pb-2 transition-colors relative cursor-pointer ${
                    activeTab === "shipping"
                      ? "text-black dark:text-white"
                      : "text-neutral-400"
                  }`}
                >
                  Shipping & Returns
                  {activeTab === "shipping" && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black dark:bg-white" />
                  )}
                </button>
              </div>

              <div className="text-xs text-neutral-600 dark:text-neutral-400 space-y-2">
                {activeTab === "details" ? (
                  <ul className="list-disc list-inside space-y-1">
                    <li>100% High Grade Premium Cotton/Fabric</li>
                    <li>Ergonomic cut for perfect everyday fit</li>
                    <li>Pre-shrunk to maintain shape after wash</li>
                  </ul>
                ) : (
                  <p className="leading-relaxed">
                    Fast delivery within 2-3 days in Dhaka & 3-5 days across Bangladesh. Easy 7-day return policy.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SPECIFICATIONS & CARE */}
        <section className="mb-24 border-t border-neutral-200 dark:border-neutral-800 pt-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-serif uppercase tracking-widest text-center mb-12">
              Specifications & Care
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
              <div className="border border-neutral-200 dark:border-neutral-800 p-6 rounded-sm space-y-3">
                <h3 className="font-bold uppercase tracking-wider text-sm border-b border-neutral-200 dark:border-neutral-800 pb-2">
                  Material & Craft
                </h3>
                <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-900">
                  <span className="text-neutral-500">Fabric</span>
                  <span className="font-semibold">100% Organic Cotton</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-900">
                  <span className="text-neutral-500">Fit</span>
                  <span className="font-semibold">Regular Tailored Fit</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-900">
                  <span className="text-neutral-500">Weave</span>
                  <span className="font-semibold">Premium Compact Weave</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-500">Origin</span>
                  <span className="font-semibold">Made in Bangladesh</span>
                </div>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 p-6 rounded-sm space-y-3">
                <h3 className="font-bold uppercase tracking-wider text-sm border-b border-neutral-200 dark:border-neutral-800 pb-2">
                  Wash Care
                </h3>
                <ul className="space-y-2.5 text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-center gap-2">
                    <span>•</span> Machine wash cold with like colors
                  </li>
                  <li className="flex items-center gap-2">
                    <span>•</span> Do not bleach or use heavy detergents
                  </li>
                  <li className="flex items-center gap-2">
                    <span>•</span> Tumble dry low or line dry in shade
                  </li>
                  <li className="flex items-center gap-2">
                    <span>•</span> Warm iron inside out if required
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS SECTION */}
        <section className="mb-24 border-t border-neutral-200 dark:border-neutral-800 pt-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
              <div>
                <h2 className="text-xl font-serif uppercase tracking-widest">
                  Customer Reviews
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-amber-500 text-sm">
                    {"★".repeat(Math.round(Number(avgRating)))}
                    {"☆".repeat(5 - Math.round(Number(avgRating)))}
                  </div>
                  <span className="text-xs text-neutral-500 font-bold">
                    ({avgRating} out of 5 based on {reviews.length} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAdmin(!isAdmin)}
                  className={`text-[10px] uppercase tracking-wider px-2.5 py-1 border transition-colors ${
                    isAdmin
                      ? "bg-red-600 text-white border-red-600 font-bold"
                      : "border-neutral-300 text-neutral-400"
                  }`}
                >
                  {isAdmin ? "Admin Mode ON" : "User Mode"}
                </button>

                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="px-6 py-2.5 text-xs uppercase tracking-widest font-bold border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
                >
                  Write a Review
                </button>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="border-b border-neutral-200 dark:border-neutral-800 pb-6 flex justify-between items-start"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {rev.userName}
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        {rev.date}
                      </span>
                    </div>
                    <div className="text-amber-500 text-xs">
                      {"★".repeat(rev.rating)}
                      {"☆".repeat(5 - rev.rating)}
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed pt-1">
                      {rev.comment}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteReview(rev.id)}
                    className="text-[10px] uppercase font-semibold text-neutral-400 hover:text-red-500 transition-colors ml-4 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* YOU MAY ALSO LIKE */}
        {suggestedProducts.length > 0 && (
          <section className="border-t border-neutral-200 dark:border-neutral-800 pt-16">
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-500">
                  Curated Collection
                </span>
                <h2 className="text-2xl font-serif uppercase tracking-widest mt-1">
                  You May Also Like
                </h2>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevSlide}
                  className="w-10 h-10 rounded-full border border-black/10 dark:border-white/15 bg-transparent flex items-center justify-center text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer"
                  aria-label="Previous Products"
                >
                  ←
                </button>
                <button
                  onClick={handleNextSlide}
                  className="w-10 h-10 rounded-full border border-black/10 dark:border-white/15 bg-transparent flex items-center justify-center text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer"
                  aria-label="Next Products"
                >
                  →
                </button>
              </div>
            </div>

            {/* Automatic Slide Track */}
            <div className="relative w-full overflow-hidden">
              <motion.div
                className="flex"
                animate={{
                  x: `-${sliderIndex * 25}%`,
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {suggestedProducts.map((item, idx) => (
                  <div
                    key={`${item.category}-${item.id}-${idx}`}
                    className="w-1/2 md:w-1/4 flex-shrink-0 px-2 md:px-3"
                  >
                    <Link
                      href={`/products/${item.id}`}
                      className="group flex flex-col justify-between h-full bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white rounded-sm overflow-hidden transition-all duration-300"
                    >
                      <div className="relative w-full aspect-[4/5] bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          unoptimized
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 flex flex-col gap-1">
                        <span className="text-[8px] uppercase tracking-widest text-neutral-400">
                          {item.category}
                        </span>
                        <h3 className="text-xs font-serif font-bold uppercase truncate group-hover:underline">
                          {item.name}
                        </h3>
                        <span className="text-xs font-semibold mt-1">
                          ৳ {item.price.toLocaleString("en-BD")}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>
        )}
      </div>

      {/* WRITE A REVIEW MODAL */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 p-6 md:p-8 max-w-md w-full relative shadow-2xl z-10 text-black dark:text-white"
            >
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="absolute top-4 right-4 text-neutral-500 hover:text-black dark:hover:text-white text-lg cursor-pointer"
              >
                ✕
              </button>

              <h3 className="text-lg font-bold uppercase tracking-widest mb-1">
                Write a Review
              </h3>
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-6">
                Share your feedback on {product.name}
              </p>

              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newReviewerName}
                    onChange={(e) => setNewReviewerName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 bg-transparent focus:outline-none focus:border-black dark:focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold mb-1">
                    Rating
                  </label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 bg-transparent focus:outline-none focus:border-black dark:focus:border-white"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                    <option value={2}>2 Stars ★★☆☆☆</option>
                    <option value={1}>1 Star ★☆☆☆☆</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold mb-1">
                    Review Comment
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your honest opinion..."
                    className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 bg-transparent focus:outline-none focus:border-black dark:focus:border-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs uppercase tracking-widest font-bold bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition-opacity cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SIZE GUIDE MODAL */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 p-6 md:p-8 max-w-lg w-full relative shadow-2xl z-10 text-black dark:text-white"
            >
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="absolute top-4 right-4 text-neutral-500 hover:text-black dark:hover:text-white text-lg cursor-pointer"
              >
                ✕
              </button>

              <h3 className="text-lg font-bold uppercase tracking-widest mb-1">
                Size Guide
              </h3>
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-6">
                Measurements in inches
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 uppercase tracking-wider">
                      <th className="py-3 px-2">Size</th>
                      <th className="py-3 px-2">Chest</th>
                      <th className="py-3 px-2">Length</th>
                      <th className="py-3 px-2">Sleeve</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 font-medium">
                    <tr>
                      <td className="py-3 px-2 font-bold">S</td>
                      <td className="py-3 px-2">38"</td>
                      <td className="py-3 px-2">27"</td>
                      <td className="py-3 px-2">8.0"</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-bold">M</td>
                      <td className="py-3 px-2">40"</td>
                      <td className="py-3 px-2">28"</td>
                      <td className="py-3 px-2">8.5"</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-bold">L</td>
                      <td className="py-3 px-2">42"</td>
                      <td className="py-3 px-2">29"</td>
                      <td className="py-3 px-2">9.0"</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-bold">XL</td>
                      <td className="py-3 px-2">44"</td>
                      <td className="py-3 px-2">30"</td>
                      <td className="py-3 px-2">9.5"</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-bold">XXL</td>
                      <td className="py-3 px-2">46"</td>
                      <td className="py-3 px-2">31"</td>
                      <td className="py-3 px-2">10.0"</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-[10px] text-neutral-400 mt-6 uppercase tracking-wider">
                * Fits true to size. Take your normal size for a standard fit or one size up for an oversized look.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}