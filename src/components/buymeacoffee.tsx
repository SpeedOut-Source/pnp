import Link from "next/link";
import Image from "next/legacy/image";
import {
  BUY_ME_A_COFFEE_LIGHT_BLURDATA,
  BUY_ME_A_COFFEE_DARK_BLURDATA,
} from "~/app_function/utils/constants";
import { env } from "~/env.mjs";
import { useState, useEffect } from "react";
import { useThemeStore, DEFAULT_IS_LIGHT } from "~/app_state/theme_mode";

export default function Buymeacoffee() {
  const utm = useThemeStore();
  const [isLight, setIsLight] = useState(DEFAULT_IS_LIGHT);

  useEffect(() => {
    setIsLight(utm.themeName === "winter");
  }, [utm]);

  return env.NEXT_PUBLIC_BUYMEACOFFEE_USERNAME ? (
    <Link
      className="relative h-12 w-56 overflow-hidden rounded-xl bg-base-300 ring-base-content/20 hover:ring-1 lg:hidden xl:inline"
      target="_blank"
      href={`https://www.buymeacoffee.com/${env.NEXT_PUBLIC_BUYMEACOFFEE_USERNAME}`}
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
        src={`https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=${
          env.NEXT_PUBLIC_BUYMEACOFFEE_USERNAME
        }&button_colour=${isLight ? "e3e9f4" : "20252e"}&font_colour=${
          isLight ? "394e6a" : "a6adbb"
        }&font_family=Cookie&outline_colour=${
          isLight ? "394e6a" : "a6adbb"
        }&coffee_colour=FFDD00`}
      />
    </Link>
  ) : (
    <></>
  );
}
