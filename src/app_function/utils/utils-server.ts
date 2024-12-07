import { promises } from "fs";
import type {
  ImgBlurData,
  App,
  Blog,
  Card,
  CardData,
  Company,
  Project,
} from "./interfaces";
import { parse, join } from "path";
import { type TestimonialsProps } from "~/components/work_for_t/testimonials";
import { env } from "../../env.mjs";
import { getBlurData } from "./blur_cache";
import { type RXTProps } from "~/components/me_section/r_x_t";

export interface DBConfigs {
  projectTotal: number;
  blogTotal: number;
  appTotal: number;
  companyTotal: number;
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

export async function getData(path: string) {
  const data = await promises.readFile(join(env.DATA_PATH, path), "utf8");
  return Buffer.from(data);
}

export async function getDBConfigs() {
  const data = (await getData("db/configs.json")).toString();
  return JSON.parse(data) as DBConfigs;
}

export async function getProjects(): Promise<RawProjectsProps> {
  try {
    const dataProjects = (await getData("db/projects.json")).toString();
    return JSON.parse(dataProjects) as RawProjectsProps;
  } catch {
    return { projects: [] };
  }
}

export async function getApps(): Promise<RawAppsProps> {
  try {
    const dataApps = (await getData("db/apps.json")).toString();
    return JSON.parse(dataApps) as RawAppsProps;
  } catch {
    return { apps: [] };
  }
}

export async function getBlogs(): Promise<RawBlogsProps> {
  try {
    const dataBlogs = (await getData("db/blogs.json")).toString();
    return JSON.parse(dataBlogs) as RawBlogsProps;
  } catch {
    return { blogs: [] };
  }
}

export async function getCompany(): Promise<RawCompanyProps> {
  try {
    const dataCompany = (await getData("db/workInfo.json")).toString();
    return JSON.parse(dataCompany) as RawCompanyProps;
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
    const techs = JSON.parse(dataExpertise) as RXTProps;
    return techs;
  } catch {
    return { techs: [] };
  }
}

export function parseProject(md_text: string, fileName: string) {
  const app_name = md_text.split("appName: ")[1]?.split("\n")[0] ?? "";
  const app_logo = md_text.split("appLogo: ")[1]?.split("\n")[0] ?? "";
  const company_name = md_text.split("companyName: ")[1]?.split("\n")[0] ?? "";
  const company_logo = md_text.split("companyLogo: ")[1]?.split("\n")[0] ?? "";
  const date = parseInt(md_text.split("date: ")[1]?.split("\n")[0] ?? "0");
  const read_time = parseInt(
    md_text.split("readTime: ")[1]?.split("\n")[0] ?? "0",
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
    | Record<string, string>,
  fileName: string,
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
    | Record<string, string | number>,
  fileName: string,
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
    md_text.split("readTime: ")[1]?.split("\n")[0] ?? "0",
  );
  const img_url = md_text.split("imgUrl: ")[1]?.split("\n")[0] ?? "";

  return {
    imgUrl: img_url,
    title: title,
    desc: desc,
    date: date,
    readTime: read_time,
    fileName: filename,
  };
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
    case "apps":
      const apps = (await getApps()).apps;
      allData = await addBlur(apps, apps.length);
      break;
    case "company":
      const company = (await getCompany()).company;
      allData = await addBlur(company, company.length);
      break;
  }
  return allData;
}

export function getFileExtSSR(urlinput: string) {
  const url = new URL(urlinput);
  if (!url.pathname) {
    return "";
  }
  const { ext } = parse(url.pathname);
  return ext.replace(".", "");
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
  const markdownImageRegex = /!\[[^\]]*?\]\((.*?)\)/g;
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
      const { base64, img } = blurData;
      imgsBlurObj[url] = { base64, height: img.height, width: img.width };
    }
  }

  return imgsBlurObj;
}
