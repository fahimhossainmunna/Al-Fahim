"use client";

import { Button } from "@/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  LogIn,
  Menu,
  Moon,
  Package,
  Search,
  ShoppingBag,
  Sun,
  User,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Imported Hooks and Data
import { accountItems, dropdownItems, marqueeText } from "@/data/navbar-data";
import { useScrollVisibility } from "@/hooks/use-scroll-visibility";
import { useSearch } from "@/hooks/use-search";

export default function Navbar() {
  // UI States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isThemeChanging, setIsThemeChanging] = useState(false);

  const { theme, setTheme, resolvedTheme } = useTheme();

  // Custom Hooks
  const { showBanner, showNavbar } = useScrollVisibility();
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    searchInputRef,
    searchRef,
  } = useSearch();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setIsThemeChanging(true);
    const currentTheme = resolvedTheme || theme;
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    setTimeout(() => {
      setIsThemeChanging(false);
    }, 300);
  };

  const repeatedText = Array(4).fill(marqueeText).join("");

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        {/* Marketing Banner */}
        <AnimatePresence>
          {showBanner && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="bg-black dark:bg-white text-white dark:text-black py-1 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A961]/10 to-transparent pointer-events-none" />
                <motion.div
                  className="flex whitespace-nowrap"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 30,
                    ease: "linear",
                  }}
                >
                  <span className="text-[9px] tracking-[0.2em] uppercase font-medium">
                    {repeatedText}
                  </span>
                  <span className="text-[9px] tracking-[0.2em] uppercase font-medium">
                    {repeatedText}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Navbar */}
        <AnimatePresence>
          {showNavbar && (
            <motion.nav
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full border-b border-black/5 dark:border-white/10 bg-white dark:bg-[#0A0A0A]"
              style={{ height: "52px" }}
            >
              <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between relative">
                {/* Left Menu */}
                <div className="hidden md:flex items-center gap-5 text-[12px] tracking-[0.15em] font-medium uppercase text-black dark:text-white transition-colors duration-300">
                  {Object.keys(dropdownItems).map((item) => (
                    <div
                      key={item}
                      className="relative"
                      onMouseEnter={() => setIsDropdownOpen(item)}
                      onMouseLeave={() => setIsDropdownOpen(null)}
                    >
                      <button className="relative py-1 opacity-80 hover:opacity-100 transition-opacity group">
                        {item}
                        <span className="absolute left-0 -bottom-0.5 h-[1px] w-0 bg-[#C9A961] transition-all duration-300 group-hover:w-full" />
                      </button>

                      <AnimatePresence>
                        {isDropdownOpen === item && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-48 bg-white/95 dark:bg-[#141414]/95 backdrop-blur-xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 py-2 overflow-hidden z-50"
                          >
                            {dropdownItems[
                              item as keyof typeof dropdownItems
                            ].map((subItem, index) => (
                              <motion.div
                                key={subItem}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <Link
                                  href="#"
                                  className="flex items-center px-4 py-2 text-[10px] tracking-wider uppercase text-gray-700 dark:text-gray-300 hover:bg-[#C9A961]/10 hover:text-black dark:hover:text-white hover:pl-5 transition-all duration-200"
                                >
                                  {subItem}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {/* Mobile Menu Trigger */}
                <button
                  className="md:hidden text-black dark:text-white transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu size={18} />
                </button>

                {/* Center Logo */}
                <Link
                  href="/"
                  className="flex items-center justify-center mx-auto md:mx-0"
                >
                  {mounted ? (
                    <>
                      <Image
                        src="/logo/fahimOne.png"
                        alt="AL-FAHIM Logo"
                        width={80}
                        height={28}
                        className={`transition-opacity duration-300 ${theme === "dark" || resolvedTheme === "dark" ? "opacity-0 absolute" : "opacity-100"}`}
                        priority
                      />
                      <Image
                        src="/logo/fahimTwo.png"
                        alt="AL-FAHIM Logo"
                        width={80}
                        height={28}
                        className={`transition-opacity duration-300 ${theme === "dark" || resolvedTheme === "dark" ? "opacity-100" : "opacity-0 absolute"}`}
                        priority
                      />
                    </>
                  ) : (
                    <div className="w-[80px] h-[28px] bg-gray-200 dark:bg-gray-800 animate-pulse rounded" />
                  )}
                </Link>

                {/* Right Icons */}
                <div className="flex items-center gap-3 text-black dark:text-white transition-colors duration-300">
                  {/* Search (Using Hook) */}
                  <div ref={searchRef} className="hidden sm:flex items-center">
                    <div
                      style={{ width: isSearchOpen ? "180px" : "0px" }}
                      className="overflow-hidden transition-[width] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    >
                      <form
                        onSubmit={(e) => e.preventDefault()}
                        className={`flex items-center border-b transition-colors duration-500 mx-1 ${isSearchOpen ? "border-black/60 dark:border-white/60" : "border-transparent"}`}
                      >
                        <input
                          ref={searchInputRef}
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search products..."
                          className="w-full bg-transparent text-[11px] text-black dark:text-white placeholder:text-gray-400 outline-none py-0.5 pl-1 pr-2 tracking-wide"
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="shrink-0 p-1 text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
                            aria-label="Clear search"
                          >
                            <X size={12} strokeWidth={1.5} />
                          </button>
                        )}
                      </form>
                    </div>
                    <button
                      onClick={() => setIsSearchOpen((v) => !v)}
                      aria-label={isSearchOpen ? "Close search" : "Open search"}
                      className="p-0.5 opacity-80 hover:opacity-100 transition-all duration-300"
                    >
                      <div className="relative w-4 h-4">
                        <Search
                          size={16}
                          strokeWidth={1.5}
                          className={`absolute inset-0 transition-all duration-300 ${isSearchOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`}
                        />
                        <X
                          size={16}
                          strokeWidth={1.5}
                          className={`absolute inset-0 transition-all duration-300 ${isSearchOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`}
                        />
                      </div>
                    </button>
                  </div>

                  {/* Account */}
                  <div
                    className="relative hidden sm:block"
                    onMouseEnter={() => setIsAccountOpen(true)}
                    onMouseLeave={() => setIsAccountOpen(false)}
                  >
                    <button
                      className="opacity-80 hover:opacity-100 transition-opacity flex items-center"
                      aria-label="Account"
                    >
                      <User size={16} strokeWidth={1.5} />
                    </button>
                    <AnimatePresence>
                      {isAccountOpen && (
                        <>
                          <div className="absolute top-full right-0 h-2 w-full" />
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="absolute top-full right-0 mt-3 w-56 bg-white/95 dark:bg-[#141414]/95 backdrop-blur-xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden z-50"
                          >
                            <div className="px-4 py-3 border-b border-black/5 dark:border-white/10">
                              <p className="text-[10px] tracking-widest uppercase text-gray-400">
                                Welcome
                              </p>
                              <p className="text-xs font-medium mt-0.5">
                                Manage your account
                              </p>
                            </div>
                            <div className="py-1.5">
                              {accountItems.map((entry, index) => (
                                <motion.div
                                  key={entry.label}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.04 }}
                                >
                                  <Link
                                    href={entry.href}
                                    className="flex items-center gap-3 px-4 py-2.5 text-[11px] tracking-wider uppercase text-gray-700 dark:text-gray-300 hover:bg-[#C9A961]/10 hover:text-black dark:hover:text-white hover:pl-5 transition-all duration-200"
                                  >
                                    <entry.icon
                                      size={14}
                                      strokeWidth={1.5}
                                      className="opacity-70"
                                    />
                                    {entry.label}
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Theme Toggle */}
                  <button
                    onClick={toggleTheme}
                    disabled={!mounted || isThemeChanging}
                    className="opacity-80 hover:opacity-100 transition-all duration-300 p-0.5 rounded-full focus:outline-none disabled:opacity-50"
                    aria-label="Toggle theme"
                  >
                    {!mounted ? (
                      <div className="w-[16px] h-[16px] rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
                    ) : theme === "dark" || resolvedTheme === "dark" ? (
                      <Sun
                        size={16}
                        strokeWidth={1.5}
                        className="text-[#C9A961]"
                      />
                    ) : (
                      <Moon size={16} strokeWidth={1.5} />
                    )}
                  </button>

                  {/* Cart Button */}
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="relative opacity-80 hover:opacity-100 transition-opacity flex items-center"
                    aria-label="Shopping cart"
                  >
                    <ShoppingBag size={16} strokeWidth={1.5} />
                    <span className="absolute -top-1.5 -right-1.5 bg-black dark:bg-white text-white dark:text-black text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors duration-300">
                      0
                    </span>
                  </button>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.4 }}
              className="fixed left-0 top-0 w-[80%] max-w-[360px] h-full bg-white dark:bg-[#0A0A0A] px-6 pt-4 pb-6 flex flex-col justify-between text-black dark:text-white z-50 shadow-2xl"
            >
              <div>
                <div className="flex justify-between items-center mb-8">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center"
                  >
                    {mounted ? (
                      <>
                        <Image
                          src="/logo/fahimOne.png"
                          alt="AL-FAHIM Logo"
                          width={90}
                          height={32}
                          className={`transition-opacity duration-300 ${
                            theme === "dark" || resolvedTheme === "dark"
                              ? "opacity-0 absolute"
                              : "opacity-100"
                          }`}
                        />
                        <Image
                          src="/logo/fahimTwo.png"
                          alt="AL-FAHIM Logo"
                          width={90}
                          height={32}
                          className={`transition-opacity duration-300 ${
                            theme === "dark" || resolvedTheme === "dark"
                              ? "opacity-100"
                              : "opacity-0 absolute"
                          }`}
                        />
                      </>
                    ) : (
                      <div className="w-[90px] h-[32px] bg-gray-200 dark:bg-gray-800 animate-pulse rounded" />
                    )}
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex flex-col gap-6 text-sm tracking-widest uppercase font-medium">
                  <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>
                    New Arrivals
                  </Link>
                  <Link
                    href="/collections"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Collections
                  </Link>
                  <div className="h-px bg-gray-200 dark:bg-gray-800 my-1" />
                  <Link
                    href="#"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-xs"
                  >
                    <LogIn size={16} strokeWidth={1.5} /> Sign In
                  </Link>
                  <Link
                    href="#"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-xs"
                  >
                    <Package size={16} strokeWidth={1.5} /> Order History
                  </Link>
                  <Link
                    href="#"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-xs"
                  >
                    <Heart size={16} strokeWidth={1.5} /> Wishlist
                  </Link>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-800 pt-6 text-xs text-gray-500 tracking-wider">
                © {new Date().getFullYear()} AL-FAHIM STUDIO.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Side Menu */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4 }}
              className="fixed right-0 top-0 w-[85%] max-w-[420px] h-full bg-white dark:bg-[#0A0A0A] p-6 flex flex-col text-black dark:text-white z-50 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-serif text-xl tracking-widest font-bold uppercase">
                  Shopping Cart
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <ShoppingBag
                  size={48}
                  strokeWidth={1}
                  className="text-gray-300 dark:text-gray-700 mb-4"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 tracking-wider uppercase mb-2">
                  Your cart is empty
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">
                  Looks like you haven't added anything yet.
                </p>

                <Button
                  onClick={() => setIsCartOpen(false)}
                  hoverText="Explore"
                >
                  Continue Shopping
                </Button>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs tracking-widest uppercase text-gray-500">
                    Subtotal
                  </span>
                  <span className="text-sm font-medium">$0.00</span>
                </div>

                <Button
                  className="w-full text-center"
                  hoverText="Proceed"
                  disabled={true}
                >
                  Checkout
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
