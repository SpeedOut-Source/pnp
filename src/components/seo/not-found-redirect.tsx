"use client";

import { useLayoutEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const NotFoundRedirect = () => {
  const pathname = usePathname();
  const router = useRouter();

  useLayoutEffect(() => {
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

    if (newPath.endsWith("/view")) {
      newPath = newPath.slice(0, -5);
      shouldRedirect = true;
    } else if (newPath.endsWith("/view/")) {
      newPath = newPath.slice(0, -6);
      shouldRedirect = true;
    }

    if (shouldRedirect) {
      router.replace(newPath);
      toast.success(`Redirecting to ${newPath}`);
    }
  }, [pathname, router]);

  return null;
};
