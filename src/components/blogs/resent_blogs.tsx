import Link from "next/link";
import BlogCard, { type Blog } from "./blogs_card";

export interface ResentBlogsProps {
  blogs: Blog[];
}

export default function ResentBlogs(props: ResentBlogsProps) {
  return (
    <div className="mx-auto h-fit max-w-6xl px-4 sm:pl-4 sm:pr-0">
      <p className="text-2xl normal-case text-slate-400">Resent Blogs</p>
      <div className="xs:grid-cols-2 mx-auto grid w-full justify-center gap-2 py-4 sm:grid-cols-2 md:mx-2 md:grid-cols-3 md:gap-4">
        {props.blogs.map((x) => (
          <BlogCard key={x.imgUrl} {...x} />
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
