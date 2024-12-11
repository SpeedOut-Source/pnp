import { type Blog } from "~/app_function/utils/interfaces";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import dynamic from "next/dynamic";
import HeroBlogLayout from "./hero_blog_layout";

const ViewMore = dynamic(() => import("../view_more"));

export interface HeroRecentBlogsProps {
  data: Blog[];
  total: number;
}

export default function HeroRecentBlogs(props: HeroRecentBlogsProps) {
  return (
    <div className="mx-auto h-fit max-w-6xl px-4 sm:pl-4 sm:pr-0">
      <div className="flex justify-between">
        <p className="flex items-center gap-2 text-2xl normal-case text-slate-400">
          <PencilSquareIcon className="h-5 w-5" />
          Recent blogs
        </p>
        <div className="hidden xl:inline">
          <ViewMore url="/blogs" counts={props.total} name="blogs" />
        </div>
      </div>

      <div className="py-3 xl:py-2">
        <HeroBlogLayout {...props} />
      </div>
      <div className="flex justify-center xl:hidden">
        <ViewMore url="/blogs" counts={props.total} name="blogs" />
      </div>
    </div>
  );
}
