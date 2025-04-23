"use client";

import React, { useCallback } from "react";
import { flushSync } from "react-dom";
import { useThemeStore } from "~/app_state/theme_mode";
import type { ThemeName } from "~/app_state/theme_mode";

/**
 * A hook that handles theme toggling with View Transitions API animation
 */
export function useThemeTransition() {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const setThemeName = useThemeStore((state) => state.setThemeName);
  const isLight = useThemeStore((state) => state.isLight);
  const themeName = useThemeStore((state) => state.themeName);

  /**
   * Applies the circular reveal animation from a button element
   * @param buttonRef Reference to the button element
   * @param callback Function to call that updates the theme
   */
  const applyThemeWithTransition = async (
    buttonRef: React.RefObject<HTMLElement>,
    callback: () => void,
  ) => {
    // Check if View Transitions API is supported
    if (!document.startViewTransition) {
      // Fallback for browsers that don't support the API
      callback();
      return;
    }

    try {
      // Get the button's bounding rectangle to determine the origin of the animation
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) {
        callback();
        return;
      }

      // Calculate the center of the button
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Calculate the maximum radius needed to cover the entire screen
      const right = window.innerWidth - rect.left;
      const bottom = window.innerHeight - rect.top;
      const maxRadius = Math.hypot(
        Math.max(rect.left, right),
        Math.max(rect.top, bottom),
      );

      // Start the view transition
      const transition = document.startViewTransition(() => {
        // Use flushSync to ensure state updates happen immediately
        flushSync(() => {
          callback();
        });
      });

      // Wait for the transition to be ready
      await transition.ready;

      // Apply the circular reveal animation
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    } catch (error) {
      console.error("Error during theme transition:", error);
      // Fallback in case of error
      callback();
    }
  };

  // Toggle theme with animation
  const toggleThemeWithAnimation = async (
    buttonRef: React.RefObject<HTMLElement>,
  ) => {
    await applyThemeWithTransition(buttonRef, toggleTheme);
  };

  /**
   * Set theme with animation
   */
  const setThemeNameWithAnimation = useCallback(
    (newTheme: ThemeName, buttonRef: React.RefObject<HTMLElement>) => {
      applyThemeWithTransition(buttonRef, () => setThemeName(newTheme));
    },
    [setThemeName],
  );

  /**
   * Run any callback with theme transition animation
   * This gives you full control over what happens during the transition
   * @param buttonRef Reference to the button element that triggers the animation
   * @param customCallback Your custom function to run during the animation
   */
  const runWithThemeTransition = useCallback(
    async (
      buttonRef: React.RefObject<HTMLElement>,
      customCallback: () => void,
    ) => {
      await applyThemeWithTransition(buttonRef, customCallback);
    },
    [],
  );

  return {
    isLight,
    themeName,
    toggleThemeWithAnimation,
    setThemeNameWithAnimation,
    runWithThemeTransition,
  };
}
