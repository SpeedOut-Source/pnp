import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";

type ThemeName = "winter" | "dark";

interface ThemeModeModel {
  themeName: ThemeName;
  setThemeName: (themeName: ThemeName) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create(
  subscribeWithSelector(
    devtools(
      persist<ThemeModeModel>(
        (set, get) => ({
          themeName: "winter",
          setThemeName: (themeName) => set({ themeName }),
          toggleTheme: () => {
            const currentTheme = get().themeName;
            const newTheme = currentTheme === "winter" ? "dark" : "winter";
            set({ themeName: newTheme });
          },
        }),
        {
          name: "theme-storage-state",
        }
      )
    )
  )
);
