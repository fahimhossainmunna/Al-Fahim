# 🏛️ AL-FAHIM — Haute Couture & Luxury Fashion E-Commerce

A modern, minimalist, and editorial e-commerce platform built for a luxury fashion house. Engineered with Next.js (App Router), TypeScript, and Tailwind CSS, focusing on precision tailoring, clean monochrome aesthetics, and seamless user experiences.

---

## 🌟 Key Features

* **Monochrome Luxury Aesthetic**: Editorial UI with balanced typography (Cormorant Garamond serif and clean sans-serif) and pure dark/light mode support.
* **Authentication Suite**:
  * Clean, minimal Sign In & Registration forms located in `(auth)`.
  * Interactive **Show / Hide Password** toggles.
  * Terms & conditions verification.
* **Client Atelier (User Dashboard)**:
  * **Order History (`/order-history`)**: View detailed purchase milestones, invoice summaries, and order statuses.
  * **Wishlist (`/wishlist`)**: Curate saved products with stock-level tracking and direct bag additions.
* **Dynamic Route Architecture (`/[slug]`)**:
  * Single-file dynamic route handling for static brand and client care pages.
  * Covers **Craftsmanship**, **Sustainability**, **The Journal**, **Contact Us**, **Shipping & Returns**, **Care Guide**, and **FAQs**.
* **Interactive Luxury Footer**:
  * Custom icon-only social actions.
  * Animated newsletter subscription toast notifications powered by Framer Motion.
  * Edge-to-edge full-bleed brand typography banner (`AL-FAHIM.`).
* **Circular Scroll-To-Top**:
  * Real-time SVG circular scroll progress indicator with the brand's emblem and hover animations.

---

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Icons:** React Icons (`react-icons/ri`)

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx          # Client Sign In
│   │   └── register/
│   │       └── page.tsx          # Account Registration
│   ├── [slug]/
│   │   └── page.tsx              # Dynamic Handler (FAQs, Shipping, etc.)
│   ├── order-history/
│   │   └── page.tsx              # Order History & Tracking
│   ├── wishlist/
│   │   └── page.tsx              # Saved Items & Bag Actions
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Footer.tsx                # Luxury Footer & Newsletter Toast
│   └── ScrollToTop.tsx           # Circular Progress Scroll Button
├── data/
│   └── footer-data.ts
└── public/
    └── logo/
        ├── fahimOne.png
        └── fahimTwo.png
