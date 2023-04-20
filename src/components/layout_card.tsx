import ChevronRightIcon from "@heroicons/react/24/outline/ChevronRightIcon";
import { isPro } from "~/app_function/utils/utils";
import {
  type Project,
  type CardItem,
  type Blog,
} from "~/app_function/utils/interfaces";
import PhotoIcon from "@heroicons/react/24/outline/PhotoIcon";
import dynamic from "next/dynamic";

const Link = dynamic(() => import("next/link"));
const Image = dynamic(() => import("next/image"));
const ThumTime = dynamic(() => import("./thum_time"), { ssr: false });

interface LayoutCard {
  data: CardItem;
}

export default function LayoutCard({ data }: LayoutCard) {
  const isProject = isPro(data);
  return (
    <Link href={`/${isProject ? "projects" : "blogs"}/view/${data.fileName}`}>
      <div className="p-card group relative h-80 w-full cursor-pointer overflow-hidden px-0 text-justify ring ring-base-300 hover:shadow-xl hover:ring hover:ring-blue-200">
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
              blurDataURL={data.imgBlurData ? data.imgBlurData : undefined}
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
          <div className="relative mb-1 max-h-[60%] w-full overflow-hidden rounded-3xl bg-base-100/70 backdrop-blur-md group-hover:max-h-full group-hover:bg-base-100/80 group-hover:shadow-xl">
            <div className="absolute bottom-0 h-10 w-full bg-gradient-to-t from-base-100 group-hover:from-transparent">
              <div className="hidden w-full items-center justify-center pt-2 font-bold uppercase text-blue-500/70 group-hover:flex">
                <span>{isProject ? "Full case study" : "Read more"}</span>
                <ChevronRightIcon className="h-7 w-5" />
              </div>
            </div>

            <div className="w-full px-2 py-2 ">
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
                      <span>{data.app.name}</span>
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
                      <span>{data.company.name}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-md mt-2 text-justify font-semibold leading-tight">
                    <span>{data.title}</span>
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
                    <span className="font-semibold">{data.whatText}</span>
                    <span>{data.result}</span>
                  </div>
                ) : (
                  <p>{(data as Blog).desc}</p>
                )}
              </div>
              <div className=" h-0 transition-all duration-100 ease-in-out group-hover:h-5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
