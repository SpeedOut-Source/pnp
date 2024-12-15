import dynamic from "next/dynamic";
import { type MeSectionProps } from "../me_section/me_section";
import { type WorkForProps } from "~/app_function/utils/interfaces";
import { type RecentBlogsProps } from "../blogs/recent_blogs";

const WorkFor = dynamic(() => import("../company/work_for"));
const MeSection = dynamic(() => import("../me_section/me_section"));
const HeroRecentBlogs = dynamic(() => import("./hero_recent_blogs"));

export interface HeroProps {
  me: MeSectionProps;
  company: WorkForProps;
  recentBlogs: RecentBlogsProps;
}

export default function Hero(props: HeroProps) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-4 xl:flex-row xl:gap-0">
      <div className="xl:mr-3">
        <MeSection {...props.me} />
      </div>
      <div className="flex w-full flex-1 flex-col xl:space-y-2">
        <WorkFor {...props.company} />
        <HeroRecentBlogs {...props.recentBlogs} />
      </div>
    </div>
  );
}
