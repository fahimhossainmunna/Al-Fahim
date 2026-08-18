<div align="center">

  <img src="public/logo/fahimOne.png" width="120" alt="AL-FAHIM Logo"/>

  # AL-FAHIM
  ### Haute Couture & Luxury Fashion Atelier

  [![Next.js](https://img.shields.io/badge/Next.js%2015-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript%205-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS%203-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

  <p align="center">
    <strong>A modern, minimalist, and editorial e-commerce atelier platform built for a luxury fashion house.</strong>
  </p>

  <p align="center">
    <a href="#-key-features">Key Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-project-architecture">Architecture</a> •
    <a href="#-getting-started">Getting Started</a>
  </p>

</div>

---

## ✨ Overview

**AL-FAHIM** is an ultra-minimalist, editorial fashion e-commerce application. Engineered with **Next.js (App Router)** and **TypeScript**, the platform embraces precision tailoring, monochromatic aesthetics, micro-interactions, and a cohesive haute couture shopping experience.

---

## 🌟 Key Features

| Category | Highlights & Capabilities |
| :--- | :--- |
| **🎨 Luxury Visual Identity** | High-end monochrome styling, editorial typography pairing (`Cormorant Garamond` serif & sans-serif), responsive light/dark balance. |
| **🔐 Client Authentication** | Dedicated `(auth)` group route featuring private Client Portal Login & Registration, interactive **Password Visibility Toggles**, and verified Terms check. |
| **👜 Client Atelier** | Comprehensive **Order History** dashboard with itemized receipts and status tags; curated **Wishlist** with live availability indicators. |
| **⚡ Dynamic Content (`/[slug]`)** | Scalable dynamic routing engine powering **Craftsmanship**, **Sustainability**, **The Journal**, **Contact**, **Shipping**, **Care Guide**, and **FAQs**. |
| **🖤 Interactive Footer** | Minimalist icon-only social actions, animated Framer Motion newsletter alerts, and edge-to-edge full-width statement typography. |
| **🧭 Circular Scroll-To-Top** | Real-time SVG circular scroll progress indicator integrated with the central brand emblem. |

---

## 🛠️ Tech Stack

<div align="left">

* **Core Framework:** `Next.js 15` (App Router)
* **Language:** `TypeScript`
* **Styling & Theme:** `Tailwind CSS` (Monochrome & Dark Mode Support)
* **Micro-Animations:** `Framer Motion`
* **Iconography:** `React Icons` (`react-icons/ri`)

</div>

---

## 📁 Project Architecture

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx          # Client Sign In Portal
│   │   └── register/
│   │       └── page.tsx          # Bespoke Membership Registration
│   ├── [slug]/
│   │   └── page.tsx              # Centralized Dynamic Content Engine
│   ├── order-history/
│   │   └── page.tsx              # Order History & Tracking Dashboard
│   ├── wishlist/
│   │   └── page.tsx              # Saved Wardrobe Selection
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Footer.tsx                # Editorial Footer & Newsletter Modal
│   └── ScrollToTop.tsx           # Circular Scroll Progress Component
├── data/
│   └── footer-data.ts
└── public/
    └── logo/
        ├── fahimOne.png
        └── fahimTwo.png
