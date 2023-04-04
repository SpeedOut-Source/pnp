import Link from "next/link";
import { type Project } from "./project_card";
import ProjectLayout from "./project_layout";

export interface ProjectsProps {
  projects: Project[];
}

export default function ResentProjects(props: ProjectsProps) {
  return (
    <div className="mx-auto h-fit max-w-6xl px-4 sm:pl-4 sm:pr-0">
      <p className="text-2xl normal-case text-slate-400">Resent Projects</p>
      <ProjectLayout {...props} />
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
