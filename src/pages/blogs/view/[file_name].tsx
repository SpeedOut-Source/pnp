import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import matter from "gray-matter";
import { type GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { type Configs } from "~/app_function/home/home_server";
import {
  getBlog,
  getBlogs,
  getConfigs,
  getData,
} from "~/app_function/utils/utils-server";
import BlogCard, { type Blog } from "~/components/blogs/blogs_card";
import Loading from "~/components/markdown/loading";
import SEO from "~/components/seo";
import ShareWith from "~/components/share_with";

const MDRender = dynamic(() => import("~/components/markdown/md_render"), {
  loading: () => <Loading />,
});

export async function getStaticPaths() {
  const allBlogs = await getBlogs();
  const paths = allBlogs.blogs.map((x) => {
    return {
      params: {
        file_name: x.fileName,
      },
    };
  });

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`

export const getStaticProps: GetStaticProps = async (context) => {
  if (
    !context.params ||
    !context.params.file_name ||
    typeof context.params.file_name !== "string"
  ) {
    return {
      notFound: true,
    };
  }
  try {
    const dataRaw = (
      await getData(`blogs/${context.params.file_name}`)
    ).toString();

    const { content, data } = matter(dataRaw);

    const blog = getBlog(data, context.params.file_name);

    const allBlogs = await getBlogs();
    const currentIndex = allBlogs.blogs.findIndex(
      (p) => p.fileName === context.params?.file_name
    );
    const previous = allBlogs.blogs[currentIndex - 1] ?? null;
    const next = allBlogs.blogs[currentIndex + 1] ?? null;

    const configs = await getConfigs();

    const bvp: BlogViewProps = {
      data: content,
      configs,
      blog,
      previous,
      next,
    };
    return {
      props: bvp,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export interface BlogViewProps {
  data: string;
  configs: Configs;
  blog: Blog;
  previous: Blog | null;
  next: Blog | null;
}

export default function BlogView(props: BlogViewProps) {
  const title = `${props.blog.fileName} | ${props.configs.appName}`;

  return (
    <>
      <SEO
        configs={props.configs}
        description={props.blog.desc}
        title={title}
        imgUrl={props.blog.imgUrl}
      />

      <div className=" container mx-auto max-w-3xl px-2">
        <div className="">
          <Link className="link-hover link-primary link" href="/blogs">
            Blogs
          </Link>{" "}
          / {props.blog.fileName}
        </div>
        <div className="my-2 flex flex-col items-center justify-between gap-2 sm:flex-row sm:items-end">
          <div className="p-card flex h-fit w-full flex-col items-start py-2 text-xs text-slate-500 sm:w-fit">
            <div className="flex items-center gap-1">
              Title: <span>{props.blog.title}</span>
            </div>
            <div className="flex items-center gap-1">
              Date:{" "}
              <span>
                {new Date(props.blog.date).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              Read time <span>{props.blog.readTime} min</span>
            </div>
          </div>
          <ShareWith text={`${props.blog.desc}`} />
        </div>
      </div>
      <MDRender data={props.data} />
      <div className="container divider mx-auto max-w-3xl px-2" />
      {(props.previous || props.next) && (
        <div className="container mx-auto max-w-3xl px-2">
          <div className="flex items-center justify-between gap-4 ">
            {props.previous && (
              <div className="h-fit w-fit">
                <div className="mb-2 flex items-center text-2xl normal-case text-slate-400">
                  <ChevronLeftIcon className="h-6 w-6"></ChevronLeftIcon>
                  Previous{" "}
                </div>
                <BlogCard {...props.previous} />
              </div>
            )}
            {props.next && (
              <div className="h-fit w-fit">
                <div className="mb-2 flex items-center justify-end text-2xl normal-case text-slate-400">
                  Next <ChevronRightIcon className="h-6 w-6"></ChevronRightIcon>
                </div>
                <BlogCard {...props.next} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
