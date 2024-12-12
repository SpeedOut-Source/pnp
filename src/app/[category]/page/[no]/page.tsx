import { notFound } from "next/navigation";
import {
  projectBlogGetStaticProps,
  projectBlogGetStaticPaths,
} from "~/app_function/project_blog/project_blog_server";
import { generateMetadataSEO } from "~/app_function/seo/seo";
import { type Card } from "~/app_function/utils/interfaces";
import { toTitleCase } from "~/app_function/utils/utils";
import { getTagConfigs } from "~/app_function/utils/utils-server";
import { AllDataShowPage } from "~/components/view/all_data_show_page";
import { env } from "~/env.mjs";

export type PageType = {
  params: Promise<{ no: string; category: Card; tag?: string }>;
};

export type generateStaticParamsType = {
  params: Promise<{ no: string; category: Card }>;
};

export async function generateMetadata({ params }: generateStaticParamsType) {
  const { category, no } = await params;
  const pageName = toTitleCase(category);
  const title = `${pageName} | Page ${no} | ${env.NEXT_PUBLIC_PERSON_NAME}`;

  return generateMetadataSEO({
    description: `See all ${title}`,
    title,
  });
}

export async function generateStaticParams({
  params,
}: generateStaticParamsType) {
  const { category } = await params;

  return projectBlogGetStaticPaths(category);
}

export default async function Page({ params }: PageType) {
  const { no, category, tag: m } = await params;
  let tag;
  if (m) {
    tag = decodeURIComponent(decodeURIComponent(m));
  }

  const data = await projectBlogGetStaticProps({ no, type: category, tag });

  if (data == "-1") {
    return notFound();
  }

  const tags = await getTagConfigs(category);

  return <AllDataShowPage {...data} {...tags} tag={tag} />;
}
