import SunIcon from "@heroicons/react/24/outline/SunIcon";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import { DEFAULT_IS_LIGHT, useThemeStore } from "~/app_state/theme_mode";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const utm = useThemeStore();
  const [isLight, setIsLight] = useState(DEFAULT_IS_LIGHT);

  useEffect(() => {
    setIsLight(utm.themeName === "winter");
  }, [utm]);

  return (
    <div
      data-tip={`Toggle ${isLight ? "dark" : "light"} `}
      className="tooltip tooltip-bottom"
    >
      <button
        onClick={utm.toggleTheme}
        className={`${
          isLight ? "swap-active" : ""
        } swap-rotate swap btn-ghost btn-circle btn`}
      >
        <SunIcon className="swap-on h-6 w-6" />
        <MoonIcon className="swap-off h-6 w-6" />
      </button>
    </div>
  );
}
