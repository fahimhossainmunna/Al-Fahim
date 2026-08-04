"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  RiArrowRightUpLine,
  RiArrowLeftLine,
  RiCheckLine,
  RiEyeLine,
  RiEyeOffLine,
  RiLockPasswordLine,
  RiMailLine,
  RiUserLine,
  RiLoader4Line,
  RiShieldCheckLine,
} from "react-icons/ri";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative space-y-1.5">
      <label className="text-[9px] uppercase font-sans font-medium tracking-[0.22em] text-neutral-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors block">
        {label}
      </label>
      <div className="relative flex items-center border-b border-black/15 dark:border-white/15 pb-2">
        {children}
        <span className="pointer-events-none absolute left-0 -bottom-px h-px w-0 bg-black dark:bg-white transition-all duration-300 group-focus-within:w-full" />
        <span className="text-neutral-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors text-sm shrink-0">
          {icon}
        </span>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Registration integration logic
    setTimeout(() => setIsSubmitting(false), 1200);
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-black text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">

      {/* Left — brand panel */}
      <div className="hidden lg:flex lg:w-[42%] relative bg-black text-white flex-col justify-between px-14 py-14 overflow-hidden border-r border-white/10">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
          <span className="font-serif text-[24vw] font-light opacity-[0.05] leading-none">
            AF
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <Link href="/" className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-neutral-400 hover:text-white transition-colors">
            <RiArrowLeftLine className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 space-y-5"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 block">
            Exclusive Membership
          </span>
          <p className="font-serif text-3xl leading-[1.3] max-w-sm font-light">
            Join AL-FAHIM for private previews and tailored client services.
          </p>
          <div className="w-10 h-px bg-white/20" />
          <p className="text-[11px] text-neutral-500 leading-relaxed max-w-xs">
            Membership applications are reviewed and verified before account
            activation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="relative z-10 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-neutral-500"
        >
          <RiShieldCheckLine className="w-3.5 h-3.5" />
          Est. Artisan Leather — Dhaka
        </motion.div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-20 sm:py-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full max-w-sm space-y-10"
        >
          <Link
            href="/"
            className="lg:hidden group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-neutral-400 hover:text-black dark:hover:text-white transition-colors mb-2"
          >
            <RiArrowLeftLine className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <motion.div variants={item} className="space-y-3">
            <span className="lg:hidden text-[9px] uppercase tracking-[0.5em] text-neutral-400 block">
              Exclusive Membership
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif tracking-tight uppercase font-light">
              Create Account
            </h1>
            <p className="text-[13px] text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xs">
              Register for private bespoke previews and tailored experiences.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">

              <motion.div variants={item}>
                <Field label="Full Name" icon={<RiUserLine />}>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Fahim Hossain"
                    className="w-full bg-transparent py-1.5 text-[13px] text-black dark:text-white placeholder:text-neutral-300 dark:placeholder:text-neutral-700 focus:outline-none pr-3"
                  />
                </Field>
              </motion.div>

              <motion.div variants={item}>
                <Field label="Email Address" icon={<RiMailLine />}>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="client@al-fahim.com"
                    className="w-full bg-transparent py-1.5 text-[13px] text-black dark:text-white placeholder:text-neutral-300 dark:placeholder:text-neutral-700 focus:outline-none pr-3"
                  />
                </Field>
              </motion.div>

              <motion.div variants={item}>
                <Field label="Password" icon={<RiLockPasswordLine />}>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••••••"
                    className="w-full bg-transparent py-1.5 text-[13px] tracking-widest text-black dark:text-white placeholder:text-neutral-300 dark:placeholder:text-neutral-700 focus:outline-none pr-3"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="relative w-4 h-4 mr-2.5 text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-sm focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={showPassword ? "off" : "on"}
                        initial={{ opacity: 0, rotate: -8 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                      </motion.span>
                    </AnimatePresence>
                  </button>
                </Field>
              </motion.div>

              {/* Terms Checkbox */}
              <motion.div variants={item} className="flex items-start gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, acceptTerms: !formData.acceptTerms })}
                  className={`relative w-4 h-4 mt-0.5 border flex items-center justify-center transition-colors shrink-0 ${
                    formData.acceptTerms
                      ? "bg-black border-black dark:bg-white dark:border-white"
                      : "border-black/30 dark:border-white/30"
                  }`}
                >
                  <AnimatePresence>
                    {formData.acceptTerms && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="text-white dark:text-black"
                      >
                        <RiCheckLine className="text-xs" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                <span className="text-[11px] text-neutral-500 leading-snug">
                  I agree to the{" "}
                  <Link href="/terms" className="underline font-sans text-black dark:text-white">
                    Terms of Service
                  </Link>{" "}
                  and acknowledge the privacy policy.
                </span>
              </motion.div>

            </div>

            {/* Submit Button */}
            <motion.div variants={item} className="space-y-4">
              <motion.button
                whileHover={{ scale: formData.acceptTerms ? 1.01 : 1 }}
                whileTap={{ scale: formData.acceptTerms ? 0.99 : 1 }}
                type="submit"
                disabled={isSubmitting || !formData.acceptTerms}
                className="group relative w-full py-4 border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black text-[10px] font-sans font-semibold uppercase tracking-[0.3em] transition-colors duration-300 hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white disabled:opacity-40 disabled:hover:bg-black disabled:hover:text-white dark:disabled:hover:bg-white dark:disabled:hover:text-black"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="flex"
                      >
                        <RiLoader4Line className="text-sm" />
                      </motion.span>
                      Creating Profile
                    </>
                  ) : (
                    <>
                      Complete Membership
                      <RiArrowRightUpLine className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </span>
              </motion.button>
              <p className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400">
                <RiShieldCheckLine className="w-3.5 h-3.5" />
                Encrypted connection
              </p>
            </motion.div>
          </form>

          {/* Footer Navigation */}
          <motion.div
            variants={item}
            className="text-center pt-6 border-t border-black/10 dark:border-white/10 space-y-2"
          >
            <p className="text-[13px] text-neutral-500">
              Already registered?
            </p>
            <Link
              href="/login"
              className="inline-block font-sans text-[10px] uppercase tracking-[0.2em] font-semibold text-black dark:text-white border-b border-black dark:border-white pb-0.5 hover:opacity-70 transition-opacity"
            >
              Sign In to Account
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}