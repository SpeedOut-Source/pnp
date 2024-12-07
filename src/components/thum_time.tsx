"use client";

export default function ThumTime({ date }: { date: number }) {
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
