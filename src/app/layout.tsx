import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import { Providers } from "./providers";
import RouteLoader from "@/components/common/RouteLoader"; // 👈 ১. ইমপোর্ট করুন

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "AL-FAHIM | Luxury Clothing Brand",
  description: "Premium and elegant clothing store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased font-sans bg-[#FCFCFC] text-black dark:bg-[#0A0A0A] dark:text-white transition-colors duration-300 m-0 p-0`}
      >
        <Providers>
          {/* 👈 ২. এখানে RouteLoader বসিয়ে দিন */}
          <RouteLoader />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}