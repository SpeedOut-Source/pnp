export interface Company {
  name: string;
  logoUrl: string;
  homePage: string;
}

export interface WorkForProps {
  company: Company[];
}

export interface Blog {
  title: string;
  imgUrl: string;
  imgBlurData?: string;
  desc: string;
  date: number;
  readTime: number;
  fileName: string;
}

export interface Project {
  imgUrl: string;
  imgBlurData?: string;
  app: { name: string; logoUrl: string };
  company: { name: string; logoUrl: string };
  whatText: string;
  result: string;
  date: number;
  readTime: number;
  fileName: string;
}

interface Listing {
  name: string;
  link: string;
}

export interface App {
  imgUrl: string;
  imgBlurData?: string;
  date: number;
  title: string;
  category: string;
  platforms: Listing[];
  fileName: string;
  imgs: string[];
}

export type Card = "blogs" | "projects" | "apps";
export type CardData = Project[] | Blog[] | App[];
export type CardItem = Project | Blog | App;
