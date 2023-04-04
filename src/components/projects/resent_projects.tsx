import Link from "next/link";
import { type Project } from "./project_card";
import dynamic from "next/dynamic";

const ProjectBlogLayout = dynamic(() => import("./project_layout"));

export interface ProjectsProps {
  data: Project[];
}

export default function ResentProjects(props: ProjectsProps) {
  return (
    <div className="mx-auto h-fit max-w-6xl px-4 sm:pl-4 sm:pr-0">
      <p className="text-2xl normal-case text-slate-400">Resent Projects</p>
      <ProjectBlogLayout {...props} isProject />
      <div className="flex justify-center">
        <Link
          href="/projects"
          className="p-card cursor-pointer font-semibold uppercase"
        >
          view more
        </Link>
      </div>
    </div>
  );
}
