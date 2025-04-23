import SunIcon from "@heroicons/react/24/outline/SunIcon";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import { useRef } from "react";
import { useThemeTransition } from "~/hooks/useThemeTransition";

export default function ThemeSwitch() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isLight, toggleThemeWithAnimation } = useThemeTransition();
  const handleToggle = async () => {
    await toggleThemeWithAnimation(buttonRef as React.RefObject<HTMLElement>);
  };

  return (
    <div
      data-tip={`Toggle ${isLight ? "dark" : "light"} `}
      className="tooltip tooltip-bottom"
    >
      <button
        ref={buttonRef}
        onClick={handleToggle}
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
