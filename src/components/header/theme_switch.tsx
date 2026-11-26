import SunIcon from "@heroicons/react/24/outline/SunIcon";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import { useRef, useState } from "react";
import { useThemeTransition } from "~/hooks/useThemeTransition";
import { delay } from "../sapage/src/components/app/helper";

export default function ThemeSwitch() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isLight, toggleThemeWithAnimation } = useThemeTransition();
  const [pendingIsLight, setPendingIsLight] = useState<boolean | null>(null);
  const isLightLocal = pendingIsLight ?? isLight;

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
        onClick={async () => {
          setPendingIsLight(!isLight);
          await delay(130);
          try {
            await handleToggle();
          } finally {
            setPendingIsLight(null);
          }
        }}
        className={`${
          isLightLocal ? "swap-active" : ""
        } btn btn-circle btn-ghost swap swap-rotate`}
      >
        <SunIcon className="swap-on h-6 w-6" />
        <MoonIcon className="swap-off h-6 w-6" />
      </button>
    </div>
  );
}
