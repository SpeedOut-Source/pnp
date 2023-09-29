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
    <div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-4 xl:flex-row xl:gap-0">
      <div className="xl:mr-3">
        <MeSection {...props.me} />
      </div>
      <div className="flex w-full flex-1 flex-col xl:space-y-2">
        <WorkFor {...props.company} />
        <Testimonials {...props.testis} />
      </div>
    </div>
  );
}
