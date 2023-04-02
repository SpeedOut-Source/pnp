import ConnectSection from "./connect_section";
import Links from "./links";
import { Bars3Icon } from "@heroicons/react/24/solid";

export default function Header() {
  return (
    <header className="backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold tracking-wider">
            Biplob Sutradhar
          </div>
          <Links className="hidden items-center gap-4 md:flex lg:flex xl:flex" />
        </div>
        <div>
          <div className="hidden md:inline lg:inline xl:inline">
            <ConnectSection />
          </div>
          <div className="md:hidden lg:hidden xl:hidden">
            <div className="dropdown dropdown-end dropdown-hover">
              <label tabIndex={0} className="btn-ghost btn-circle btn">
                <Bars3Icon className="h-8 w-8" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box w-fit bg-base-100/80 p-2 shadow backdrop-blur-3xl"
              >
                <Links className="mb-2 flex justify-center space-x-4 rounded-lg bg-base-100/80 py-3" />
                <ConnectSection />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
