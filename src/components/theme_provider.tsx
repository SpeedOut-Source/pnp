import React from "react";
import { useEffect } from "react";
import { useThemeStore } from "~/app_state/theme_mode";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { themeName } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeName);
  }, [themeName]);

  return <>{children}</>;
};

export default ThemeProvider;
