"use client";

import clsx from "clsx";
import React, { type ReactNode } from "react";
import { useScrollDirection } from "react-scroll-hook";

interface LRWrapProps {
  children: ReactNode;
}

function LRWrap({ children }: LRWrapProps) {
  const scrollDirection = useScrollDirection();

  return (
    <div
      className={clsx(
        "sticky hidden flex-1 xl:inline",
        "transition-all duration-500 ease-in-out",
        scrollDirection === "up" ? "top-20" : "top-5",
      )}
    >
      {children}
    </div>
  );
}

export default LRWrap;
