import Link from "next/link";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { isPro } from "~/app_function/utils/utils";
import { type Blog, type Project } from "~/app_function/utils/interfaces";
import { PhotoIcon } from "@heroicons/react/24/outline";

type Data = Blog | Project;

interface LayoutCard {
  data: Data;
}

export default function LayoutCard({ data }: LayoutCard) {
  const isProject = isPro(data);
  return (
    <Link href={`/${isProject ? "projects" : "blogs"}/view/${data.fileName}`}>
      <div className="p-card group relative h-80 cursor-pointer overflow-hidden px-0 text-justify ring ring-base-300 hover:shadow-xl hover:ring hover:ring-blue-200">
        {data.imgUrl ? (
          <Image
            loading="lazy"
            objectFit="cover"
            layout="fill"
            src={data.imgUrl}
            alt={isProject ? data.app.name : data.title}
          />
        ) : (
          <div className="absolute">
            <PhotoIcon className="mx-auto h-10 w-10" />
            <div>No image</div>
          </div>
        )}
        <div className="flex h-full flex-col items-end justify-end">
          <div className="relative m-1 max-h-[60%] overflow-hidden rounded-3xl bg-base-100/70 backdrop-blur-md group-hover:max-h-full group-hover:bg-base-100/80 group-hover:shadow-xl">
            <div className="absolute bottom-0 h-10 w-full bg-gradient-to-t from-base-100 group-hover:from-base-100">
              <div className="hidden w-full items-center justify-center pt-2 font-bold uppercase text-blue-700/70 group-hover:flex">
                <span>{isProject ? "Full case study" : "Read more"}</span>
                <ChevronRightIcon className="h-7 w-5" />
              </div>
            </div>

            <div className="w-full space-y-2 px-2 py-2 ">
              <div className="mx-2 flex items-center justify-between text-sm">
                {isProject ? (
                  <div>
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
                  <div className="text-md mb-1 mt-2 text-justify font-semibold leading-tight">
                    <span>{data.title}</span>
                  </div>
                )}
                <div className={`text-right text-xs`}>
                  <div>
                    {new Date(data.date).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div>{data.readTime} min</div>
                </div>
              </div>

              <div className="text-xs leading-snug">
                {isProject ? (
                  <>
                    <span className="font-semibold">{data.whatText}</span>
                    <span className="">{data.result}</span>
                  </>
                ) : (
                  <p className="">{data.desc}</p>
                )}
              </div>
              <div className="hidden h-5 group-hover:flex" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
