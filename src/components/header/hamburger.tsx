import dynamic from "next/dynamic";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { X } from "lucide-react";
import { useRef } from "react";

const ConnectSection = dynamic(() => import("./connect_section"));
const Links = dynamic(() => import("./links"));

export default function Hamburger() {
  const ref = useRef<HTMLDetailsElement>(null);

  return (
    <>
      <details ref={ref} className="group dropdown dropdown-end focus:ring">
        <summary
          onPointerEnter={() => {
            ref.current!.open = true;
          }}
          className="btn btn-circle btn-ghost swap swap-rotate group-open:swap-active"
        >
          <Bars3Icon className="swap-off h-8 w-8" />
          <X className="swap-on h-8 w-8" />
        </summary>
        <ul
          onBlur={() => {
            ref.current!.open = false;
          }}
          onPointerLeave={() => {
            ref.current!.open = false;
          }}
          className="menu dropdown-content rounded-box mt-2 w-fit bg-base-100/95 px-2 py-5 shadow-2xl ring ring-base-300"
        >
          <Links className="flex justify-center space-x-4 rounded-lg bg-base-100/80 px-2 pb-2" />
          <ConnectSection />
        </ul>
      </details>
    </>
  );
}
