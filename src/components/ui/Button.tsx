"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  hoverText?: React.ReactNode; // 👈 string এর জায়গায় React.ReactNode দেওয়া হলো
  className?: string;
}

export const Button = ({ 
  children, 
  hoverText, 
  className = "", 
  ...props 
}: ButtonProps) => {
  return (
    <button
      className={`group relative inline-block overflow-hidden border border-neutral-900 dark:border-neutral-100 bg-white dark:bg-neutral-900 px-[18px] py-[17px] text-[15px] leading-[15px] font-medium tracking-wide text-neutral-900 dark:text-neutral-100 cursor-pointer select-none touch-manipulation transition-colors duration-500 ${className}`}
      {...props}
    >
      {/* Original Content */}
      <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-[600ms] ease-[cubic-bezier(0.48,0,0.12,1)] group-hover:text-white dark:group-hover:text-neutral-900">
        {children}
      </span>

      {/* Hover Text (Slide Up with Icon) */}
      {hoverText && (
        <span className="absolute left-1/2 top-1/2 z-[100] flex items-center justify-center gap-2 -translate-x-1/2 translate-y-[225%] text-white dark:text-neutral-900 opacity-0 transition-all duration-[500ms] ease-[cubic-bezier(0.48,0,0.12,1)] group-hover:translate-y-[-50%] group-hover:opacity-100 group-hover:duration-[900ms] whitespace-nowrap">
          {hoverText}
        </span>
      )}

      {/* Background Animation */}
      <span 
        className="pointer-events-none absolute z-50 bg-neutral-900 dark:bg-neutral-100 origin-bottom transition-transform duration-[600ms] ease-[cubic-bezier(0.48,0,0.12,1)] skew-y-[9.3deg] scale-y-0 group-hover:scale-y-[2]"
        style={{
          bottom: '-150%',
          left: '-100%',
          width: '300%',
          height: '300%',
        }}
      />
    </button>
  );
};