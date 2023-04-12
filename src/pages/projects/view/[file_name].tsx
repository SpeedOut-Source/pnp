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
import {
  type Project,
  type Blog,
  type CardItem,
  type Card,
  type App,
} from "~/app_function/utils/interfaces";
import LayoutCardApp from "~/components/apps/layout_card";

const Link = dynamic(() => import("next/link"));
const Image = dynamic(() => import("next/image"));
const ShareWith = dynamic(() => import("~/components/share_with"));

const MDRender = dynamic(() => import("~/components/markdown/md_render"), {
  loading: () => <Loading />,
});

const LayoutCard = dynamic(() => import("~/components/layout_card"));

export async function getStaticPaths() {
  return await getStaticPathItemView("projects");
}

export async function getStaticProps(
  context: GetStaticPropsContext<ParsedUrlQuery, ProjectBlogViewProps>
) {
  return await getStaticPropsItemView({ context, type: "projects" });
}

export interface ProjectBlogViewProps {
  data: string;
  configs: Configs;
  itemView: CardItem;
  previous: CardItem | null;
  next: CardItem | null;
  more4: CardItem[] | null;
  type: Card;
}

export default function ProjectBlogView(props: ProjectBlogViewProps) {
  let title: string;
  let desc: string;
  let shareTxt: string;
  let project: Project | undefined = undefined;

  switch (props.type) {
    case "projects":
      const itemView: Project = props.itemView as Project;
      title = `${itemView.whatText} | ${props.configs.appName}`;

      desc = `${itemView.result} | ${itemView.app.name} | ${itemView.company.name}`;
      shareTxt = `${itemView.whatText} ${itemView.result}`;

      project = itemView;
      break;
    case "blogs":
      const b: Blog = props.itemView as Blog;
      title = `${props.itemView.fileName} | ${props.configs.appName}`;
      desc = b.desc;
      shareTxt = b.desc;
    default:
      title = `${(props.itemView as App).title} | ${props.configs.appName}`;
      desc = title;
      shareTxt = title;
      break;
  }

  function headerCard() {
    switch (props.type) {
      case "projects":
        if (!project) {
          return <></>;
        }
        return (
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
        );

      case "blogs":
        return (
          <>
            Title: <span>{(props.itemView as Blog).title}</span>
          </>
        );
      case "apps":
        return (
          <>
            App name: <span>{(props.itemView as App).title}</span>
          </>
        );
      default:
        break;
    }
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
            className="title link-hover link-primary link capitalize"
            href={"/" + props.type}
          >
            {props.type}
          </Link>{" "}
          / {props.itemView.fileName}
        </div>
        <div className="my-2 flex flex-col items-center justify-between gap-2 sm:flex-row sm:items-end">
          <div className="p-card flex h-fit w-full flex-col items-start py-2 text-xs text-slate-500 sm:w-fit">
            <div className="flex items-center gap-1">{headerCard()}</div>
            {props.type === "projects" && project && (
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
              Read time: <span>{(props.itemView as Project).readTime} min</span>
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
                <div className=" mb-2 flex items-center text-2xl normal-case text-slate-400">
                  <Link
                    href={`/${props.type}/view/${props.previous.fileName}`}
                    className="link-hover link flex items-center "
                  >
                    <ChevronLeftIcon className="h-6 w-6"></ChevronLeftIcon>
                    Previous{" "}
                  </Link>
                </div>
                {props.type !== "apps" && <LayoutCard data={props.previous} />}
              </div>
            )}
            {props.next && (
              <div className="h-fit w-full">
                <div className="mb-2 flex items-center justify-end text-2xl normal-case text-slate-400">
                  <Link
                    href={`/${props.type}/view/${props.next.fileName}`}
                    className="link-hover link flex items-center"
                  >
                    Next <ChevronRightIcon className="h-6 w-6" />
                  </Link>
                </div>
                {props.type !== "apps" && <LayoutCard data={props.next} />}
              </div>
            )}
          </div>
        </div>
      )}
      {props.type === "apps" && props.more4 && (
        <div className="mx-auto grid max-w-3xl grid-cols-4 gap-2 px-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {props.more4.map((x) => {
            const m = x as App;
            return <LayoutCardApp {...m} key={x.imgUrl} />;
          })}
        </div>
      )}
    </>
  );
}
