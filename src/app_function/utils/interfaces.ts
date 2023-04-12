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
  desc: string;
  date: number;
  readTime: number;
  fileName: string;
}

export interface Project {
  imgUrl: string;
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
  date: number;
  title: string;
  category: string;
  platforms: Listing[];
  fileName: string;
}

export type Card = "blogs" | "projects" | "apps";
export type CardData = Project[] | Blog[] | App[];
export type CardItem = Project | Blog | App;
