"use client";

import { useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

export function useMousePosition() {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // মাউস পজিশন মোশন ভ্যালুস
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // স্প্রিং অ্যানিমেশন কনফিগারেশন (স্মুথনেস কন্ট্রোল)
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current) return;
    const rect = elementRef.current.getBoundingClientRect();
    
    // এলিমেন্টের সাপেক্ষে মাউসের পজিশন সেট করা
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return {
    elementRef,
    isHovered,
    setIsHovered,
    handleMouseMove,
    cursorX,
    cursorY,
  };
}