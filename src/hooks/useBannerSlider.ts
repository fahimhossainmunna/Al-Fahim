"use client";

import { useState, useEffect, useCallback } from "react";
import { BannerSlide } from "@/app/api/banners/route";

export function useBannerSlider(autoPlayInterval = 6000) {
  const [slides, setSlides] = useState<BannerSlide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API থেকে ডাটা ফেচ করা
  useEffect(() => {
    async function fetchBanners() {
      try {
        const res = await fetch("/api/banners");
        if (!res.ok) throw new Error("Failed to fetch banners");
        const data = await res.json();
        setSlides(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchBanners();
  }, []);

  const handleNext = useCallback(() => {
    setSlides((prevSlides) => {
      if (prevSlides.length === 0) return prevSlides;
      setCurrentIndex((prevIndex) => (prevIndex + 1) % prevSlides.length);
      return prevSlides;
    });
  }, []);

  const handlePrev = useCallback(() => {
    setSlides((prevSlides) => {
      if (prevSlides.length === 0) return prevSlides;
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? prevSlides.length - 1 : prevIndex - 1
      );
      return prevSlides;
    });
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // অটো-স্লাইড টাইমার
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [slides.length, handleNext, autoPlayInterval]);

  return {
    slides,
    currentSlide: slides[currentIndex] || null,
    currentIndex,
    loading,
    error,
    handleNext,
    handlePrev,
    goToSlide,
  };
}