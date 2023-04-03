import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export interface Project {
  url: string;
  imgUrl: string;
  app: { name: string; logoUrl: string };
  company: { name: string; logoUrl: string };
  whatText: string;
  result: string;
}
export default function ProjectCard(props: Project) {
  return (
    <Link href={props.url}>
      <div className="p-card group relative h-80 cursor-pointer px-0 hover:shadow-xl hover:ring">
        <Image
          objectFit="cover"
          layout="fill"
          src={props.imgUrl}
          alt={props.app.name}
        />
        <div className="flex h-full flex-col items-end justify-end">
          <div className="relative m-1 max-h-[60%] overflow-hidden rounded-3xl bg-slate-100/80 backdrop-blur-md group-hover:bg-blue-100/90 group-hover:shadow-xl">
            <div className="absolute bottom-0 h-10 w-full bg-gradient-to-t from-slate-100 group-hover:from-blue-100" />
            <div className="flex w-full items-center justify-center pt-2 font-bold uppercase text-blue-700/70">
              <span>Full case study</span>
              <ChevronRightIcon className="h-7 w-5" />
            </div>
            <div className="w-full space-y-2 px-3 pb-2">
              <div className="mx-4 space-y-1 text-sm">
                <div className="flex w-full items-center gap-2 font-bold">
                  <div className="relative h-5 w-5">
                    <Image
                      objectFit="cover"
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
                      objectFit="cover"
                      layout="fill"
                      src={props.company.logoUrl}
                      alt={props.company.name}
                    />
                  </div>
                  <span>{props.company.name}</span>
                </div>
              </div>
              <div className="leading-snug">
                <p>{props.whatText}</p>
                <p className="">{props.result}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
