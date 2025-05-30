import CpuChipIcon from "@heroicons/react/24/outline/CpuChipIcon";
import dynamic from "next/dynamic";
import { type AppHit } from "~/app_function/types/HitTypes";

const Layout = dynamic(() => import("./layout"));

export interface SearchAppsProps {
  data: AppHit[];
}

export default function SearchApps(props: SearchAppsProps) {
  if (props.data.length <= 0) return <></>;
  return (
    <div className="mx-auto h-fit max-w-6xl px-4 sm:pr-0 sm:pl-4">
      <p
        id="apps"
        className="flex items-center gap-2 text-2xl text-slate-400 normal-case"
      >
        <CpuChipIcon className="h-5 w-5" />
        Apps
      </p>
      <div className="py-3">
        <Layout {...props} />
      </div>
    </div>
  );
}
