import MeSection, { type MeSectionProps } from "../me_section/me_section";
import Testimonials, {
  type TestimonialsProps,
} from "../work_for_t/testimonials";
import WorkFor, { type WorkForProps } from "../work_for_t/work_for";
export interface HeroProps {
  me: MeSectionProps;
  company: WorkForProps;
  testis: TestimonialsProps;
}

export default function Hero(props: HeroProps) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 lg:flex-row lg:gap-0">
      <MeSection {...props.me} />
      <div className="md:space-y-4">
        <WorkFor {...props.company} />
        <Testimonials {...props.testis} />
      </div>
    </div>
  );
}
