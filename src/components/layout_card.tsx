import ChevronRightIcon from "@heroicons/react/24/outline/ChevronRightIcon";
import { isPro, toViewTransitionName } from "~/app_function/utils/utils";
import { unstable_ViewTransition as ViewTransition } from "react";
import {
  type Project,
  type CardItem,
  type Blog,
} from "~/app_function/utils/interfaces";
import PhotoIcon from "@heroicons/react/24/outline/PhotoIcon";
import dynamic from "next/dynamic";
import { type BlogHit, type ProjectHit } from "~/app_function/types/HitTypes";
import ThumTime from "./thum_time";
import { HighlightSwitch } from "./search/highlight_switch";

const Link = dynamic(() => import("next/link"));
const Image = dynamic(() => import("next/legacy/image"));

interface LayoutCard {
  data: CardItem;
}

export default function LayoutCard({ data }: LayoutCard) {
  const isProject = isPro(data);
  const transitionName = toViewTransitionName(
    (data as Project | Blog).fileName,
    isProject ? "project" : "blog",
  );
  return (
    <ViewTransition name={transitionName}>
      <Link
        href={`/${isProject ? "projects" : "blogs"}/view/${data.fileName}`}
        className="p-card group relative h-80 w-full cursor-pointer overflow-hidden px-0 text-justify ring ring-base-300 hover:shadow-xl hover:ring hover:ring-blue-200"
      >
        {data.imgUrl ? (
          <div>
            {data.imgBlurData && (
              <Image
                loading="lazy"
                objectFit="cover"
                layout="fill"
                src={data.imgBlurData}
                alt={"Blur preview"}
              />
            )}
            <Image
              blurDataURL={data.imgBlurData ?? undefined}
              placeholder={data.imgBlurData ? "blur" : undefined}
              loading="lazy"
              objectFit="contain"
              objectPosition="50% 0"
              layout="fill"
              src={data.imgUrl}
              alt={isProject ? data.app.name : data.title}
            />
          </div>
        ) : (
          <div className="absolute">
            <PhotoIcon className="mx-auto h-10 w-10" />
            <div>No image</div>
          </div>
        )}
        <div className="mx-1 flex h-full w-full flex-col items-end justify-end">
          <div className="relative mb-1 max-h-[60%] w-full overflow-hidden rounded-3xl bg-base-100 ring-2 ring-base-300/50 group-hover:max-h-full group-hover:shadow-xl md:bg-base-100/90 md:group-hover:bg-base-100/70 md:group-hover:backdrop-blur-sm">
            <div className="absolute bottom-0 hidden h-10 w-full bg-gradient-to-t from-base-100 group-hover:from-transparent md:inline">
              <div className="hidden w-full items-center justify-center pt-2 font-bold uppercase text-blue-500/70 group-hover:flex">
                <span>{isProject ? "Full case study" : "Read more"}</span>
                <ChevronRightIcon className="h-7 w-5" />
              </div>
            </div>

            <div className="w-full px-2 py-2">
              <div className="mx-2 mb-1 flex items-center justify-between text-sm">
                {isProject ? (
                  <div className="space-y-[0.2rem]">
                    <div className="flex w-full items-center gap-2 font-bold">
                      <div className="relative h-5 w-5">
                        <Image
                          objectFit="fill"
                          layout="fill"
                          src={data.app.logoUrl}
                          alt={data.app.name}
                        />
                      </div>
                      <HighlightSwitch
                        hit={data as ProjectHit}
                        attribute={["app", "name"]}
                        data={data.app.name}
                      />
                    </div>
                    <div className="flex w-full items-center gap-2">
                      <div className="relative h-5 w-5">
                        <Image
                          objectFit="fill"
                          layout="fill"
                          src={data.company.logoUrl}
                          alt={data.company.name}
                        />
                      </div>
                      <HighlightSwitch
                        hit={data as ProjectHit}
                        attribute={["company", "name"]}
                        data={data.company.name}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-md mt-2 text-justify font-semibold leading-tight">
                    <HighlightSwitch
                      hit={data as BlogHit}
                      attribute="title"
                      data={data.title}
                    />
                  </div>
                )}
              </div>
              <div className={`mx-2 mb-1 flex justify-between gap-2 text-xs`}>
                <ThumTime date={data.date} />
                <div>{(data as Project | Blog).readTime} min</div>
              </div>

              <div className="mb-2 text-xs leading-snug">
                {isProject ? (
                  <div className="space-x-1">
                    <span className="font-semibold">
                      <HighlightSwitch
                        hit={data as ProjectHit}
                        attribute="whatText"
                        data={data.whatText}
                      />
                    </span>
                    <span>
                      <HighlightSwitch
                        hit={data as ProjectHit}
                        attribute="result"
                        data={data.result}
                      />
                    </span>
                  </div>
                ) : (
                  <p>
                    <HighlightSwitch
                      hit={data as BlogHit}
                      attribute="desc"
                      data={(data as BlogHit).desc}
                    />
                  </p>
                )}
              </div>
              <div className="h-0 transition-all duration-100 ease-in-out md:group-hover:h-5" />
            </div>
          </div>
        </div>
      </Link>
    </ViewTransition>
  );
}
