"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  isNew?: boolean;
}

// ডেস্কটপে একসাথে কয়টা প্রোডাক্ট দেখা যায় (FeaturedProducts.tsx এর w-1/5 এর সাথে মিলিয়ে রাখা)
const ITEMS_PER_VIEW = 5;

export function useProductSlider(autoPlayInterval = 6000) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        setLoading(true);

        // আপনার API-এর সমস্ত ক্যাটাগরি লিস্ট
        const categories = [
          "men",
          "casual",
          "formal",
          "jeans",
          "panjabi",
          "polo",
          "t-shirt",
          "women",
        ];

        // সব ক্যাটাগরি থেকে প্যারালালে ডাটা ফেচ করা
        const requests = categories.map((cat) =>
          fetch(`/api/category/${cat}`).then((res) => {
            if (!res.ok) return null;
            return res.json();
          })
        );

        const results = await Promise.all(requests);
        let allProducts: Product[] = [];

        results.forEach((data) => {
          if (data && Array.isArray(data.products)) {
            allProducts = [...allProducts, ...data.products];
          }
        });

        // আইডি যাতে ডুপ্লিকেট না হয় সে জন্য অনন্য ইউনিক কি তৈরি করা
        const uniqueProducts = allProducts.map((product, idx) => ({
          ...product,
          uniqueKey: `${product.category}-${product.id}-${idx}`,
        }));

        setProducts(uniqueProducts);
      } catch (err) {
        console.error("Failed to fetch all products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAllProducts();
  }, []);

  // একসাথে যতগুলো প্রোডাক্ট দেখা যায় তার ভিত্তিতে সর্বোচ্চ ইনডেক্স
  // (যেমন ৪০টা প্রোডাক্ট থাকলে ও ৫টা করে দেখা গেলে, ইনডেক্স 0 থেকে 35 পর্যন্ত যাবে
  // যাতে শেষের 5 টা প্রোডাক্ট পর্যন্ত সবগুলোই দেখা যায়)
  const maxIndex = useMemo(
    () => Math.max(0, products.length - ITEMS_PER_VIEW),
    [products.length]
  );
  const totalSteps = maxIndex + 1;

  // নেক্সট (একটা একটা প্রোডাক্ট করে সরবে, শেষে পৌঁছালে আবার শুরুতে ফিরে আসবে)
  const handleNext = useCallback(() => {
    setCurrentIndex((curr) => (curr + 1) % totalSteps);
  }, [totalSteps]);

  // প্রিভিয়াস
  const handlePrev = useCallback(() => {
    setCurrentIndex((curr) => (curr === 0 ? maxIndex : curr - 1));
  }, [maxIndex]);

  // প্রোডাক্ট লোড হওয়ার পর ইনডেক্স যেন রেঞ্জের বাইরে না থাকে
  useEffect(() => {
    setCurrentIndex((curr) => Math.min(curr, maxIndex));
  }, [maxIndex]);

  // অটো-স্লাইড
  useEffect(() => {
    if (products.length <= ITEMS_PER_VIEW) return; // সব প্রোডাক্ট একসাথে দেখা গেলে স্লাইড করার দরকার নেই
    const interval = setInterval(handleNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [products.length, handleNext, autoPlayInterval]);

  return {
    products,
    currentIndex,
    loading,
    handleNext,
    handlePrev,
    setCurrentIndex,
  };
}