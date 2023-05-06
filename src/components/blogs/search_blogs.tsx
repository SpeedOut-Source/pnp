import ProjectBlogLayout from "../projects/project_blog_layout";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import { type BlogHit } from "~/app_function/types/HitTypes";

export interface SearchBlogsProps {
  data: BlogHit[];
}

export default function SearchBlogs(props: SearchBlogsProps) {
  if (props.data.length <= 0) return <></>;
  
  return (
    <div className="mx-auto h-fit max-w-6xl px-4 sm:pl-4 sm:pr-0">
      <p className="flex items-center gap-2 text-2xl normal-case text-slate-400">
        <PencilSquareIcon className="h-5 w-5" />
        Blogs
      </p>
      <div className="py-3">
        <ProjectBlogLayout {...props} />
      </div>
    </div>
  );
}
