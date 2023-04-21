import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import dynamic from "next/dynamic";

const Link = dynamic(() => import("next/link"));
const Image = dynamic(() => import("next/image"));

export interface Testimonial {
  imgUrl: string;
  fullName: string;
  position: string;
  text: string;
  blank?: boolean;
  addUrl?: string;
  link?: string;
}
export default function TestiCard(props: Testimonial) {
  return (
    <div className="p-card group relative mx-0 h-fit w-full space-y-3 overflow-visible px-0 py-4 text-justify hover:bg-base-200">
      {props.blank && (
        <Link
          href={props.addUrl ?? "#"}
          target="_blank"
          className="absolute z-40 h-full w-full bg-base-100/20 backdrop-blur-sm"
        >
          <div className="flex h-full cursor-pointer flex-col items-center justify-center group-hover:font-semibold">
            <PlusIcon className="h-8 w-8" />
            <span>Give Testimonial</span>
          </div>
        </Link>
      )}
      <div className="w-full px-3">
        <Link
          data-tip="Visit website"
          target="_blank"
          href={props.link ?? props.addUrl ?? "#"}
          className="tooltip flex w-full items-center gap-2 lg:items-start"
        >
          <div>
            <div className="relative h-12 w-12 overflow-hidden rounded-full ring ring-base-300">
              <Image
                src={props.imgUrl}
                alt={props.fullName}
                objectFit="cover"
                layout="fill"
              />
            </div>
          </div>
          <div className="text-left tracking-wider">
            <p style={{ whiteSpace: "pre-line" }} className="text-sm font-bold">
              {props.fullName}
            </p>
            <p style={{ whiteSpace: "pre-line" }} className="text-xs">
              {props.position}
            </p>
          </div>
        </Link>
      </div>
      <p
        style={{ whiteSpace: "pre-line" }}
        className="mx-4 text-xs leading-relaxed md:mx-3"
      >
        {props.text}
      </p>
    </div>
  );
}
