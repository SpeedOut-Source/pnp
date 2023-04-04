import BlogCard, { type Blog } from "../blogs/blogs_card";
import ProjectCard, { type Project } from "./project_card";

interface ProjectBlogLayout {
  data: Project[] | Blog[];
  isProject: boolean;
}

export default function ProjectBlogLayout(props: ProjectBlogLayout) {
  if (!props.data || props.data.length < 0) {
    return (
      <div className="text-center">
        No {props.isProject ? "projects" : "blogs"}
      </div>
    );
  }
  return (
    <div className="xs:grid-cols-2 mx-auto grid w-full justify-center gap-2 p-4 sm:grid-cols-2 md:mx-2 md:grid-cols-3 md:gap-4">
      {props.data.map((x) =>
        props.isProject ? (
          <ProjectCard key={x.imgUrl} {...(x as Project)} />
        ) : (
          <BlogCard key={x.imgUrl} {...(x as Blog)} />
        )
      )}
    </div>
  );
}
