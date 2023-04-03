import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export interface Blog {
  url: string;
  title: string;
  imgUrl: string;
  text: string;
  date: number;
  readTime: number;
}
export default function BlogCard(props: Blog) {
  return (
    <Link href={props.url}>
      <div className="p-card group relative h-80 cursor-pointer px-0 hover:shadow-xl hover:ring">
        <Image
          objectFit="cover"
          layout="fill"
          src={props.imgUrl}
          alt={props.title}
        />
        <div className="flex h-full flex-col items-end justify-end">
          <div className="relative m-1 max-h-[60%] overflow-hidden rounded-3xl bg-slate-100/80 backdrop-blur-md group-hover:bg-blue-100/90 group-hover:shadow-xl">
            <div className="absolute bottom-0 h-10 w-full bg-gradient-to-t from-slate-100 group-hover:from-blue-100" />

            <div className="w-full space-y-2 px-3 pb-2">
              <div>
                <div className="mb-1 mt-2 text-lg font-semibold leading-tight">
                  <span>{props.title}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <div>
                    {new Date(props.date).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div>{props.readTime} min reads</div>
                </div>
              </div>
              <div className="leading-snug">
                <p className="">{props.text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}