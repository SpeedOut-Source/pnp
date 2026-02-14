import { BriefcaseIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { type CompanyHit } from "~/app_function/types/HitTypes";

const LayoutCardCompany = dynamic(() => import("./layout_card"));

export interface SearchCompanyProps {
  data: CompanyHit[];
}

export default function SearchCompany(props: SearchCompanyProps) {
  if (props.data.length <= 0) return <></>;

  return (
    <div className="mx-4 h-fit max-w-6xl">
      <div className="flex justify-between">
        <p className="flex items-center gap-2 text-2xl text-slate-400 normal-case">
          <BriefcaseIcon className="h-5 w-5" /> {"Company"}
        </p>
      </div>
      <div className="mx-auto w-full justify-center gap-2 space-y-2 py-2 sm:grid sm:grid-cols-3 sm:space-y-0 md:mx-2 md:grid-cols-5 md:gap-4">
        {props.data.map((x) => (
          <LayoutCardCompany {...x} key={x.objectID} isSearch={true} />
        ))}
      </div>
    </div>
  );
}
