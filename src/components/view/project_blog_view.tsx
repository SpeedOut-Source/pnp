import { unstable_ViewTransition as ViewTransition } from "react";
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
import { getDataUrl, toViewTransitionName } from "~/app_function/utils/utils";
import LayoutCardCompany from "~/components/company/layout_card";
import urlJoin from "url-join";
import type { TransformNodeOutput } from "~/app_function/remark/headings";
import TableOfContents from "~/components/table_of_contents/toc";
import LRWrap from "~/components/article/lr_wrap";
import Spotlight from "~/components/spotlight";
import CarouselSlider from "~/components/carousel_slider";
import { env } from "~/env.mjs";
import GetLogoListing from "./get_logo_listing";
import MetaData from "./meta_data";
import TagsShow from "~/components/view/tags_show";

const Link = dynamic(() => import("next/link"));
const Image = dynamic(() => import("next/image"));
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
  let shareTxt: string;
  let project: Project | undefined = undefined;
  let transitionName = "";

  switch (props.type) {
    case "projects":
      const itemView = props.itemView as Project;
      shareTxt = `${itemView.whatText} ${itemView.result}`;
      project = itemView;
      transitionName = toViewTransitionName(itemView.fileName, "project");
      break;
    case "blogs":
      const b = props.itemView as Blog;
      shareTxt = b.desc;
      transitionName = toViewTransitionName(b.fileName, "blog");
      break;
    case "apps":
      const a = props.itemView as App;
      shareTxt = a.title;
      transitionName = toViewTransitionName(a.fileName, "app");
      break;
    case "company":
      const c = props.itemView as Company;
      shareTxt = c.title;
      transitionName = toViewTransitionName(c.fileName, "company");
      break;
  }

  const githubEditUrl = urlJoin(
    getDataUrl(env.NEXT_PUBLIC_REPO_PATH),
    props.type,
    props.itemView.fileName,
    "?plain=1",
  );

  return (
    <>
      {(props.type === "apps" || props.type === "company") && <Spotlight />}
      <div className="px-2">
        <div className="mx-auto">
          <div className="flex items-start justify-around gap-4">
            <LRWrap>
              <MetaData
                {...props}
                project={project}
                githubEditUrl={githubEditUrl}
                shareTxt={shareTxt}
              />
            </LRWrap>
            <div className="my-2 w-full max-w-3xl">
              {props.type === "apps" && (
                <div className="container mx-auto mb-4 max-w-3xl space-y-4 px-2">
                  <div className="flex w-full flex-col items-center justify-center">
                    <ViewTransition name={transitionName}>
                      <Image
                        src={props.itemView.imgUrl}
                        alt={(props.itemView as App).title}
                        width={100}
                        height={100}
                        blurDataURL={(props.itemView as App).imgBlurData}
                        placeholder="blur"
                      />
                    </ViewTransition>
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
                              <GetLogoListing
                                name={x.name}
                                appLogo={props.itemView.imgUrl}
                              />
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
                    <ViewTransition name={transitionName}>
                      <Image
                        src={props.itemView.imgUrl}
                        alt={(props.itemView as Company).title}
                        width={100}
                        height={100}
                        blurDataURL={(props.itemView as Company).imgBlurData}
                        placeholder="blur"
                      />
                    </ViewTransition>
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
              <ViewTransition
                name={
                  props.type === "company" || props.type === "apps"
                    ? undefined
                    : transitionName
                }
              >
                <MDRender
                  key={props.itemView.date}
                  data={props.data}
                  imgBlurdata={props.imgBlurdata}
                />
              </ViewTransition>
              {props.itemView.tags ? (
                <TagsShow
                  className="!mb-0 mt-2 !pb-0"
                  type={props.type}
                  tags={props.itemView.tags.map((x) => ({ tag: x, date: 0 }))}
                />
              ) : (
                <></>
              )}
            </div>
            <LRWrap>
              <TableOfContents nodes={props.toc} />
            </LRWrap>
          </div>
        </div>
        <div className="flex w-full xl:hidden">
          <MetaData
            {...props}
            project={project}
            githubEditUrl={githubEditUrl}
            shareTxt={shareTxt}
          />
        </div>
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
          <Comments key={githubEditUrl} />
        </div>
      </div>
    </>
  );
}
