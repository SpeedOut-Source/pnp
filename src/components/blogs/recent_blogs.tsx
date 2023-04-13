import ProjectBlogLayout from "../projects/project_blog_layout";
import { type Blog } from "~/app_function/utils/interfaces";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import ViewMore from "../view_more";

export interface RecentBlogsProps {
  data: Blog[];
  total: number;
}

export default function RecentBlogs(props: RecentBlogsProps) {
  return (
    <div className="mx-auto h-fit max-w-6xl px-4 sm:pl-4 sm:pr-0">
      <p className="flex items-center gap-2 text-2xl normal-case text-slate-400">
        <PencilSquareIcon className="h-5 w-5" />
        Recent blogs
      </p>
      <div className="py-3">
        <ProjectBlogLayout {...props} />
      </div>
      <div className="flex justify-center">
        <ViewMore url="/blogs" counts={props.total} name="blogs" />
      </div>
    </div>
  );
}
