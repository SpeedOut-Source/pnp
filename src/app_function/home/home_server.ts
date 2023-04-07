import { type MeProps } from "~/components/me_section/me";
import {
  getBlogs,
  getConfigs,
  getData,
  getProjects,
} from "../utils/utils-server";
import { type RXTProps } from "~/components/me_section/r_x_t";
import { type MeSectionProps } from "~/components/me_section/me_section";
import { type TestimonialsProps } from "~/components/work_for_t/testimonials";
import { type ProjectsProps } from "~/components/projects/resent_projects";
import { type ResentBlogsProps } from "~/components/blogs/resent_blogs";
import { type WorkForProps } from "../utils/interfaces";

export interface Configs {
  appName: string;
  testimonialAddUrl: string;
  twitterHandle: string;
}

export interface HomeProps {
  configs: Configs;
  meSection: MeSectionProps;
  workFor: WorkForProps;
  testis: TestimonialsProps;
  resentProjects: ProjectsProps;
  resentBlogs: ResentBlogsProps;
}

export async function HomeServer() {
  const configs = await getConfigs();

  const dataBio = (await getData("home/bio.json")).toString();
  const me = JSON.parse(dataBio) as MeProps;

  const dataExpertise = (await getData("home/expertise.json")).toString();
  const techs = JSON.parse(dataExpertise) as RXTProps;

  const dataWorkFor = (await getData("home/workInfo.json")).toString();
  const workFor = JSON.parse(dataWorkFor) as WorkForProps;

  const dataTesti = (await getData("home/testimonials.json")).toString();
  const testis = JSON.parse(dataTesti) as TestimonialsProps;

  const allPros = await getProjects();

  const allBlogs = await getBlogs();

  const homeProps: HomeProps = {
    configs,
    meSection: {
      me,
      techs,
    },
    workFor,
    testis: { ...testis, addUrl: configs.testimonialAddUrl },
    resentProjects: {
      data: allPros.projects.slice(0, 3),
    },
    resentBlogs: {
      data: allBlogs.blogs.slice(0, 3),
    },
  };

  return {
    props: homeProps,
  };
}
