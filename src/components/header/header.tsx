import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import packageJson from "../../../package.json";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Image from "next/image";
import { DEFAULT_IS_LIGHT, useThemeStore } from "~/app_state/theme_mode";

const ConnectSection = dynamic(() => import("./connect_section"));
const Links = dynamic(() => import("./links"));
const Link = dynamic(() => import("next/link"));

export default function Header() {
  const utm = useThemeStore();
  const [isLight, setIsLight] = useState(DEFAULT_IS_LIGHT);

  useEffect(() => {
    setIsLight(utm.themeName === "winter");
  }, [utm]);

  const [bgChange, setBgChange] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const handleScroll = () => {
      const sY = window.scrollY >= 16;
      if (sY) {
        setBgChange(true);
      } else {
        setBgChange(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${loaded ? "transition-all delay-300 ease-in-out" : ""} ${
        bgChange
          ? "bg-base-200/70 shadow-2xl lg:xl:translate-y-1 lg:xl:rounded-xl lg:xl:ring-base-300/40 lg:xl:ring-1 lg:xl:mx-1"
          : "shadow-none"
      } supports-backdrop-blur:bg-white/60 sticky top-0 z-50 h-14 backdrop-blur-sm`}
    >
      <div className="container mx-auto flex h-14 items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="tooltip tooltip-bottom" data-tip="Go home">
            <Link
              href="/"
              className="btn-ghost btn px-2 text-xl font-bold normal-case tracking-wider"
            >
              <Image
                src={`/images/logos/github-profile-dark${
                  isLight ? "-light" : ""
                }.png`}
                width="32"
                height="32"
                alt={packageJson.personName}
              />
              <div className="ml-2 hidden lg:flex">
                {packageJson.personName}
              </div>
            </Link>
          </span>
          <Links className="hidden items-center gap-4 md:flex lg:flex xl:flex" />
        </div>
        <div>
          <div className="hidden md:inline lg:inline xl:inline">
            <ConnectSection />
          </div>
          <div className="md:hidden lg:hidden xl:hidden">
            <div className="dropdown-end dropdown">
              <label tabIndex={0} className="btn-ghost btn-circle btn">
                <Bars3Icon className="h-8 w-8" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box mt-2 w-fit bg-base-100/80 p-2 shadow-2xl ring ring-base-300 backdrop-blur-3xl"
              >
                <Links className="mb-2 flex justify-center space-x-4 rounded-lg bg-base-100/80 px-2 py-3" />
                <ConnectSection />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
