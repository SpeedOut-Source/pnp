import { type MeProps } from "~/components/me_section/me";
import { getData } from "../utils/utils";
import { type RXTProps } from "~/components/me_section/r_x_t";
import { type MeSectionProps } from "~/components/me_section/me_section";
import { type WorkForProps } from "~/components/work_for_t/work_for";
import { type TestimonialsProps } from "~/components/work_for_t/testimonials";

export interface Configs {
  appName: string;
  testimonialAddUrl: string;
}

export interface HomeProps {
  configs: Configs;
  meSection: MeSectionProps;
  workFor: WorkForProps;
  testis: TestimonialsProps;
}

export async function HomeServer() {
  const data = (await getData("configs.json")).toString();
  const configs = JSON.parse(data) as Configs;

  const dataBio = (await getData("home/bio.json")).toString();
  const me = JSON.parse(dataBio) as MeProps;

  const dataExpertise = (await getData("home/expertise.json")).toString();
  const techs = JSON.parse(dataExpertise) as RXTProps;

  const dataWorkFor = (await getData("home/workInfo.json")).toString();
  const workFor = JSON.parse(dataWorkFor) as WorkForProps;

  const dataTesti = (await getData("home/testimonials.json")).toString();
  const testis = JSON.parse(dataTesti) as TestimonialsProps;

  const homeProps: HomeProps = {
    configs,
    meSection: {
      me,
      techs,
    },
    workFor,
    testis: { ...testis, addUrl: configs.testimonialAddUrl },
  };

  return {
    props: homeProps,
  };
}
