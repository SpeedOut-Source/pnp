import { CogIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { type Project } from "~/app_function/utils/interfaces";
import ViewMore from "../view_more";

const ProjectBlogLayout = dynamic(() => import("./project_blog_layout"));

export interface ProjectsProps {
  data: Project[];
  total: number;
}

export default function RecentProjects(props: ProjectsProps) {
  return (
    <div className="mx-auto h-fit max-w-6xl px-4 sm:pl-4 sm:pr-0">
      <p className="flex items-center gap-2 text-2xl normal-case text-slate-400">
        <CogIcon className="h-5 w-5" />
        Recent projects
      </p>
      <div className="py-3">
        <ProjectBlogLayout {...props} />
      </div>
      <div className="flex justify-center">
        <ViewMore url="/projects" counts={props.total} name="projects" />
      </div>
    </div>
  );
}
