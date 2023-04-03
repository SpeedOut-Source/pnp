import Link from "next/link";
import ProjectCard, { type Project } from "./project_card";

export interface ResentProjectsProps {
  projects: Project[];
}

export default function ResentProjects(props: ResentProjectsProps) {
  return (
    <div className="mx-auto h-fit max-w-6xl px-4 sm:pl-4 sm:pr-0">
      <p className="text-2xl normal-case text-slate-400">Resent Projects</p>
      <div className="xs:grid-cols-2 mx-auto grid w-full justify-center gap-2 py-4 sm:grid-cols-2 md:mx-2 md:grid-cols-3 md:gap-4">
        {props.projects.map((x) => (
          <ProjectCard key={x.imgUrl} {...x} />
        ))}
      </div>
      <div className="flex justify-center">
        <Link
          href="#"
          className="p-card cursor-pointer font-semibold uppercase"
        >
          view more
        </Link>
      </div>
    </div>
  );
}
