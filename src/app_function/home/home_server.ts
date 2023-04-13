import { type MeProps } from "~/components/me_section/me";
import {
  getApps,
  getBlogs,
  getConfigs,
  getDBConfigs,
  getData,
  getProjects,
} from "../utils/utils-server";
import { type RXTProps } from "~/components/me_section/r_x_t";
import { type MeSectionProps } from "~/components/me_section/me_section";
import { type TestimonialsProps } from "~/components/work_for_t/testimonials";
import { type ProjectsProps } from "~/components/projects/recent_projects";
import { type RecentBlogsProps } from "~/components/blogs/recent_blogs";
import { type WorkForProps } from "../utils/interfaces";
import { type AppsProps } from "~/components/apps/recent_apps";

export interface Configs {
  appName: string;
  testimonialAddUrl: string;
  twitterHandle: string;
  resumeUrl: string;
}

export interface HomeProps {
  configs: Configs;
  meSection: MeSectionProps;
  workFor: WorkForProps;
  testis: TestimonialsProps;
  recentApps: AppsProps;
  recentProjects: ProjectsProps;
  recentBlogs: RecentBlogsProps;
}

export async function HomeServer() {
  const configs = await getConfigs();
  const dbConfig = await getDBConfigs();

  const dataBio = (await getData("home/bio.json")).toString();
  const me = JSON.parse(dataBio) as MeProps;

  const dataExpertise = (await getData("home/expertise.json")).toString();
  const techs = JSON.parse(dataExpertise) as RXTProps;

  const dataWorkFor = (await getData("home/workInfo.json")).toString();
  const workFor = JSON.parse(dataWorkFor) as WorkForProps;

  const dataTesti = (await getData("home/testimonials.json")).toString();
  const testis = JSON.parse(dataTesti) as TestimonialsProps;

  const allPros = await getProjects();

  const allApps = await getApps();

  const allBlogs = await getBlogs();

  const homeProps: HomeProps = {
    configs,
    meSection: {
      me,
      techs,
    },
    workFor,
    testis: { ...testis, addUrl: configs.testimonialAddUrl },
    recentApps: {
      data: allApps.apps.slice(0, 6),
      total: dbConfig.appTotal,
    },
    recentProjects: {
      data: allPros.projects.slice(0, 3),
      total: dbConfig.projectTotal,
    },
    recentBlogs: {
      data: allBlogs.blogs.slice(0, 3),
      total: dbConfig.blogTotal,
    },
  };

  return {
    props: homeProps,
  };
}
