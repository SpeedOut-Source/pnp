import { BriefcaseIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { type WorkForProps } from "~/app_function/utils/interfaces";

const CompanyCard = dynamic(() => import("./company_card"));

export default function WorkFor(props: WorkForProps) {
  return (
    <div className="mx-auto h-fit w-full px-4 sm:mx-0 lg:max-w-2xl lg:px-0">
      <p className="flex items-center gap-2 text-2xl normal-case text-slate-400">
        <BriefcaseIcon className="h-5 w-5" /> {"I've done work for"}
      </p>
      <div className="mx-auto grid w-full justify-center gap-2 py-4 sm:grid-cols-2 md:mx-2 md:grid-cols-3 md:gap-4">
        {props.company.map((x) => (
          <CompanyCard key={x.logoUrl} {...x} />
        ))}
      </div>
    </div>
  );
}
