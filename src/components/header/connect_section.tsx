/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import SunIcon from "@heroicons/react/24/outline/SunIcon";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import { useEffect, useState } from "react";
import { DEFAULT_IS_LIGHT, useThemeStore } from "~/app_state/theme_mode";
import { CONNECT_OPTIONS } from "../contact/connect_data";
import Link from "next/link";

export default function ConnectSection() {
  const utm = useThemeStore();
  const [isLight, setIsLight] = useState(DEFAULT_IS_LIGHT);

  useEffect(() => {
    setIsLight(utm.themeName === "winter");
  }, [utm]);

  return (
    <div className="flex flex-col items-center gap-2 md:flex-row">
      <label
        onClick={utm.toggleTheme}
        className={`${
          isLight ? "swap-active" : ""
        } swap-rotate swap h-fit w-fit text-neutral-500`}
      >
        <SunIcon className="swap-on h-6 w-6" />
        <MoonIcon className="swap-off h-6 w-6" />
      </label>
      <div className="w-fit items-center gap-3 rounded-xl bg-base-300 px-4 md:flex lg:flex xl:flex">
        <div className="font-semibold tracking-wider">Connect on</div>
        <div className="flex items-center">
          {CONNECT_OPTIONS.map((x) => (
            <Link target="_blank" key={x.url} href={x.url}>
              {x.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
