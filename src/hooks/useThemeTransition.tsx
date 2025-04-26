"use client";

import React from "react";
import { flushSync } from "react-dom";
import { useThemeStore } from "~/app_state/theme_mode";

/**
 * A hook that handles theme toggling with View Transitions API animation
 */
export function useThemeTransition() {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const isLight = useThemeStore((state) => state.isLight);
  const themeName = useThemeStore((state) => state.themeName);

  const toggleThemeWithAnimation = async (
    buttonRef: React.RefObject<HTMLElement>
  ) => {
    if (!document.startViewTransition || !buttonRef.current) {
      toggleTheme();
      return;
    }

    try {
      const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;

      const transition = document.startViewTransition(() => {
        flushSync(() => toggleTheme());
      });

      await transition.ready;

      const zNew = isLight ? "998" : "999";
      const zOld = isLight ? "999" : "998";

      document.documentElement.style.setProperty("--transition-z-index-new", zNew);
      document.documentElement.style.setProperty("--transition-z-index-old", zOld);

      const steps = 500;
      const keyframes: Keyframe[] = Array.from({ length: steps + 1 }, (_, i) => {
        const p = i / steps;
        const eased = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
        const sinP = Math.sin(p * Math.PI);
        const edge = eased * 100;

        const stops = [
          `white 0%`,
          `white ${edge}%`,
          `transparent ${edge + 15}%`,
        ];

        return {
          maskImage: `radial-gradient(circle at ${x}px ${y}px, ${stops.join(", ")})`,
          backdropFilter: `blur(${sinP * 2}px)`,
          filter: `hue-rotate(${p * 360}deg)`,
          transform: `scale(${1 + sinP * 0.02})`,
          easing: "ease-in-out"
        };
      });

      document.documentElement.animate(keyframes, {
        duration: 800,
        easing: "cubic-bezier(0.22, 0.84, 0.32, 0.95)",
        pseudoElement: isLight
          ? "::view-transition-old(root)"
          : "::view-transition-new(root)",
        direction: isLight ? "reverse" : "normal",
        fill: "forwards",
      });
    } catch (error) {
      console.error("Error during theme transition:", error);
      toggleTheme();
    }
  };

  return {
    isLight,
    themeName,
    toggleThemeWithAnimation,
  };
}
