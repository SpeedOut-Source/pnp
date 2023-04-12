import dynamic from "next/dynamic";
import { type App } from "~/app_function/utils/interfaces";

const Link = dynamic(() => import("next/link"));

const Layout = dynamic(() => import("./layout"));

export interface AppsProps {
  data: App[];
}

export default function RecentApps(props: AppsProps) {
  return (
    <div className="mx-auto h-fit max-w-6xl px-4 sm:pl-4 sm:pr-0">
      <p className="text-2xl normal-case text-slate-400">Recent Apps</p>
      <div className="py-3">
        <Layout {...props} />
      </div>
      <div className="flex justify-center">
        <Link
          href="/apps"
          className="p-card cursor-pointer font-semibold uppercase"
        >
          view more
        </Link>
      </div>
    </div>
  );
}