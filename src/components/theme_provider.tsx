"use client";

import { useEffect } from "react";
import { useThemeStore } from "~/app_state/theme_mode";

export default function ThemeProvider() {
  const { themeName } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeName);
  }, [themeName]);
  return <></>;
}
