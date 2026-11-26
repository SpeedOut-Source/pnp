"use client";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export default function ThumTime({ date }: { date: number }) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

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
