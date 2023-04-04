import ProjectCard from "./project_card";
import { type ProjectsProps } from "./resent_projects";

export default function ProjectLayout(props: ProjectsProps) {
  if (!props.projects || props.projects.length < 0) {
    return <div className="text-center">No projects</div>;
  }
  return (
    <div className="xs:grid-cols-2 mx-auto grid w-full justify-center gap-2 py-4 sm:grid-cols-2 md:mx-2 md:grid-cols-3 md:gap-4">
      {props.projects.map((x) => (
        <ProjectCard key={x.imgUrl} {...x} />
      ))}
    </div>
  );
}
