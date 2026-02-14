"use client";
import { useEffect, useState } from "react";

export default function ThumTime({ date }: { date: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-5 w-20 animate-pulse rounded bg-slate-200/50"></div>
    );
  }

  return (
    <div>
      {new Date(date).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}
    </div>
  );
}
