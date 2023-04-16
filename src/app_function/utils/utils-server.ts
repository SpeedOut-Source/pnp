/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { promises } from "fs";
import { type Configs } from "../home/home_server";
import {
  type Card,
  type Blog,
  type Project,
  type CardData,
} from "./interfaces";
import { type App } from "./interfaces";
import { getPlaiceholder } from "plaiceholder";
import { parse } from "path";

export interface DBConfigs {
  projectTotal: number;
  blogTotal: number;
  appTotal: number;
}

export interface RawProjectsProps {
  projects: Project[];
}

export interface RawAppsProps {
  apps: App[];
}

export interface RawBlogsProps {
  blogs: Blog[];
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

export async function getProjects(): Promise<RawProjectsProps> {
  try {
    const dataProjects = (await getData("db/projects.json")).toString();
    const allPros = JSON.parse(dataProjects) as RawProjectsProps;
    return allPros;
  } catch (e) {
    return { projects: [] };
  }
}

export async function getApps(): Promise<RawAppsProps> {
  try {
    const dataApps = (await getData("db/apps.json")).toString();
    const allApps = JSON.parse(dataApps) as RawAppsProps;
    return allApps;
  } catch (e) {
    return { apps: [] };
  }
}

export async function getBlogs(): Promise<RawBlogsProps> {
  try {
    const dataBlogs = (await getData("db/blogs.json")).toString();
    const allBlogs = JSON.parse(dataBlogs) as RawBlogsProps;
    return allBlogs;
  } catch (e) {
    return { blogs: [] };
  }
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

export async function getCard(type: Card) {
  let allData: CardData;
  switch (type) {
    case "projects":
      const projects = (await getProjects()).projects;
      allData = await addBlur(projects, projects.length);
      break;
    case "blogs":
      const blogs = (await getBlogs()).blogs;
      allData = await addBlur(blogs, blogs.length);
      break;
    default:
      const apps = (await getApps()).apps;
      allData = await addBlur(apps, apps.length);
      break;
  }
  return allData;
}

export async function getBlurData(imgUrl: string, isUrl = true) {
  if (isUrl && getFileExtSSR(imgUrl) === "gif") {
    return null;
  }

  try {
    const { base64 } = await getPlaiceholder(imgUrl);
    return base64;
  } catch (e) {
    // log.error( e);
    return null;
  }
}

export function getFileExtSSR(urlinput: string) {
  const url = new URL(urlinput);
  if (!url.pathname) {
    return "";
  }
  const { ext } = parse(url.pathname);
  const woExt = ext.replace(".", "");
  return woExt;
}

export async function addBlur<T>(data: T[], limit = 3) {
  const rData: T[] = [];
  for (let index = 0; index < limit; index++) {
    const element = data[index];
    if (!element) continue;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const imgBlurData = await getBlurData(
      (element as unknown as { imgUrl: string }).imgUrl,
      false
    );
    rData.push({ ...element, imgBlurData });
  }
  return rData;
}
