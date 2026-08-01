"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "./Loader";

export default function RouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black">
      <Loader />
    </div>
  );
}