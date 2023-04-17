import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import { type GetStaticPropsContext } from "next";
import { type Configs } from "~/app_function/home/home_server";
import {
  getStaticPathItemView,
  getStaticPropsItemView,
} from "~/app_function/project_blog/item_view_server";
import Loading from "~/components/markdown/loading";
import { type ParsedUrlQuery } from "querystring";
import {
  type Project,
  type Blog,
  type CardItem,
  type Card,
  type App,
} from "~/app_function/utils/interfaces";
import LayoutCardApp from "~/components/apps/layout_card";
import { DEFAULT_IS_LIGHT, useThemeStore } from "~/app_state/theme_mode";
import { useState, useEffect } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { getDataUrl, toTitleCase } from "~/app_function/utils/utils";

const SEO = dynamic(() => import("~/components/seo"));

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
  const utm = useThemeStore();
  const [isLight, setIsLight] = useState(DEFAULT_IS_LIGHT);

  let title: string;
  let desc: string;
  let shareTxt: string;
  let project: Project | undefined = undefined;

  useEffect(() => {
    setIsLight(utm.themeName === "winter");
  }, [utm]);

  function getLogoListing(name: string, appLogo?: string) {
    switch (name.toLowerCase()) {
      case "windows":
      case "microsoft":
      case "microsoft edge":
        return (
          <Image
            src={"/images/listing/microsoftstore.svg"}
            alt={name}
            height={10}
            width={135}
          />
        );
      case "android":
        return (
          <Image
            src={"/images/listing/playstore.svg"}
            alt={name}
            height={10}
            width={200}
          />
        );

      case "github release":
        return (
          <Image
            className=""
            src={`/images/listing/github-mark${isLight ? "" : "-white"}.svg`}
            alt={name}
            height={10}
            width={50}
          />
        );

      default:
        return (
          <Image
            src={
              appLogo ??
              `/images/logos/github-profile-dark${isLight ? "-light" : ""}.png`
            }
            alt={name}
            height={10}
            width={50}
          />
        );
    }
  }

  switch (props.type) {
    case "projects":
      const itemView: Project = props.itemView as Project;
      title = `${itemView.whatText}`;
      desc = `${itemView.result} | ${toTitleCase(props.type)} | ${
        itemView.company.name
      } | ${itemView.app.name}`;
      shareTxt = `${itemView.whatText} ${itemView.result}`;
      project = itemView;
      break;
    case "blogs":
      const b: Blog = props.itemView as Blog;
      title = b.title;
      desc = `${b.desc} | ${toTitleCase(props.type)} | ${
        props.configs.appName
      }`;
      shareTxt = b.desc;
      break;
    default:
      const a: App = props.itemView as App;
      title = a.title;
      desc = `${a.category} | ${toTitleCase(props.type)} | ${a.platforms
        .map((x) => x.name)
        .join(" | ")} | ${props.configs.appName}`;
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
        ogType="article"
        itemView={props.itemView}
      />
      <div className="container mx-auto max-w-3xl px-2">
        <div className="flex flex-wrap items-center gap-1">
          <Link
            className="title link-hover link-primary link capitalize"
            href={"/" + props.type}
          >
            {props.type}
          </Link>{" "}
          / {props.itemView.fileName}
          <div
            className="tooltip tooltip-bottom"
            data-tip="Edit this on Github"
          >
            <Link
              href={
                getDataUrl(props.configs.repoPath) +
                "/" +
                props.type +
                "/" +
                props.itemView.fileName +
                "?plain=1"
              }
              target="_blank"
              rel=""
            >
              <PencilSquareIcon className="link-hover link h-4 w-4" />
            </Link>
          </div>
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
            {props.type !== "apps" && (
              <div className="flex items-center gap-1">
                Read time:{" "}
                <span>{(props.itemView as Project).readTime} min</span>
              </div>
            )}
          </div>
          <ShareWith text={shareTxt} />
        </div>
      </div>
      {props.type === "apps" && (
        <div className="container mx-auto mb-4 max-w-3xl space-y-4 px-2">
          <div className="flex w-full flex-col items-center justify-center">
            <Image
              src={props.itemView.imgUrl}
              alt={(props.itemView as App).title}
              width={100}
              height={100}
            />
            <p className="text-center text-4xl font-semibold tracking-wider">
              {(props.itemView as App).title}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {(props.itemView as App).platforms.map((x) => (
              <Link
                href={x.link}
                target="_blank"
                className="p-card flex h-fit w-fit cursor-pointer flex-col py-2"
                key={x.link}
              >
                {
                  <div className="h-24 space-y-2 py-2">
                    <p className="text-center">{x.name}</p>
                    <div className="flex h-fit w-40 justify-center overflow-hidden">
                      {getLogoListing(x.name, props.itemView.imgUrl)}
                    </div>
                  </div>
                }
              </Link>
            ))}
          </div>
          <div>
            <div className="carousel-center carousel rounded-box my-0 space-x-4 bg-base-300/40 p-4">
              {(props.itemView as App).imgs.map((x, i) => (
                <div
                  id={`image${i + 1}`}
                  key={x}
                  className="carousel-item relative h-72 w-[98%] xs:h-72 sm:h-80 md:h-[30rem]"
                >
                  <Image
                    alt={i.toString()}
                    layout="fill"
                    objectFit="scale-down"
                    src={x}
                    className="rounded-box"
                  />
                </div>
              ))}
            </div>
            {(props.itemView as App).imgs.length > 1 && (
              <div className="my-2 flex w-full justify-center gap-2">
                {(props.itemView as App).imgs.map((x, i) => (
                  <Link
                    autoFocus={false}
                    scroll={false}
                    key={i}
                    href={`#image${i + 1}`}
                    className="btn-xs btn my-0 py-0"
                  >
                    {i + 1}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <MDRender key={props.itemView.date} data={props.data} />
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
        <div
          key={`${props.itemView.fileName}`}
          className="mx-auto grid max-w-3xl gap-2 px-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        >
          {props.more4.map((x) => {
            const m = x as App;
            return <LayoutCardApp {...m} key={x.date} />;
          })}
        </div>
      )}
    </>
  );
}
