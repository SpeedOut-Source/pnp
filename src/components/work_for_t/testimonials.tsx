import dynamic from "next/dynamic";
import { type Testimonial } from "./testi_card";

export interface TestimonialsProps {
  testis: Testimonial[];
  addUrl: string;
}

const TestiCard = dynamic(() => import("./testi_card"));

export default function Testimonials(props: TestimonialsProps) {
  return (
    <div className="mx-auto h-fit w-full px-4 sm:mx-0 lg:max-w-2xl lg:px-0">
      <p className="text-2xl normal-case text-slate-400">Testimonials</p>
      <div className="mx-auto grid w-full items-center justify-center gap-2 py-4 sm:grid-cols-2 md:mx-2 md:grid-cols-3 md:gap-4">
        {props.testis.map((x) => (
          <TestiCard key={x.imgUrl} {...x} addUrl={props.addUrl} />
        ))}
      </div>
    </div>
  );
}
