import dynamic from "next/dynamic";
import { type Blog } from "../blogs/blogs_card";
import { type Project } from "./project_card";

const ProjectCard = dynamic(() => import("./project_card"));
const BlogCard = dynamic(() => import("../blogs/blogs_card"));

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
    <div className="xs:grid-cols-2 mx-auto grid w-full justify-center gap-4 p-4 sm:grid-cols-2 md:mx-2 md:grid-cols-3">
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
