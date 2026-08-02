"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    let observer;
    
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (!element) return;

      // Scroll immediately
      element.scrollIntoView({ behavior: "smooth" });

      // Track height changes on body to adjust scroll position as dynamic content loads
      let lastOffsetTop = element.offsetTop;
      
      if (observer) observer.disconnect();
      
      observer = new ResizeObserver(() => {
        const currentElement = document.getElementById(id);
        if (currentElement && currentElement.offsetTop !== lastOffsetTop) {
          lastOffsetTop = currentElement.offsetTop;
          currentElement.scrollIntoView({ behavior: "smooth" });
        }
      });
      
      observer.observe(document.body);
      
      // Auto-disconnect observer after 3 seconds to avoid fighting user scrolls later
      setTimeout(() => {
        if (observer) {
          observer.disconnect();
        }
      }, 3000);
    };

    // Run on path change (e.g. navigating from /blog to /)
    // Wait a brief moment for the DOM to mount
    const timer = setTimeout(scrollToHash, 150);

    // Also handle hash changes on the same page
    window.addEventListener("hashchange", scrollToHash);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", scrollToHash);
      if (observer) observer.disconnect();
    };
  }, [pathname]);

  return null;
}
