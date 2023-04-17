import { type MeProps } from "~/components/me_section/me";
import {
  addBlur,
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
import {
  type App,
  type Blog,
  type Project,
  type WorkForProps,
} from "../utils/interfaces";
import { type AppsProps } from "~/components/apps/recent_apps";
import { getDataUrl } from "../utils/utils";

export interface Configs {
  appName: string;
  twitterHandle: string;
  repoPath: string;
  resumePath: string;
  baseUrl: string;
  baseImgPath: string;
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

  const allProsRaw = await getProjects();

  const allAppsRaw = await getApps();

  const allBlogsRaw = await getBlogs();

  const allPros: Project[] = await addBlur(allProsRaw.projects);
  const allApps: App[] = await addBlur(allAppsRaw.apps, 6);
  const allBlogs: Blog[] = await addBlur(allBlogsRaw.blogs);

  const testimonialAddUrl =
    getDataUrl(configs.repoPath) + "/home/testimonials.json";

  const homeProps: HomeProps = {
    configs,
    meSection: {
      me,
      techs,
    },
    workFor,
    testis: { ...testis, addUrl: testimonialAddUrl },
    recentApps: {
      data: allApps,
      total: dbConfig.appTotal,
    },
    recentProjects: {
      data: allPros,
      total: dbConfig.projectTotal,
    },
    recentBlogs: {
      data: allBlogs,
      total: dbConfig.blogTotal,
    },
  };

  return {
    props: homeProps,
  };
}
