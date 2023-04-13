import { CpuChipIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { type App } from "~/app_function/utils/interfaces";
import ViewMore from "../view_more";

const Layout = dynamic(() => import("./layout"));

export interface AppsProps {
  data: App[];
  total: number;
}

export default function RecentApps(props: AppsProps) {
  return (
    <div className="mx-auto h-fit max-w-6xl px-4 sm:pl-4 sm:pr-0 lg:pt-3">
      <p className="flex items-center gap-2 text-2xl normal-case text-slate-400">
        <CpuChipIcon className="h-5 w-5" />
        Recent Apps
      </p>
      <div className="py-3">
        <Layout {...props} />
      </div>
      <div className="flex justify-center">
        <ViewMore url="/apps" counts={props.total} name="apps" />
      </div>
    </div>
  );
}
