import { type Blog } from "~/app_function/utils/interfaces";
import BlogLayout from "./blog_layout";

interface HeroBlogLayout {
  data: Blog[];
}

export default function HeroBlogLayout(props: HeroBlogLayout) {
  return (
    <div className="xs:grid-cols-2 mx-auto grid w-fit justify-center gap-4 sm:grid-cols-2 md:grid-cols-3">
      {props.data.map((x, i) => (
        <BlogLayout data={x} key={i + x.fileName + x.date} />
      ))}
    </div>
  );
}
