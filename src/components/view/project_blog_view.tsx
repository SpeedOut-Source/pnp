"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import Loading from "~/components/markdown/loading";
import type {
  Project,
  Blog,
  CardItem,
  Card as CardType,
  App,
  Company,
  ImgBlurData,
} from "~/app_function/utils/interfaces";
import LayoutCardApp from "~/components/apps/layout_card";
import { DEFAULT_IS_LIGHT, useThemeStore } from "~/app_state/theme_mode";
import { useState, useEffect } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { getDataUrl, getPrefixRepo } from "~/app_function/utils/utils";
import LayoutCardCompany from "~/components/company/layout_card";
import urlJoin from "url-join";
import type { TransformNodeOutput } from "~/app_function/remark/headings";
import TableOfContents from "~/components/table_of_contents/toc";
import LRWrap from "~/components/article/lr_wrap";
import Spotlight from "~/components/spotlight";
import CarouselSlider from "~/components/carousel_slider";
import { env } from "~/env.mjs";

const Link = dynamic(() => import("next/link"));
const Image = dynamic(() => import("next/image"));
const ShareWith = dynamic(() => import("~/components/share_with"));
const DateTimePost = dynamic(() => import("~/components/date_time_post"), {
  ssr: false,
});

const MDRender = dynamic(() => import("~/components/markdown/md_render"), {
  loading: () => <Loading />,
});

const LayoutCard = dynamic(() => import("~/components/layout_card"));
const Comments = dynamic(() => import("~/components/comments"));

export interface ProjectBlogViewProps {
  data: string;
  imgBlurdata: ImgBlurData;
  itemView: CardItem;
  previous: CardItem | null;
  next: CardItem | null;
  more4: CardItem[] | null;
  type: CardType;
  toc: TransformNodeOutput[];
}

export function ProjectBlogView(props: ProjectBlogViewProps) {
  const utm = useThemeStore();
  const [isLight, setIsLight] = useState(DEFAULT_IS_LIGHT);

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
      shareTxt = `${itemView.whatText} ${itemView.result}`;
      project = itemView;
      break;
    case "blogs":
      const b = props.itemView as Blog;
      shareTxt = b.desc;
      break;
    case "apps":
      const a = props.itemView as App;
      shareTxt = a.title;
      break;
    case "company":
      const c = props.itemView as Company;
      shareTxt = c.title;
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
            <span>App:</span>
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
    "?plain=1",
  );

  function metaData() {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-between gap-2 px-2 sm:flex-row sm:items-end xl:flex-col xl:items-end xl:px-0">
        <div className="p-card flex h-fit w-full flex-col items-start overflow-visible py-2 text-xs text-slate-500 sm:w-fit">
          {(props.type === "projects" || props.type === "company") && (
            <div className="flex items-center gap-1">
              <span>Company :</span>
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
          <div className="flex items-center gap-1">
            Type:
            <div className="flex items-center gap-1">
              <Link
                className="title link-hover link link-primary capitalize"
                href={"/" + props.type}
              >
                {props.type}
              </Link>{" "}
              <div
                className="tooltip tooltip-right"
                data-tip="Edit this on Github"
              >
                <Link href={githubEditUrl} target="_blank" rel="">
                  <PencilSquareIcon className="link-hover link h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <ShareWith text={shareTxt} />
      </div>
    );
  }

  return (
    <>
      {(props.type === "apps" || props.type === "company") && <Spotlight />}
      <div className="px-2">
        <div className="mx-auto">
          <div className="flex items-start justify-around gap-4">
            <LRWrap>{metaData()}</LRWrap>
            <div className="my-2 w-full max-w-3xl">
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
                  <CarouselSlider
                    key={githubEditUrl}
                    images={(props.itemView as App).imgs}
                    imgsBlurData={(props.itemView as App).imgsBlurData}
                  />
                </div>
              )}
              {props.type === "company" && (
                <div className="mx-auto mb-4 max-w-3xl space-y-4 px-2">
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
              <MDRender
                key={props.itemView.date}
                data={props.data}
                imgBlurdata={props.imgBlurdata}
              />
            </div>
            <LRWrap>
              <TableOfContents nodes={props.toc} />
            </LRWrap>
          </div>
        </div>
        <div className="flex w-full xl:hidden">{metaData()}</div>
        <div className="mx-auto mt-2 max-w-3xl rounded-2xl border-2 border-base-content/5 bg-base-100/80">
          {(props.previous ?? props.next) && (
            <div className="container m-2 mx-auto max-w-3xl px-2">
              <div className="flex w-full items-center justify-center gap-4">
                {props.previous && (
                  <div className="h-fit w-full">
                    <div className="mb-2 flex items-center text-2xl normal-case text-slate-400">
                      <Link
                        href={`/${props.type}/view/${props.previous.fileName}`}
                        className="link-hover link flex items-center"
                      >
                        <ChevronLeftIcon className="h-6 w-6" />
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
          {(props.type === "apps" || props.type === "company") &&
            props.more4 && (
              <div
                key={`${props.itemView.fileName}`}
                className="xs:grid-cols-2 container m-2 mx-auto grid max-w-3xl gap-2 px-2 sm:grid-cols-3 lg:grid-cols-4"
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
        </div>
        <div className="mx-auto mt-2 max-w-3xl">
          <Comments
            key={githubEditUrl}
            theme={isLight ? "light" : "dark_dimmed"}
          />
        </div>
      </div>
    </>
  );
}
