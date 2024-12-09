import SunIcon from "@heroicons/react/24/outline/SunIcon";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import { useThemeStore } from "~/app_state/theme_mode";

export default function ThemeSwitch() {
  const { isLight, toggleTheme } = useThemeStore();

  return (
    <div
      data-tip={`Toggle ${isLight ? "dark" : "light"} `}
      className="tooltip tooltip-bottom"
    >
      <button
        onClick={toggleTheme}
        className={`${
          isLight ? "swap-active" : ""
        } btn btn-circle btn-ghost swap swap-rotate`}
      >
        <SunIcon className="swap-on h-6 w-6" />
        <MoonIcon className="swap-off h-6 w-6" />
      </button>
    </div>
  );
}
