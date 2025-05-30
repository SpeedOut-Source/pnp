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
      <div className="bg-base-300 w-fit items-center rounded-xl px-4 py-1">
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
