"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProductButton } from "@/components/ui/ProductButton";
import { useCheckout } from "@/hooks/use-checkout";

export default function CheckoutPage() {
  const {
    cart,
    formData,
    loading,
    subtotal,
    shippingFee,
    totalPrice,
    handleInputChange,
    handleSubmit,
  } = useCheckout();

  // 🛍️ EMPTY CART STATE
  if (cart.length === 0) {
    return (
      <div className="relative min-h-[75vh] flex flex-col items-center justify-center text-center px-4 pt-28 bg-white dark:bg-[#0A0A0A] transition-colors duration-500 overflow-hidden">
        {/* Subtle Luxury Dot Grid Background */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,_#000_1px,_transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,_#fff_1px,_transparent_0)] [background-size:24px_24px]" />
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-12 h-px bg-[#C9A961] mb-8"
        />
        
        <span className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-[#C9A961] font-medium block mb-3">
          Your Shopping Bag
        </span>
        
        <h2 className="relative font-serif text-3xl md:text-4xl uppercase tracking-wider mb-4 text-black dark:text-white font-light">
          Your Cart is Empty
        </h2>
        
        <p className="relative text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mb-10 max-w-sm font-light leading-relaxed">
          Discover our latest luxury collection and add timeless pieces to your bag before proceeding.
        </p>
        
        <Link href="/shop" className="relative group">
          <ProductButton 
            hoverText="RETURN TO SHOP" 
            className="px-10 py-4 text-[11px] font-bold uppercase tracking-[0.25em]"
          >
            Return to Shop
          </ProductButton>
        </Link>
      </div>
    );
  }

  // 💳 MAIN CHECKOUT PAGE
  return (
    <div className="relative min-h-screen bg-white dark:bg-[#0A0A0A] text-neutral-900 dark:text-neutral-100 pt-28 pb-24 transition-colors duration-500 overflow-hidden">

      {/* Subtle Luxury Dot Grid Background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,_#000_1px,_transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,_#fff_1px,_transparent_0)] [background-size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-[#C9A961] font-medium block mb-2">
            Encrypted & Secure
          </span>
          <h1 className="font-serif text-3xl md:text-5xl uppercase tracking-wide text-black dark:text-white font-semibold">
            Checkout
          </h1>
          <div className="h-px bg-gradient-to-r from-black/15 via-black/5 to-transparent dark:from-white/15 dark:via-white/5 mt-6" />
        </motion.div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Side: Shipping & Payment Details */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* 1. Contact Information */}
            <div className="space-y-6">
              <h2 className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] flex items-center gap-3 text-black dark:text-white">
                <span className="w-7 h-7 rounded-full border border-[#C9A961]/60 text-[#C9A961] text-[11px] flex items-center justify-center font-serif shrink-0">
                  1
                </span>
                Contact Information
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full border border-black/10 dark:border-white/10 p-3.5 text-xs focus:outline-none focus:border-[#C9A961] dark:focus:border-[#C9A961] bg-transparent transition-all duration-300 placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full border border-black/10 dark:border-white/10 p-3.5 text-xs focus:outline-none focus:border-[#C9A961] dark:focus:border-[#C9A961] bg-transparent transition-all duration-300 placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                    placeholder="Doe"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-black/10 dark:border-white/10 p-3.5 text-xs focus:outline-none focus:border-[#C9A961] dark:focus:border-[#C9A961] bg-transparent transition-all duration-300 placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-black/10 dark:border-white/10 p-3.5 text-xs focus:outline-none focus:border-[#C9A961] dark:focus:border-[#C9A961] bg-transparent transition-all duration-300 placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                    placeholder="+880 1700-000000"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="space-y-6 pt-4 border-t border-black/5 dark:border-white/5">
              <h2 className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] flex items-center gap-3 text-black dark:text-white">
                <span className="w-7 h-7 rounded-full border border-[#C9A961]/60 text-[#C9A961] text-[11px] flex items-center justify-center font-serif shrink-0">
                  2
                </span>
                Shipping Address
              </h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full border border-black/10 dark:border-white/10 p-3.5 text-xs focus:outline-none focus:border-[#C9A961] dark:focus:border-[#C9A961] bg-transparent transition-all duration-300 placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                    placeholder="House number and street name"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 mb-2">
                      City / Town *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full border border-black/10 dark:border-white/10 p-3.5 text-xs focus:outline-none focus:border-[#C9A961] dark:focus:border-[#C9A961] bg-transparent transition-all duration-300 placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                      placeholder="Dhaka"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full border border-black/10 dark:border-white/10 p-3.5 text-xs focus:outline-none focus:border-[#C9A961] dark:focus:border-[#C9A961] bg-transparent transition-all duration-300 placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                      placeholder="1207"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="space-y-6 pt-4 border-t border-black/5 dark:border-white/5">
              <h2 className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] flex items-center gap-3 text-black dark:text-white">
                <span className="w-7 h-7 rounded-full border border-[#C9A961]/60 text-[#C9A961] text-[11px] flex items-center justify-center font-serif shrink-0">
                  3
                </span>
                Payment Method
              </h2>
              
              <div className="space-y-3.5">
                <label className={`flex items-start gap-4 border p-4 cursor-pointer transition-all duration-300 ${formData.paymentMethod === "cod" ? "border-[#C9A961] bg-[#C9A961]/[0.03]" : "border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30"}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleInputChange}
                    className="mt-1 accent-[#C9A961] cursor-pointer"
                  />
                  <div>
                    <span className="font-semibold text-xs uppercase tracking-[0.1em] block text-black dark:text-white mb-0.5">
                      Cash on Delivery
                    </span>
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-light">
                      Pay securely with cash upon receiving your delivery.
                    </span>
                  </div>
                </label>

                <label className={`flex items-start gap-4 border p-4 cursor-pointer transition-all duration-300 ${formData.paymentMethod === "card" ? "border-[#C9A961] bg-[#C9A961]/[0.03]" : "border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30"}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleInputChange}
                    className="mt-1 accent-[#C9A961] cursor-pointer"
                  />
                  <div>
                    <span className="font-semibold text-xs uppercase tracking-[0.1em] block text-black dark:text-white mb-0.5">
                      Online Payment / Cards
                    </span>
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-light">
                      Pay instantly via bKash, Nagad, Visa, or Mastercard.
                    </span>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-5">
            <div className="border border-black/10 dark:border-white/10 p-6 md:p-8 bg-neutral-50/50 dark:bg-[#111]/60 backdrop-blur-md sticky top-28 shadow-sm">
              <h2 className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] mb-6 pb-4 border-b border-black/10 dark:border-white/10 text-black dark:text-white">
                Order Summary
              </h2>

              {/* Cart Items List */}
              <div className="divide-y divide-black/5 dark:divide-white/5 max-h-80 overflow-y-auto mb-6 pr-2 space-y-1 custom-scrollbar">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="py-4 flex gap-4 items-center">
                    <div className="relative w-14 h-18 bg-neutral-200 dark:bg-[#181818] shrink-0 overflow-hidden border border-black/5 dark:border-white/5">
                      <Image
                        src={item.image || "/placeholder.jpg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-serif uppercase tracking-wider truncate text-black dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-[10px] text-neutral-500 tracking-wider uppercase mt-1">
                        Size: {item.size || "N/A"} &nbsp;|&nbsp; Qty: {item.quantity}
                      </p>
                      <p className="text-xs font-semibold mt-1.5 text-black dark:text-white tabular-nums">
                        ৳ {(item.price * item.quantity).toLocaleString("en-BD")} BDT
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div className="space-y-3.5 text-xs border-t border-black/10 dark:border-white/10 pt-5 font-light">
                <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
                  <span className="uppercase tracking-wider text-[11px]">Subtotal</span>
                  <span className="tabular-nums font-normal text-black dark:text-white">
                    ৳ {subtotal.toLocaleString("en-BD")} BDT
                  </span>
                </div>
                <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
                  <span className="uppercase tracking-wider text-[11px]">Shipping Fee</span>
                  <span className="tabular-nums font-normal text-black dark:text-white">
                    ৳ {shippingFee.toLocaleString("en-BD")} BDT
                  </span>
                </div>
                
                <div className="flex justify-between items-center font-normal text-sm border-t border-black/10 dark:border-white/10 pt-4 text-black dark:text-white">
                  <span className="uppercase tracking-[0.15em] font-semibold text-xs">Total</span>
                  <span className="text-[#C9A961] font-semibold text-base tabular-nums">
                    ৳ {totalPrice.toLocaleString("en-BD")} BDT
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <ProductButton
                  type="submit"
                  disabled={loading}
                  hoverText={loading ? "PROCESSING..." : "CONFIRM ORDER"}
                  className="w-full py-4 text-[11px] font-bold uppercase tracking-[0.25em]"
                >
                  {loading ? "PROCESSING..." : "PLACE ORDER"}
                </ProductButton>
              </div>
              
              <p className="text-[10px] text-center text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mt-4">
                Free Returns & Fast Delivery
              </p>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}