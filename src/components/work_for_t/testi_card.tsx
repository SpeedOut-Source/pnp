import dynamic from "next/dynamic";
import { Highlight } from "../search/Highlight";
import { type TestimonialHit } from "~/app_function/types/HitTypes";

const Link = dynamic(() => import("next/link"));
const Image = dynamic(() => import("next/legacy/image"));

export type Testimonial = {
  imgUrl: string;
  fullName: string;
  position: string;
  text: string;
  blank?: boolean;
  addUrl?: string;
  link?: string;
};
export default function TestiCard(props: Testimonial) {
  return (
    <div
      className="p-card group relative mx-0 h-fit w-full space-y-3 overflow-visible px-0 py-4 text-justify hover:bg-base-200">
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
              <Highlight
                hit={props as TestimonialHit}
                attribute="fullName"
              />
            </p>
            <p style={{ whiteSpace: "pre-line" }} className="text-xs">
              <Highlight
                hit={props as TestimonialHit}
                attribute="position"
              />
            </p>
          </div>
        </Link>
      </div>
      <p
        style={{ whiteSpace: "pre-line" }}
        className="mx-4 text-xs leading-relaxed md:mx-3"
      >
        <Highlight hit={props as TestimonialHit} attribute="text" />
      </p>
    </div>
  );
}
