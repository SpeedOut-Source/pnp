/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from "react";
import { DEFAULT_IS_LIGHT, useThemeStore } from "~/app_state/theme_mode";
import { CONNECT_OPTIONS } from "../contact/connect_data";
import Link from "next/link";
import Image from "next/legacy/image";
import { SearchButton } from "../search/button";
import {
  BUYMEACOFFEE_USERNAME,
  BUY_ME_A_COFFEE_DARK_BLURDATA,
  BUY_ME_A_COFFEE_LIGHT_BLURDATA,
} from "~/app_function/utils/constants";
import ThemeSwitch from "~/components/header/theme_switch";

export default function ConnectSection() {
  const utm = useThemeStore();
  const [isLight, setIsLight] = useState(DEFAULT_IS_LIGHT);

  useEffect(() => {
    setIsLight(utm.themeName === "winter");
  }, [utm]);

  return (
    <div className="flex flex-col items-center gap-1 lg:flex-row lg:gap-2">
      <span className="hidden gap-1 lg:flex">
        <ThemeSwitch />
        <SearchButton />
      </span>
      {BUYMEACOFFEE_USERNAME && (
        <Link
          className="relative h-12 w-56 overflow-hidden rounded-xl bg-base-300 ring-base-content/20 hover:ring-1 lg:hidden xl:inline"
          target="_blank"
          href={`https://www.buymeacoffee.com/${BUYMEACOFFEE_USERNAME}`}
        >
          <Image
            blurDataURL={
              isLight
                ? BUY_ME_A_COFFEE_LIGHT_BLURDATA
                : BUY_ME_A_COFFEE_DARK_BLURDATA
            }
            placeholder="blur"
            alt="Buymeacoffee"
            layout="fill"
            objectFit="fill"
            src={`https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=${BUYMEACOFFEE_USERNAME}&button_colour=${
              isLight ? "e3e9f4" : "20252e"
            }&font_colour=${
              isLight ? "394e6a" : "a6adbb"
            }&font_family=Cookie&outline_colour=${
              isLight ? "394e6a" : "a6adbb"
            }&coffee_colour=FFDD00`}
          />
        </Link>
      )}
      <div className="w-fit items-center gap-3 rounded-xl bg-base-300 px-4 lg:flex">
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
