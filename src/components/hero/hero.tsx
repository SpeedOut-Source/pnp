import dynamic from "next/dynamic";
import { type MeSectionProps } from "../me_section/me_section";
import { type TestimonialsProps } from "../work_for_t/testimonials";
import { type WorkForProps } from "~/app_function/utils/interfaces";

const WorkFor = dynamic(() => import("../company/work_for"));
const Testimonials = dynamic(() => import("../work_for_t/testimonials"));
const MeSection = dynamic(() => import("../me_section/me_section"));

export interface HeroProps {
  me: MeSectionProps;
  company: WorkForProps;
  testis: TestimonialsProps;
}

export default function Hero(props: HeroProps) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 lg:flex-row lg:gap-0">
      <MeSection {...props.me} />
      <div className="md:space-y-2">
        <WorkFor {...props.company} />
        <Testimonials {...props.testis} />
      </div>
    </div>
  );
}
