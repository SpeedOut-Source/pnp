import ProjectBlogLayout from "../projects/project_blog_layout";
import { type Blog } from "~/app_function/utils/interfaces";
import dynamic from "next/dynamic";

const Link = dynamic(() => import("next/link"));

export interface RecentBlogsProps {
  data: Blog[];
}

export default function RecentBlogs(props: RecentBlogsProps) {
  return (
    <div className="mx-auto h-fit max-w-6xl px-4 sm:pl-4 sm:pr-0">
      <p className="text-2xl normal-case text-slate-400">Recent blogs</p>
      <div className="py-3">
        <ProjectBlogLayout {...props} />
      </div>
      <div className="flex justify-center">
        <Link
          href="/blogs"
          className="p-card cursor-pointer font-semibold uppercase"
        >
          view more
        </Link>
      </div>
    </div>
  );
}