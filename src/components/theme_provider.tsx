"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useThemeStore } from "~/app_state/theme_mode";

export default function ThemeProvider() {
  const { themeName } = useThemeStore();
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(themeName);
  }, [setTheme, themeName]);
  return <></>;
}
