import { promises } from "fs";
import { type Configs } from "../home/home_server";
import { type ResentBlogsProps } from "~/components/blogs/resent_blogs";
import { type Project } from "~/components/projects/project_card";
import { type Blog } from "~/components/blogs/blogs_card";
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

export function parseProject(md_text: string, fileName: string) {
  const app_name = md_text.split("appName: ")[1]?.split("\n")[0] ?? "";
  const app_logo = md_text.split("appLogo: ")[1]?.split("\n")[0] ?? "";
  const company_name = md_text.split("companyName: ")[1]?.split("\n")[0] ?? "";
  const company_logo = md_text.split("companyLogo: ")[1]?.split("\n")[0] ?? "";
  const date = parseInt(md_text.split("date: ")[1]?.split("\n")[0] ?? "0");
  const read_time = parseInt(
    md_text.split("readTime: ")[1]?.split("\n")[0] ?? "0"
  );
  const img_url = md_text.split("imgUrl: ")[1]?.split("\n")[0] ?? "";
  const what_text = md_text.split("whatText: ")[1]?.split("\n")[0] ?? "";
  const result = md_text.split("result: ")[1]?.split("\n")[0] ?? "";

  const project: Project = {
    imgUrl: img_url,
    app: { name: app_name, logoUrl: app_logo },
    company: { name: company_name, logoUrl: company_logo },
    whatText: what_text,
    result: result,
    date: date,
    readTime: read_time,
    fileName,
  };
  return project;
}

export function getProject(
  data:
    | {
        appName: string;
        appLogo: string;
        companyName: string;
        companyLogo: string;
        date: number;
        readTime: number;
        imgUrl: string;
        whatText: string;
        result: string;
      }
    | {
        [key: string]: string;
      },
  fileName: string
): Project {
  return {
    imgUrl: data.imgUrl,
    app: {
      name: data.appName,
      logoUrl: data.appLogo,
    },
    company: {
      name: data.companyName,
      logoUrl: data.companyLogo,
    },
    whatText: data.whatText,
    result: data.result,
    date: data.date as number,
    readTime: data.readTime as number,
    fileName: fileName,
  };
}

export function getBlog(
  data:
    | {
        title: string;
        imgUrl: string;
        desc: string;
        date: number;
        readTime: number;
      }
    | {
        [key: string]: string | number;
      },
  fileName: string
): Blog {
  return {
    title: data.title as string,
    imgUrl: data.imgUrl as string,
    desc: data.desc as string,
    date: data.date as number,
    readTime: data.readTime as number,
    fileName: fileName,
  };
}

export function parseBlog(md_text: string, filename: string): Blog {
  const title = md_text.split("title: ")[1]?.split("\n")[0] ?? "";
  const desc = md_text.split("desc: ")[1]?.split("\n")[0] ?? "";
  const date = parseInt(md_text.split("date: ")[1]?.split("\n")[0] ?? "0");
  const read_time = parseInt(
    md_text.split("readTime: ")[1]?.split("\n")[0] ?? "0"
  );
  const img_url = md_text.split("imgUrl: ")[1]?.split("\n")[0] ?? "";

  const blog: Blog = {
    imgUrl: img_url,
    title: title,
    desc: desc,
    date: date,
    readTime: read_time,
    fileName: filename,
  };

  return blog;
}
