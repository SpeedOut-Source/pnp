import { projectBlogGetStaticPaths } from "~/app_function/project_blog/project_blog_server";
import { generateMetadataSEO } from "~/app_function/seo/seo";
import { type Card } from "~/app_function/utils/interfaces";
import { toTitleCase } from "~/app_function/utils/utils";
import { env } from "~/env.mjs";
import Page from "../../../[no]/page";

export type PageType = {
  params: Promise<{ no: string; category: Card; tag: string }>;
};

export type generateStaticParamsType = {
  params: Promise<{ no: string; category: Card; tag: string }>;
};

export async function generateMetadata({ params }: generateStaticParamsType) {
  const { category, no, tag: tagRaw } = await params;
  const pageName = toTitleCase(category);

  const tag = toTitleCase(decodeURIComponent(decodeURIComponent(tagRaw)));
  const title = `${tag} | ${pageName} | ${no ? `Page ${no} | ` : ""} ${env.NEXT_PUBLIC_PERSON_NAME}`;

  return generateMetadataSEO({
    description: `See all ${title}`,
    title,
  });
}

export async function generateStaticParams({
  params,
}: generateStaticParamsType) {
  const { category, tag } = await params;
  return await projectBlogGetStaticPaths(category, tag);
}

export default Page;
