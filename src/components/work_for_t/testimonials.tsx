import TestiCard, { type Testimonial } from "./testi_card";

interface TestimonialsProps {
  testis: Testimonial[];
}

export default function Testimonials(props: TestimonialsProps) {
  return (
    <div className="mx-auto h-fit w-full px-4 sm:mx-0 lg:max-w-2xl lg:px-0">
      <p className="text-2xl normal-case text-slate-400">Testimonials</p>
      <div className="mx-auto grid w-full justify-center gap-2 py-4 sm:grid-cols-2 md:mx-2 md:grid-cols-3 md:gap-4">
        {props.testis.map((x) => (
          <TestiCard key={x.imgUrl} {...x} />
        ))}
      </div>
    </div>
  );
}
