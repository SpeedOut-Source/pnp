import { BriefcaseIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { type WorkForProps } from "~/app_function/utils/interfaces";
import ViewMore from "../view_more";

const LayoutCardCompany = dynamic(() => import("./layout_card"));

export default function WorkFor(props: WorkForProps) {
  function ViewMoreCompany() {
    return (
      <>
        {props.total > 3 && (
          <ViewMore url="/company" counts={props.total} name="company" />
        )}
      </>
    );
  }

  return (
    <div className="mx-auto h-fit w-full px-4 sm:mx-0 lg:max-w-2xl lg:px-0">
      <div className="flex justify-between">
        <p className="flex items-center gap-2 text-2xl normal-case text-slate-400">
          <BriefcaseIcon className="h-5 w-5" /> {"I've done work for"}
        </p>
        <div className="hidden md:inline">
          <ViewMoreCompany />
        </div>
      </div>
      <div className="mx-auto w-full justify-center gap-2 space-y-2 py-2 sm:grid sm:grid-cols-2 sm:space-y-0 md:mx-2 md:grid-cols-3 md:gap-4">
        {props.data.map((x) => (
          <LayoutCardCompany {...x} key={x.homePage} />
        ))}
      </div>
      <div className="flex justify-center md:hidden">
        <ViewMoreCompany />
      </div>
    </div>
  );
}
