import dynamic from "next/dynamic";
import { type TestimonialHit } from "~/app_function/types/HitTypes";
import { HighlightSwitch } from "../search/highlight_switch";

const Link = dynamic(() => import("next/link"));
const Image = dynamic(() => import("next/legacy/image"));

export type Testimonial = {
  imgUrl: string;
  imgBlurData?: string;
  fullName: string;
  position: string;
  text: string;
  blank?: boolean;
  addUrl?: string;
  link?: string;
};
export default function TestiCard(props: Testimonial) {
  return (
    <div className="p-card group relative mx-0 h-fit w-full space-y-3 overflow-visible px-0 py-4 text-justify hover:bg-base-200">
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
                placeholder="blur"
                blurDataURL={props.imgBlurData}
                src={props.imgUrl}
                alt={props.fullName}
                objectFit="cover"
                layout="fill"
              />
            </div>
          </div>
          <div className="text-left tracking-wider">
            <p style={{ whiteSpace: "pre-line" }} className="text-sm font-bold">
              <HighlightSwitch
                hit={props as TestimonialHit}
                attribute="fullName"
                data={props.fullName}
              />
            </p>
            <p style={{ whiteSpace: "pre-line" }} className="text-xs">
              <HighlightSwitch
                hit={props as TestimonialHit}
                attribute="position"
                data={props.position}
              />
            </p>
          </div>
        </Link>
      </div>
      <p
        style={{ whiteSpace: "pre-line" }}
        className="mx-4 text-xs leading-relaxed md:mx-3"
      >
        <HighlightSwitch
          hit={props as TestimonialHit}
          attribute="text"
          data={props.text}
        />
      </p>
    </div>
  );
}
