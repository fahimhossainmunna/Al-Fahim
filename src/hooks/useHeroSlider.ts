"use client";

import { useState, useEffect } from "react";
import { HERO_VIDEOS } from "@/data/heroData";

export interface MousePosition {
  x: number;
  y: number;
}

export function useHeroSlider(autoPlayDuration: number = 8000) {
  const [currentVideo, setCurrentVideo] = useState<number>(0);
  const [videoKey, setVideoKey] = useState<number>(0);
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % HERO_VIDEOS.length);
      setVideoKey((k) => k + 1);
    }, autoPlayDuration);
    
    return () => clearInterval(interval);
  }, [autoPlayDuration]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const goToVideo = (i: number) => {
    if (i === currentVideo) return;
    setCurrentVideo(i);
    setVideoKey((k) => k + 1);
  };

  return {
    videos: HERO_VIDEOS,
    currentVideo,
    videoKey,
    mousePos,
    handleMouseMove,
    goToVideo,
  };
}