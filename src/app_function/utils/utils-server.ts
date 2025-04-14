import { promises } from "fs";
import type {
  App,
  Blog,
  Card,
  CardData,
  Company,
  ImgBlurData,
  Project,
} from "./interfaces";
import { join, parse } from "path";
import { type TestimonialsProps } from "~/components/work_for_t/testimonials";
import { env } from "../../env.mjs";
import { getBlurData } from "./blur_cache";

export interface RXTProps {
  techs: string[];
}

export interface DBConfigs {
  projectTotal: number;
  blogTotal: number;
  appTotal: number;
  companyTotal: number;
  total?: number;
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

export interface RawCompanyProps {
  company: Company[];
}

export type TagsListType = { tag: string; date: number }[];

export type TagsType = { tags: TagsListType };

export type TotalTagsType = {
  tags: {
    tag: string;
    exist: {
      type: string;
      total: number;
      date: number;
    }[];
    latest_date: number;
    total: number;
  }[];
};
export async function getData(path: string) {
  const data = await promises.readFile(join(env.DATA_PATH, path), "utf8");
  return Buffer.from(data);
}

export async function getDBConfigs(tag?: string, card?: Card) {
  if (tag && card) {
    const data = (
      await getData(`db/tags/${card}/${tag}/configs.json`)
    ).toString();
    return JSON.parse(data) as DBConfigs;
  }

  const data = (await getData("db/configs.json")).toString();
  return JSON.parse(data) as DBConfigs;
}

export async function getTagConfigs(card?: Card) {
  const data = (await getData(`db/tags/${card}/configs.json`)).toString();
  return JSON.parse(data) as TagsType;
}

export async function getProjects(tag?: string): Promise<RawProjectsProps> {
  try {
    let dataProjects: string;
    if (tag) {
      dataProjects = (
        await getData(`db/tags/projects/${tag}/data.json`)
      ).toString();
    } else {
      dataProjects = (await getData("db/projects.json")).toString();
    }
    return JSON.parse(dataProjects) as RawProjectsProps;
  } catch {
    return { projects: [] };
  }
}

export async function getApps(tag?: string): Promise<RawAppsProps> {
  try {
    let data: string;
    if (tag) {
      data = (await getData(`db/tags/apps/${tag}/data.json`)).toString();
    } else {
      data = (await getData("db/apps.json")).toString();
    }

    return JSON.parse(data) as RawAppsProps;
  } catch {
    return { apps: [] };
  }
}

export async function getBlogs(tag?: string): Promise<RawBlogsProps> {
  try {
    let data: string;
    if (tag) {
      data = (await getData(`db/tags/blogs/${tag}/data.json`)).toString();
    } else {
      data = (await getData("db/blogs.json")).toString();
    }

    return JSON.parse(data) as RawBlogsProps;
  } catch {
    return { blogs: [] };
  }
}

export async function getCompany(tag?: string): Promise<RawCompanyProps> {
  try {
    let data: string;
    if (tag) {
      data = (await getData(`db/tags/company/${tag}/data.json`)).toString();
    } else {
      data = (await getData("db/workInfo.json")).toString();
    }

    return JSON.parse(data) as RawCompanyProps;
  } catch {
    return { company: [] };
  }
}

export async function getTesti(): Promise<TestimonialsProps> {
  try {
    const dataTesti = (await getData("home/testimonials.json")).toString();
    return JSON.parse(dataTesti) as TestimonialsProps;
  } catch {
    return { testis: [] };
  }
}

export async function getTechs(): Promise<RXTProps> {
  try {
    const dataExpertise = (await getData("home/expertise.json")).toString();
    return JSON.parse(dataExpertise) as RXTProps;
  } catch {
    return { techs: [] };
  }
}

export async function getTags() {
  try {
    const data = (await getData("db/tags/configs.json")).toString();
    return JSON.parse(data) as TotalTagsType;
  } catch {
    return { tags: [] };
  }
}

export async function getCard(type: Card, tag?: string) {
  let allData: CardData;
  switch (type) {
    case "projects":
      const projects = (await getProjects(tag)).projects;
      allData = await addBlur(projects, projects.length);
      break;
    case "blogs":
      const blogs = (await getBlogs(tag)).blogs;
      allData = await addBlur(blogs, blogs.length);
      break;
    case "apps":
      const apps = (await getApps(tag)).apps;
      allData = await addBlur(apps, apps.length);
      break;
    case "company":
      const company = (await getCompany(tag)).company;
      allData = await addBlur(company, company.length);
      break;
  }
  return allData;
}

export function getFileExtSSR(urlinput: string) {
  try {
    const url = new URL(urlinput);
    const { ext } = parse(url.pathname);
    return ext.replace(".", "");
  } catch (error) {
    const { ext } = parse(urlinput);
    return ext.replace(".", "");
  }
}

export async function addBlur<T>(data: T[], limit = 3) {
  const rData: T[] = [];
  for (let index = 0; index < limit; index++) {
    const element = data[index];
    if (!element) continue;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const imgBlurDataRaw = await getBlurData(
      (element as unknown as { imgUrl: string }).imgUrl,
      false,
    );

    let imgBlurData = null;
    if (imgBlurDataRaw) {
      imgBlurData = imgBlurDataRaw.base64;
    }

    rData.push({ ...element, imgBlurData });
  }
  return rData;
}

export function extractImageUrlsFromMarkdown(markdown: string): string[] {
  const imageUrls: string[] = [];

  // Match Markdown-style image syntax: ![alt text](url)
  const markdownImageRegex = /!\[[^\]]*?]\((.*?)\)/g;
  let match;

  while ((match = markdownImageRegex.exec(markdown)) !== null) {
    const url = match[1];
    if (url) {
      imageUrls.push(url);
    }
  }

  // Match HTML img tags: <img src="url" ...>
  const htmlImageRegex = /<img[^>]*src=['"]([^'"]+)['"][^>]*>/g;

  while ((match = htmlImageRegex.exec(markdown)) !== null) {
    const url = match[1];
    if (url) {
      imageUrls.push(url);
    }
  }

  return imageUrls;
}

export async function addBlurList(imgs: string[]): Promise<ImgBlurData> {
  const imgsBlurObj: ImgBlurData = {};

  for (const url of imgs) {
    const blurData = await getBlurData(url);
    if (blurData) {
      const { base64, metadata } = blurData;
      imgsBlurObj[url] = {
        base64,
        height: metadata.height,
        width: metadata.width,
      };
    }
  }

  return imgsBlurObj;
}
