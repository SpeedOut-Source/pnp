import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";

export const DEFAULT_THEME: ThemeName = "dark";

type ThemeName = "winter" | "dark";

interface ThemeModeModel {
  themeName: ThemeName;
  setThemeName: (themeName: ThemeName) => void;
  toggleTheme: () => void;
  isLight: boolean;
}

export const useThemeStore = create<ThemeModeModel>()(
  subscribeWithSelector(
    devtools(
      persist(
        (set) => ({
          themeName: DEFAULT_THEME,
          isLight: false,
          setThemeName: (themeName) =>
            set({ themeName, isLight: themeName === "winter" }),
          toggleTheme: () =>
            set((state) => {
              const newTheme = state.themeName === "winter" ? "dark" : "winter";
              return { themeName: newTheme, isLight: newTheme === "winter" };
            }),
        }),
        {
          name: "theme-storage-state",
        },
      ),
    ),
  ),
);
