import { CONNECT_OPTIONS } from "../contact/connect_data";
import Link from "next/link";
import { SearchButton } from "../search/button";

import ThemeSwitch from "~/components/header/theme_switch";
import Buymeacoffee from "../buymeacoffee";
export default function ConnectSection() {
  return (
    <div className="flex flex-col items-center gap-1 lg:flex-row lg:gap-2">
      <span className="hidden gap-1 lg:flex">
        <ThemeSwitch />
        <SearchButton />
      </span>
      <Buymeacoffee />
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
