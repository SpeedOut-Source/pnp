"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * React Hook to get the scroll percentage from the page, returns value from 0 to 100
 */
export function useReadingProgress() {
  const [completion, setCompletion] = useState(0);
  const pathname = usePathname(); // Using usePathname from the App Router

  useEffect(() => {
    function updateScrollCompletion() {
      // see how much we have scrolled
      const currentProgress = window.scrollY;
      // see how much total scroll is available
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setCompletion(
          Number((currentProgress / scrollHeight).toFixed(2)) * 100,
        );
      }
    }

    // Reset completion when the pathname changes
    function handleRouteChange() {
      setCompletion(0); // Reset completion when the route changes
    }

    // Add scroll event listener
    window.addEventListener("scroll", updateScrollCompletion);

    // Watch for pathname changes (similar to routeChangeStart)
    handleRouteChange(); // Call immediately on mount to reset progress

    // Reset completion on pathname change
    return () => {
      window.removeEventListener("scroll", updateScrollCompletion);
    };
  }, [pathname]); // Effect depends on pathname changes

  return completion;
}
