import { CogIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { type ProjectHit } from "~/app_function/types/HitTypes";

const ProjectBlogLayout = dynamic(() => import("./project_blog_layout"));

export interface SearchProjectsProps {
  data: ProjectHit[];
}

export default function SearchProjects(props: SearchProjectsProps) {
  if (props.data.length <= 0) return <></>;

  return (
    <div className="mx-auto h-fit max-w-6xl px-4 sm:pr-0 sm:pl-4">
      <p className="flex items-center gap-2 text-2xl text-slate-400 normal-case">
        <CogIcon className="h-5 w-5" />
        Projects
      </p>
      <div className="py-3">
        <ProjectBlogLayout {...props} />
      </div>
    </div>
  );
}
