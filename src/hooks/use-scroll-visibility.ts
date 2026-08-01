import { useState, useEffect } from "react";

export function useScrollVisibility() {
  const [showBanner, setShowBanner] = useState(true);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      
      // First 50px: Hide banner only
      if (currentScrollY > 50 && currentScrollY <= 150) {
        if (scrollDirection === 'down') {
          setShowBanner(false);
        }
      }
      
      // After 150px: Hide navbar too
      if (currentScrollY > 150) {
        if (scrollDirection === 'down') {
          setShowNavbar(false);
        } else if (scrollDirection === 'up') {
          setShowNavbar(true);
        }
      }
      
      // Back to top: Show everything
      if (currentScrollY < 50) {
        setShowBanner(true);
        setShowNavbar(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return { showBanner, showNavbar };
}