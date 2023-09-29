import dynamic from "next/dynamic";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useEffect, useState } from "react";

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
      <DropdownMenuTrigger className="swap-rotate btn btn-circle btn-ghost swap data-[state=open]:swap-active">
        <Bars3Icon className="swap-off h-8 w-8" />
        <X className="swap-on h-8 w-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="menu dropdown-content rounded-box m-2 mt-2 w-fit overflow-visible border-none bg-base-100/95 px-2 py-5 text-base-content shadow-2xl ring ring-base-300">
        <Links className="flex justify-center space-x-4 rounded-lg bg-base-100/80 px-2 pb-2" />
        <ConnectSection />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
