import { promises } from "fs";
import { type Configs } from "../home/home_server";
import { type ResentBlogsProps } from "~/components/blogs/resent_blogs";
import { type Project } from "~/components/projects/project_card";
export interface DBConfigs {
  projectTotal: number;
  blogTotal: number;
}

export interface RawProjectsProps {
  projects: Project[];
}

export async function getData(path: string) {
  const data = await promises.readFile(`../portfolio_data/${path}`, "utf8");
  return Buffer.from(data);
}

export async function getConfigs() {
  const data = (await getData("configs.json")).toString();
  const configs = JSON.parse(data) as Configs;
  return configs;
}

export async function getDBConfigs() {
  const data = (await getData("db/configs.json")).toString();
  const configs = JSON.parse(data) as DBConfigs;
  return configs;
}

export async function getProjects() {
  const dataProjects = (await getData("db/projects.json")).toString();
  const allPros = JSON.parse(dataProjects) as RawProjectsProps;
  return allPros;
}

export async function getBlogs() {
  const dataBlogs = (await getData("db/blogs.json")).toString();
  const allBlogs = JSON.parse(dataBlogs) as ResentBlogsProps;
  return allBlogs;
}