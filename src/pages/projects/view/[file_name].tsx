import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import Image from "next/image";
import { type GetStaticPropsContext } from "next";
import Link from "next/link";
import { type Configs } from "~/app_function/home/home_server";
import {
  getStaticPathItemView,
  getStaticPropsItemView,
} from "~/app_function/project_blog/item_view_server";
import Loading from "~/components/markdown/loading";
import ProjectCard, { type Project } from "~/components/projects/project_card";
import SEO from "~/components/seo";
import ShareWith from "~/components/share_with";
import BlogCard, { type Blog } from "~/components/blogs/blogs_card";
import { type ParsedUrlQuery } from "querystring";
const MDRender = dynamic(() => import("~/components/markdown/md_render"), {
  loading: () => <Loading />,
});

export async function getStaticPaths() {
  return await getStaticPathItemView({ isProject: true });
}

export async function getStaticProps(
  context: GetStaticPropsContext<ParsedUrlQuery, ProjectBlogViewProps>
) {
  return await getStaticPropsItemView({ context, isProject: true });
}

export interface ProjectBlogViewProps {
  data: string;
  configs: Configs;
  itemView: Project | Blog;
  previous: Project | Blog | null;
  next: Project | Blog | null;
  isProject: boolean;
}

export default function ProjectBlogView(props: ProjectBlogViewProps) {
  let title: string;
  let desc: string;
  let shareTxt: string;
  let project: Project | undefined = undefined;

  if (props.isProject) {
    const itemView: Project = props.itemView as Project;
    title = `${itemView.whatText} | ${props.configs.appName}`;

    desc = `${itemView.result} | ${itemView.app.name} | ${itemView.company.name}`;
    shareTxt = `${itemView.whatText} ${itemView.result}`;

    project = itemView;
  } else {
    const itemView: Blog = props.itemView as Blog;
    title = `${props.itemView.fileName} | ${props.configs.appName}`;

    desc = itemView.desc;
    shareTxt = itemView.desc;
  }

  return (
    <>
      <SEO
        configs={props.configs}
        description={desc}
        title={title}
        imgUrl={props.itemView.imgUrl}
      />
      <div className=" container mx-auto max-w-3xl px-2">
        <div className="">
          <Link
            className="link-hover link-primary link"
            href={props.isProject ? "/projects" : "/blogs"}
          >
            {props.isProject ? "Projects" : "Blogs"}
          </Link>{" "}
          / {props.itemView.fileName}
        </div>
        <div className="my-2 flex flex-col items-center justify-between gap-2 sm:flex-row sm:items-end">
          <div className="p-card flex h-fit w-full flex-col items-start py-2 text-xs text-slate-500 sm:w-fit">
            <div className="flex items-center gap-1">
              {props.isProject && project ? (
                <>
                  App Name:{" "}
                  <div>
                    <div className="flex items-center gap-1">
                      <Image
                        width={20}
                        height={20}
                        src={project.app.logoUrl}
                        alt={project.app.name}
                      />
                      <span>{project.app.name}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  Title: <span>{(props.itemView as Blog).title}</span>
                </>
              )}
            </div>
            {props.isProject && project && (
              <div className="flex items-center gap-1">
                Company Name:{" "}
                <div>
                  <div className="flex items-center gap-1">
                    <Image
                      width={20}
                      height={20}
                      src={project.company.logoUrl}
                      alt={project.company.name}
                    />
                    <span>{project.company.name}</span>
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center gap-1">
              Date:{" "}
              <span>
                {new Date(props.itemView.date).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              Read time: <span>{props.itemView.readTime} min</span>
            </div>
          </div>
          <ShareWith text={shareTxt} />
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
                {props.isProject ? (
                  <ProjectCard {...(props.previous as Project)} />
                ) : (
                  <BlogCard {...(props.previous as Blog)} />
                )}
              </div>
            )}
            {props.next && (
              <div className="h-fit w-fit">
                <div className="mb-2 flex items-center justify-end text-2xl normal-case text-slate-400">
                  Next <ChevronRightIcon className="h-6 w-6"></ChevronRightIcon>
                </div>
                {props.isProject ? (
                  <ProjectCard {...(props.next as Project)} />
                ) : (
                  <BlogCard {...(props.next as Blog)} />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
