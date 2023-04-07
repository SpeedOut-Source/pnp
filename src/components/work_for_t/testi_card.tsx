import { PlusIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
export interface Testimonial {
  imgUrl: string;
  fullName: string;
  position: string;
  text: string;
  blank?: boolean;
  addUrl?: string;
}
export default function TestiCard(props: Testimonial) {
  return (
    <div className="p-card group relative h-fit w-full space-y-3 p-3 text-justify">
      {props.blank && (
        <Link
          href={props.addUrl!}
          target="_blank"
          className="absolute z-40 h-full w-full bg-base-100/20 backdrop-blur-sm"
        >
          <div className="flex h-full cursor-pointer flex-col items-center justify-center group-hover:font-semibold">
            <PlusIcon className="h-8 w-8" />
            <span>Give Testimonial</span>
          </div>
        </Link>
      )}
      <div className="flex w-full items-center gap-2">
        <div className="relative h-12 w-12 overflow-hidden rounded-full ring ring-base-300">
          <Image
            src={props.imgUrl}
            alt={props.fullName}
            objectFit="cover"
            layout="fill"
          />
        </div>
        <div className="text-left tracking-wider">
          <p className="text-sm font-bold">{props.fullName}</p>
          <p className="text-xs">{props.position}</p>
        </div>
      </div>
      <p className="leading-normal">{props.text}</p>
    </div>
  );
}
