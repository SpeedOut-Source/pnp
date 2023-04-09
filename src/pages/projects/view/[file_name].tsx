import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import { type GetStaticPropsContext } from "next";
import { type Configs } from "~/app_function/home/home_server";
import {
  getStaticPathItemView,
  getStaticPropsItemView,
} from "~/app_function/project_blog/item_view_server";
import Loading from "~/components/markdown/loading";
import SEO from "~/components/seo";
import { type ParsedUrlQuery } from "querystring";
import { type Project, type Blog } from "~/app_function/utils/interfaces";

const Link = dynamic(() => import("next/link"));
const Image = dynamic(() => import("next/image"));
const ShareWith = dynamic(() => import("~/components/share_with"));

const MDRender = dynamic(() => import("~/components/markdown/md_render"), {
  loading: () => <Loading />,
});

const LayoutCard = dynamic(() => import("~/components/layout_card"));

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

  const slashName = props.isProject ? "projects" : "blogs";

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
            className="title link-hover link-primary link capitalize"
            href={"/" + slashName}
          >
            {slashName}
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
          <div className="flex w-full items-center justify-center gap-4">
            {props.previous && (
              <div className="h-fit w-full">
                <Link
                  href={`/${slashName}/view/${props.previous.fileName}`}
                  className="link-hover link mb-2 flex items-center text-2xl normal-case text-slate-400"
                >
                  <ChevronLeftIcon className="h-6 w-6"></ChevronLeftIcon>
                  Previous{" "}
                </Link>
                <LayoutCard data={props.previous} />
              </div>
            )}
            {props.next && (
              <div className="h-fit w-full">
                <Link
                  href={`/${slashName}/view/${props.next.fileName}`}
                  className="link-hover link mb-2 flex items-center justify-end text-2xl normal-case text-slate-400"
                >
                  Next <ChevronRightIcon className="h-6 w-6" />
                </Link>
                <LayoutCard data={props.next} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
