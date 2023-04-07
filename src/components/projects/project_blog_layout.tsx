import dynamic from "next/dynamic";
import { type Project, type Blog } from "~/app_function/utils/interfaces";

const LayoutCard = dynamic(() => import("../layout_card"));

interface ProjectBlogLayout {
  data: Project[] | Blog[];
  isProject?: boolean;
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
    <div className="xs:grid-cols-2 mx-auto grid w-fit justify-center gap-4 sm:grid-cols-2 md:grid-cols-3">
      {props.data.map((x) => (
        <LayoutCard data={x} key={x.imgUrl} />
      ))}
    </div>
  );
}
