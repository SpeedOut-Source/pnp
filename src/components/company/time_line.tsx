"use client";

export default function TimeLine({
  start,
  end,
}: {
  start: number;
  end: number;
}) {
  return (
    <span className="text-xs">
      {new Date(start).toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      })}
      {" - "}
      {end > 0
        ? new Date(end).toLocaleString("en-US", {
            month: "short",
            year: "numeric",
          })
        : "Present"}{" "}
    </span>
  );
}
