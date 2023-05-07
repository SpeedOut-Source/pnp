import { type TestimonialHit } from "~/app_function/types/HitTypes";
import TestiCard, { type Testimonial } from "./testi_card";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export interface SearchTestimonialsProps {
  data: Testimonial[] | TestimonialHit[];
}

export default function SearchTestimonials(props: SearchTestimonialsProps) {
  if (props.data.length <= 0) return <></>;

  return (
    <div className="mx-4">
      <p className="flex items-center gap-2 text-2xl normal-case text-slate-400">
        <ChatBubbleLeftRightIcon className="h-5 w-5" /> Testimonials{" "}
      </p>
      <div className="grid items-start justify-center gap-2 py-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {props.data.map((x) => (
          <TestiCard key={x.imgUrl} {...x} />
        ))}
      </div>
    </div>
  );
}
