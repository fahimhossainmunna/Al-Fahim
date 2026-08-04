"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  RiInstagramLine, 
  RiPinterestLine, 
  RiYoutubeLine, 
  RiFacebookFill,
  RiSendPlane2Line, 
  RiShieldCheckLine, 
  RiFileTextLine 
} from "react-icons/ri";
import { footerSections } from "@/data/footer-data";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert("Thank you for joining AL-FAHIM.");
      setEmail("");
    }
  };

  const socialLinksWithIcons = [
    { label: "Instagram", href: "#", icon: RiInstagramLine },
    { label: "Facebook", href: "#", icon: RiFacebookFill },
    { label: "Pinterest", href: "#", icon: RiPinterestLine },
    { label: "YouTube", href: "#", icon: RiYoutubeLine },
  ];

  return (
    <footer className="border-t border-black/10 dark:border-white/10 bg-white dark:bg-black text-black dark:text-white transition-colors pt-20 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
        
        {/* 1. Main Header & Editorial Statement */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-black/10 dark:border-white/10">
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400 font-medium block font-sans">
              HAUTE COUTURE & LUXURY
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif font-normal tracking-tight uppercase leading-none">
              AL-FAHIM
            </h2>
          </div>
          
          <p className="text-sm font-serif italic text-neutral-600 dark:text-neutral-400 max-w-sm font-light leading-relaxed tracking-wide">
            Defined by uncompromising quality, precision tailoring, and timeless aesthetic excellence.
          </p>
        </div>

        {/* 2. Links & Newsletter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-4">
          
          {/* Navigation Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-5">
                <h4 className="text-[11px] uppercase tracking-[0.3em] text-black dark:text-white font-semibold font-sans">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm font-serif text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors tracking-wide block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social Icons & Newsletter Column */}
          <div className="lg:col-span-5 space-y-10 lg:pl-8 lg:border-l lg:border-black/10 lg:dark:border-white/10">
            
            {/* Connect - Icon Only Buttons */}
            <div className="space-y-4">
              <h4 className="text-[11px] uppercase tracking-[0.3em] text-black dark:text-white font-semibold font-sans">
                Connect
              </h4>
              <div className="flex items-center gap-3">
                {socialLinksWithIcons.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full border border-black/15 dark:border-white/15 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-all duration-300 bg-transparent hover:scale-105"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Newsletter Input */}
            <div className="space-y-4">
              <h4 className="text-[11px] uppercase tracking-[0.3em] text-black dark:text-white font-semibold font-sans">
                Newsletter
              </h4>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative flex items-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full bg-transparent border-b border-black/20 dark:border-white/20 pb-2.5 text-sm font-serif italic tracking-wide placeholder:text-neutral-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors pr-10"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-0 bottom-2 text-black dark:text-white hover:opacity-60 transition-opacity p-1"
                  >
                    <RiSendPlane2Line className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs font-serif italic text-neutral-400 leading-relaxed">
                  Receive private invitations to new collections & exclusive releases.
                </p>
              </form>
            </div>

          </div>

        </div>

      </div>

      {/* 3. Full-Width Giant Branding Banner (Edge-to-Edge) */}
      <div className="w-full border-t border-black/10 dark:border-white/10 select-none text-center pt-2 -mb-2 leading-none overflow-hidden">
        <h1 className="text-[15.5vw] font-black tracking-tighter leading-none uppercase text-black dark:text-white font-sans opacity-95 w-full whitespace-nowrap">
          AL-FAHIM.
        </h1>
      </div>

      {/* 4. Bottom Legal Links Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans text-neutral-500 dark:text-neutral-400 tracking-widest uppercase">
          <p>© {new Date().getFullYear()} AL-FAHIM. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link 
              href="/privacy" 
              className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1.5"
            >
              <RiShieldCheckLine className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </Link>
            <Link 
              href="/terms" 
              className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1.5"
            >
              <RiFileTextLine className="w-3.5 h-3.5" />
              <span>Terms of Service</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}