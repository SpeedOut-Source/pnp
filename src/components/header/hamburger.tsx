import dynamic from "next/dynamic";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

const ConnectSection = dynamic(() => import("./connect_section"));
const Links = dynamic(() => import("./links"));

export default function Hamburger() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setDropdownOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger
        className={cn(
          "btn btn-circle btn-ghost swap swap-rotate",
          isDropdownOpen && "swap-active",
        )}
      >
        <Bars3Icon className="swap-off h-8 w-8 fill-current" />
        <X className="swap-on h-8 w-8 fill-current" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="menu dropdown-content rounded-box bg-base-100/95 text-base-content ring-base-300 m-2 mt-2 w-fit space-y-1 overflow-visible border-none px-2 py-5 shadow-2xl ring-3">
        <Links className="bg-base-100/80 flex justify-center space-x-4 rounded-lg px-2 pb-2" />
        <ConnectSection />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
