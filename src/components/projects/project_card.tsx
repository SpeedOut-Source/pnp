import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export interface Project {
  imgUrl: string;
  app: { name: string; logoUrl: string };
  company: { name: string; logoUrl: string };
  whatText: string;
  result: string;
  date: number;
  readTime: number;
  fileName: string;
}
export default function ProjectCard(props: Project) {
  return (
    <Link href={`/projects/view/${props.fileName}`}>
      <div className="p-card group relative h-80 cursor-pointer px-0 text-justify hover:shadow-xl hover:ring">
        <Image
          objectFit="cover"
          layout="fill"
          src={props.imgUrl}
          alt={props.app.name}
        />
        <div className="flex h-full flex-col items-end justify-end">
          <div className="relative m-1 max-h-[60%] overflow-hidden rounded-3xl bg-slate-100/80 backdrop-blur-md group-hover:max-h-full group-hover:bg-blue-100/90 group-hover:shadow-xl">
            <div className="absolute bottom-0 h-10 w-full bg-gradient-to-t from-slate-100 group-hover:from-blue-100">
              <div className="hidden w-full items-center justify-center pt-2 font-bold uppercase text-blue-700/70 group-hover:flex">
                <span>Full case study</span>
                <ChevronRightIcon className="h-7 w-5" />
              </div>
            </div>

            <div className="w-full space-y-2 px-2 py-2 ">
              <div className="mx-2 flex items-center justify-between text-sm">
                <div>
                  <div className="flex w-full items-center gap-2 font-bold">
                    <div className="relative h-5 w-5">
                      <Image
                        objectFit="fill"
                        layout="fill"
                        src={props.app.logoUrl}
                        alt={props.app.name}
                      />
                    </div>
                    <span>{props.app.name}</span>
                  </div>
                  <div className="flex w-full items-center gap-2">
                    <div className="relative h-5 w-5">
                      <Image
                        objectFit="fill"
                        layout="fill"
                        src={props.company.logoUrl}
                        alt={props.company.name}
                      />
                    </div>
                    <span>{props.company.name}</span>
                  </div>
                </div>
                <div className="text-right text-xs">
                  <div>
                    {new Date(props.date).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div>{props.readTime} min</div>
                </div>
              </div>

              <div className="text-xs leading-snug">
                <span className="font-semibold">{props.whatText}</span>{" "}
                <span className="">{props.result}</span>
              </div>
              <div className="hidden h-5 group-hover:flex" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
