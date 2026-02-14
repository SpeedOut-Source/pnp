"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export const NotFoundRedirect = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!pathname) return;

    let newPath = pathname;
    let shouldRedirect = false;

    if (newPath.endsWith(".md")) {
      newPath = newPath.slice(0, -3);
      shouldRedirect = true;
    }

    if (newPath.includes("/view/")) {
      newPath = newPath.replace("/view/", "/");
      shouldRedirect = true;
    }

    if (shouldRedirect) {
      router.replace(newPath);
    }
  }, [pathname, router]);

  return null;
};
