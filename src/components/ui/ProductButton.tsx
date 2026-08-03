import React from "react";

interface ProductButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  hoverText?: string;
  className?: string;
}

export const ProductButton: React.FC<ProductButtonProps> = ({
  children,
  hoverText,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`relative overflow-hidden group border border-black dark:border-white bg-transparent text-black dark:text-white transition-colors duration-300 cursor-pointer ${className}`}
      {...props}
    >
      {/* Background Fill Animation Overlay */}
      <span className="absolute inset-0 bg-black dark:bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />

      {/* Button Text */}
      <span className="relative z-10 block transition-transform duration-300 group-hover:-translate-y-full">
        {children}
      </span>
      {hoverText && (
        <span className="absolute inset-0 z-10 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-white dark:text-black font-bold">
          {hoverText}
        </span>
      )}
    </button>
  );
};
