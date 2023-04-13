/* eslint-disable @typescript-eslint/no-misused-promises */
import SunIcon from "@heroicons/react/24/outline/SunIcon";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import { useEffect, useState } from "react";
import { DEFAULT_IS_LIGHT, useThemeStore } from "~/app_state/theme_mode";
import { CONNECT_OPTIONS } from "../contact/connect_data";
import Link from "next/link";
import { delay } from "../sapage/src/components/app/helper";

export default function ConnectSection() {
  const utm = useThemeStore();
  const [isLight, setIsLight] = useState(DEFAULT_IS_LIGHT);
  const [isHideTooltip, setIsHideTooltip] = useState(false);

  useEffect(() => {
    setIsLight(utm.themeName === "winter");
  }, [utm]);

  async function toggleTheme(e: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    e.preventDefault();
    setIsHideTooltip(true);
    await delay(400);
    utm.toggleTheme();
    await delay(400);
    setIsHideTooltip(false);
  }

  return (
    <div className="flex flex-col items-center gap-2 md:flex-row">
      <label className="swap-rotate swap h-fit w-fit text-neutral-500">
        <input type="checkbox" defaultChecked={isLight} />
        <span
          className={`${isLight ? "z-50" : ""} swap-on ${
            isHideTooltip ? "" : "tooltip"
          } tooltip-bottom`}
          data-tip="Switch Dark"
        >
          <SunIcon onClick={toggleTheme} className="h-6 w-6" />
        </span>
        <span
          className={`swap-off ${
            isHideTooltip ? "" : "tooltip"
          } tooltip-bottom`}
          data-tip="Switch Light"
        >
          <MoonIcon onClick={toggleTheme} className="h-6 w-6" />
        </span>
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
