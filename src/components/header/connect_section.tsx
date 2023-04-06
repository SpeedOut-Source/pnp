import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useThemeStore } from "~/app_state/theme_mode";

const ConnectButton = dynamic(() => import("./connect_button"));

export default function ConnectSection() {
  const utm = useThemeStore();
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    setIsLight(utm.themeName === "winter");
  }, [utm]);

  return (
    <div className="flex flex-col items-center gap-2 md:flex-row">
      <label className="swap-rotate swap h-fit w-fit text-neutral-500">
        <input type="checkbox" defaultChecked={isLight} />
        <span
          className={`${isLight ? "z-50" : ""} swap-on tooltip tooltip-bottom`}
          data-tip="Switch Dark"
        >
          <SunIcon onClick={utm.toggleTheme} className="h-6 w-6" />
        </span>
        <span
          className="swap-off tooltip tooltip-bottom"
          data-tip="Switch Light"
        >
          <MoonIcon onClick={utm.toggleTheme} className="h-6 w-6" />
        </span>
      </label>
      <div className="w-fit items-center gap-3 rounded-xl bg-base-300 px-4 md:flex lg:flex xl:flex">
        <div className="font-semibold tracking-wider">Connect on</div>
        <div className="flex items-center">
          <ConnectButton text="Github" url="https://github.com/biplobsd" />
          <ConnectButton
            text="Linkedin"
            url="https://www.linkedin.com/in/biplob-sutradhar/"
          />
          <ConnectButton text="Twitter" url="https://twitter.com/_biplobsd" />
          <ConnectButton text="Gmail" url="mailto:biplobsd11@gamil.com" />
        </div>
      </div>
    </div>
  );
}
