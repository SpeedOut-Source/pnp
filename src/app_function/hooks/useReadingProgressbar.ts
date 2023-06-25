import { useEffect, useState } from "react";
import { useRouter } from "next/router";

/**
 * React Hook to get the scroll percentage from the page, returns value from 0 to 100
 */
export function useReadingProgress() {
  const [completion, setCompletion] = useState(0);
  const router = useRouter();

  useEffect(() => {
    function updateScrollCompletion() {
      // see how much we have scrolled
      const currentProgress = window.scrollY;
      // see how much total scroll is available
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    }

    function handleRouteChange() {
      setCompletion(0); // Reset completion when the route changes
    }

    // Add scroll and route change event listeners
    window.addEventListener("scroll", updateScrollCompletion);
    router.events.on("routeChangeStart", handleRouteChange);

    // Remove event listeners on unmount
    return () => {
      window.removeEventListener("scroll", updateScrollCompletion);
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  return completion;
}
