import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import { type GetStaticPropsContext } from "next";
import {
  getStaticPathItemView,
  getStaticPropsItemView,
} from "~/app_function/project_blog/item_view_server";
import Loading from "~/components/markdown/loading";
import { type ParsedUrlQuery } from "querystring";
import type {
  Project,
  Blog,
  CardItem,
  Card,
  App,
  Company,
  ImgBlurData,
} from "~/app_function/utils/interfaces";
import LayoutCardApp from "~/components/apps/layout_card";
import { DEFAULT_IS_LIGHT, useThemeStore } from "~/app_state/theme_mode";
import { useState, useEffect } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import {
  getDataUrl,
  getPrefixRepo,
  toTitleCase,
} from "~/app_function/utils/utils";
import LayoutCardCompany from "~/components/company/layout_card";
import { env } from "../../../env.mjs";
import urlJoin from "url-join";
import type { TransformNodeOutput } from "~/app_function/remark/headings";
import TableOfContents from "~/components/table_of_contents/toc";

const SEO = dynamic(() => import("~/components/seo"));

const Link = dynamic(() => import("next/link"));
const Image = dynamic(() => import("next/image"));
const ImageLegacy = dynamic(() => import("next/legacy/image"));
const ShareWith = dynamic(() => import("~/components/share_with"));
const DateTimePost = dynamic(() => import("~/components/date_time_post"), {
  ssr: false,
});

const MDRender = dynamic(() => import("~/components/markdown/md_render"), {
  loading: () => <Loading />,
});

const LayoutCard = dynamic(() => import("~/components/layout_card"));
const Comments = dynamic(() => import("~/components/comments"));

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
  imgBlurdata: ImgBlurData;
  itemView: CardItem;
  previous: CardItem | null;
  next: CardItem | null;
  more4: CardItem[] | null;
  type: Card;
  toc: TransformNodeOutput[];
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
      case "edge add-ons":
        return (
          <Image
            src={`${getPrefixRepo()}/images/listing/microsoftstore.svg`}
            alt={name}
            height={10}
            width={135}
          />
        );
      case "chrome web store":
        return (
          <Image
            className="rounded-md"
            src={`${getPrefixRepo()}/images/listing/chrome-web-store.png`}
            alt={name}
            height={10}
            width={160}
          />
        );
      case "android":
        return (
          <Image
            src={`${getPrefixRepo()}/images/listing/playstore.svg`}
            alt={name}
            height={10}
            width={200}
          />
        );
      case "google colab":
        return (
          <Image
            src={`${getPrefixRepo()}/images/listing/open-in-colab.svg`}
            alt={name}
            height={10}
            width={200}
          />
        );
      case "github release":
        return (
          <Image
            className=""
            src={`${getPrefixRepo()}/images/listing/github-mark${
              isLight ? "" : "-white"
            }.svg`}
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
              `${getPrefixRepo()}/images/logos/github-profile-dark${
                isLight ? "-light" : ""
              }.png`
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
      const itemView = props.itemView as Project;
      title = `${itemView.whatText}`;
      desc = `${itemView.result} | ${toTitleCase(props.type)} | ${
        itemView.company.name
      } | ${itemView.app.name}`;
      shareTxt = `${itemView.whatText} ${itemView.result}`;
      project = itemView;
      break;
    case "blogs":
      const b = props.itemView as Blog;
      title = b.title;
      desc = `${b.desc} | ${toTitleCase(props.type)} | ${
        env.NEXT_PUBLIC_PERSON_NAME
      }`;
      shareTxt = b.desc;
      break;
    case "apps":
      const a = props.itemView as App;
      title = a.title;
      desc = `${a.category} | ${toTitleCase(props.type)} | ${a.platforms
        .map((x) => x.name)
        .join(" | ")} | ${env.NEXT_PUBLIC_PERSON_NAME}`;
      shareTxt = a.title;
      break;
    case "company":
      const c = props.itemView as Company;
      title = c.title;
      desc = `${title} | ${toTitleCase(props.type)}`;
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
      case "apps":
        return (
          <>
            App name: <span>{(props.itemView as App).title}</span>
          </>
        );
      case "company":
        const data = props.itemView as Company;
        return (
          <div className="text-left">
            <p>
              Start: <DateTimePost date={data.start} />
            </p>
            <p>
              End:{" "}
              <span>
                {data.end > 0 ? <DateTimePost date={data.end} /> : "Present"}
              </span>
            </p>
          </div>
        );
      default:
        break;
    }
  }

  const githubEditUrl = urlJoin(
    getDataUrl(env.NEXT_PUBLIC_REPO_PATH),
    props.type,
    props.itemView.fileName,
    "?plain=1"
  );

  function metaData() {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-between gap-2 px-2 sm:flex-row sm:items-end 2xl:flex-col 2xl:items-end 2xl:px-0">
        <div className="p-card flex h-fit w-full flex-col items-start py-2 text-xs text-slate-500 sm:w-fit">
          {(props.type === "projects" || props.type === "company") && (
            <div className="flex items-center gap-1">
              Company Name:{" "}
              <div>
                <div className="flex items-center gap-1">
                  <Image
                    width={20}
                    height={20}
                    src={
                      project ? project.company.logoUrl : props.itemView.imgUrl
                    }
                    alt={
                      project
                        ? project.company.name
                        : (props.itemView as Company).title
                    }
                  />
                  <span>
                    {project
                      ? project.company.name
                      : (props.itemView as Company).title}
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center gap-1">{headerCard()}</div>
          <div className="flex items-center gap-1">
            Post date: <DateTimePost date={props.itemView.date} />
          </div>
          {props.type !== "apps" && (
            <div className="flex items-center gap-1">
              Read time: <span>{(props.itemView as Project).readTime} min</span>
            </div>
          )}
        </div>
        <ShareWith text={shareTxt} />
      </div>
    );
  }

  return (
    <>
      <SEO
        description={desc}
        title={title}
        imgUrl={props.itemView.imgUrl}
        ogType="article"
        itemView={props.itemView}
      />
      <div className="container mx-auto px-2">
        <div className="flex items-start justify-around gap-4">
          <div className="sticky top-5 hidden flex-1 2xl:inline">
            {metaData()}
          </div>
          <div>
            {props.type === "apps" && (
              <div className="container mx-auto mb-4 max-w-3xl space-y-4 px-2">
                <div className="flex w-full flex-col items-center justify-center">
                  <Image
                    src={props.itemView.imgUrl}
                    alt={(props.itemView as App).title}
                    width={100}
                    height={100}
                    blurDataURL={(props.itemView as App).imgBlurData}
                    placeholder="blur"
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
                  <div className="carousel-center carousel rounded-box my-0 w-full space-x-4 bg-base-300/40 p-4">
                    {(props.itemView as App).imgs.map((x, i) => (
                      <div
                        id={`image${i + 1}`}
                        key={x}
                        className="carousel-item relative h-72 w-[98%] xs:h-72 sm:h-80 md:h-[30rem]"
                      >
                        <ImageLegacy
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
            {props.type === "company" && (
              <div className="container mx-auto mb-4 max-w-3xl space-y-4 px-2">
                <div className="flex w-full flex-col items-center justify-center">
                  <Image
                    src={props.itemView.imgUrl}
                    alt={(props.itemView as Company).title}
                    width={100}
                    height={100}
                    blurDataURL={(props.itemView as Company).imgBlurData}
                    placeholder="blur"
                  />
                  <p className="text-center text-4xl font-semibold tracking-wider">
                    {(props.itemView as Company).title}
                  </p>

                  <Link
                    href={(props.itemView as Company).homePage}
                    target="_blank"
                    className="p-card mt-3 cursor-pointer"
                  >
                    Goto website
                  </Link>
                </div>
              </div>
            )}
            <div className="max-w-3xl">
              <MDRender
                key={props.itemView.date}
                data={props.data}
                imgBlurdata={props.imgBlurdata}
              />
            </div>
          </div>
          <div className="sticky top-24 hidden flex-1 2xl:inline">
            <TableOfContents nodes={props.toc} />
          </div>
        </div>
      </div>

      <div className="my-5 flex flex-wrap items-center justify-center gap-1">
        <Link
          className="title link-hover link-primary link capitalize"
          href={"/" + props.type}
        >
          {props.type}
        </Link>{" "}
        / {props.itemView.fileName}
        <div className="tooltip tooltip-bottom" data-tip="Edit this on Github">
          <Link href={githubEditUrl} target="_blank" rel="">
            <PencilSquareIcon className="link-hover link h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="flex w-full 2xl:hidden">{metaData()}</div>
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
                {props.type !== "apps" && props.type !== "company" && (
                  <LayoutCard data={props.previous} />
                )}
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
                {props.type !== "apps" && props.type !== "company" && (
                  <LayoutCard data={props.next} />
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {(props.type === "apps" || props.type === "company") && props.more4 && (
        <div
          key={`${props.itemView.fileName}`}
          className="mx-auto grid max-w-3xl gap-2 px-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        >
          {props.more4.map((x) => {
            if (props.type === "apps") {
              const m = x as App;
              return <LayoutCardApp {...m} key={x.date} />;
            } else {
              const m = x as Company;
              return <LayoutCardCompany {...m} key={x.date} />;
            }
          })}
        </div>
      )}
      <div className="container divider mx-auto max-w-3xl px-2" />
      <div className="container mx-auto max-w-3xl px-2">
        <Comments
          key={githubEditUrl}
          theme={isLight ? "light" : "dark_dimmed"}
        />
      </div>
    </>
  );
}
