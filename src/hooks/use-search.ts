import { useState, useEffect, useRef } from "react";

export function useSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Auto focus when opened
  useEffect(() => {
    if (isSearchOpen) {
      const t = setTimeout(() => searchInputRef.current?.focus(), 250);
      return () => clearTimeout(t);
    }
  }, [isSearchOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!isSearchOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    const t = setTimeout(() => document.addEventListener("mousedown", onClickOutside), 100);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [isSearchOpen]);

  return { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, searchInputRef, searchRef };
}