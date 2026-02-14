import { BriefcaseIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { type WorkForProps } from "~/app_function/utils/interfaces";
import Link from "next/link";

const LayoutCardCompany = dynamic(() => import("./layout_card"));

export default function WorkFor(props: WorkForProps) {
  return (
    <div className="mx-auto h-fit w-full px-4 sm:mx-0 xl:max-w-2xl xl:px-0">
      <div className="flex items-center gap-2 text-2xl text-slate-400 normal-case">
        <BriefcaseIcon className="h-5 w-5" />
        <Link
          href="/company"
          className="link-hover link tooltip md:tooltip-bottom"
          data-tip="View all"
        >
          Experience
        </Link>
      </div>

      <div className="mx-auto w-full justify-center gap-2 space-y-2 py-2 sm:grid sm:grid-cols-2 sm:space-y-0 xl:mx-2 xl:grid-cols-3 xl:gap-4">
        {props.data.map((x) => (
          <LayoutCardCompany {...x} key={x.fileName.slice(0, -3)} />
        ))}
      </div>
    </div>
  );
}
