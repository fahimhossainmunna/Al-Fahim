<div align="center">

# AL-FAHIM — Haute Couture & Luxury Fashion E-Commerce

A modern, minimalist, and editorial e-commerce platform built for a luxury fashion house. Engineered with high performance, precision tailoring, and timeless aesthetic excellence.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-FF0055?style=flat-square&logo=framer)](https://www.framer.com/motion/)

</div>

---

## 🌟 Key Features

* **Monochrome Luxury Aesthetic**: Clean, high-end editorial UI featuring balanced typography (Cormorant Garamond serif paired with clean sans-serif) and pure monochrome contrast.
* **Modern Authentication Flow**: Elegant, accessible Client Portal for Sign In and Account Creation with interactive password visibility toggles and terms verification.
* **Client Atelier Interfaces**:
  * **Order History**: Comprehensive purchase overview, delivery milestones, item specifics, and invoice access.
  * **Wishlist**: Real-time curation with stock status indicators and single-click cart management.
* **Dynamic Route Architecture**: Centralized dynamic routing via `src/app/[slug]/page.tsx` for brand content (Craftsmanship, Sustainability, Journal, Shipping & Returns, Care Guide, FAQs, Contact).
* **Interactive Luxury Footer**: Custom circle-icon social actions, smooth newsletter toast notifications using Framer Motion, and edge-to-edge branding.
* **Branded Circular Scroll-To-Top**: Interactive SVG scroll progress indicator featuring the brand emblem and hover micro-animations.

---

## 🛠️ Tech Stack

* **Core Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** [React Icons](https://react-icons.github.io/react-icons/) (`react-icons/ri`)

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── [slug]/
│   │   └── page.tsx          # Dynamic brand & support routes
│   ├── order-history/
│   │   └── page.tsx          # Client order management
│   ├── wishlist/
│   │   └── page.tsx          # Saved items & curation
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Footer.tsx
│   └── ScrollToTop.tsx
├── data/
│   └── footer-data.ts
└── public/
    └── logo/
        ├── fahimOne.png
        └── fahimTwo.png


🚀 Getting Started
Prerequisites
Ensure you have Node.js 18+ installed on your system.

Installation
Clone the repository:

Bash
git clone [https://github.com/fahimhossainmunna/Al-Fahim.git](https://github.com/fahimhossainmunna/Al-Fahim.git)
cd Al-Fahim
Install project dependencies:

Bash
npm install
Start the local development server:

Bash
npm run dev
Launch Application:
Open http://localhost:3000 in your browser.

🛠️ Available Scripts
npm run dev — Starts the Next.js development server with Turbopack.

npm run build — Compiles and builds the production application.

npm run start — Boots the production server.

npm run lint — Runs ESLint checks for code consistency.

📄 License
This project is open source and available under the MIT License.
