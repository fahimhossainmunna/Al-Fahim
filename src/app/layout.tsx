import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer"; 
import { Providers } from "./providers";
import RouteLoader from "@/components/common/RouteLoader";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/common/ScrollToTop";

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
        className={`${inter.variable} ${cormorant.variable} antialiased font-sans bg-[#FCFCFC] text-black dark:bg-[#0A0A0A] dark:text-white transition-colors duration-300 m-0 p-0 min-h-screen flex flex-col justify-between`}
      >
        <Providers>
          <RouteLoader />
          <Navbar />
          
          <main className="flex-1">{children}</main>

          {/* 👈 Footer component যুক্ত করা হয়েছে */}
          <Footer />

          {/* Top-Center Positioned Hot Toast Container */}
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 2500,
              style: {
                background: "#000000",
                color: "#ffffff",
                border: "1px solid #262626",
                borderRadius: "9999px",
                padding: "10px 20px",
                fontSize: "12px",
                letterSpacing: "0.05em",
                fontWeight: "600",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
              },
            }}
          />
        </Providers>
        <ScrollToTop/>
      </body>
    </html>
  );
}