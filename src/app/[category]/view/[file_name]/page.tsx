import {
  getStaticPathItemView,
  getStaticPropsItemView,
} from "~/app_function/project_blog/item_view_server";
import { ProjectBlogView } from "~/components/view/project_blog_view";
import {
  type App,
  type Blog,
  type Company,
  type Project,
  type Card,
} from "~/app_function/utils/interfaces";
import { notFound } from "next/navigation";
import { generateMetadataSEO } from "~/app_function/seo/seo";
import { toTitleCase } from "~/app_function/utils/utils";
import { env } from "~/env.mjs";
import { getCard } from "~/app_function/utils/utils-server";

export type ViewType = {
  params: Promise<{ file_name: string; category: Card }>;
};

type generateStaticParamsType = {
  params: Promise<{ category: Card; file_name: string }>;
};

export async function generateMetadata({ params }: generateStaticParamsType) {
  const { category, file_name } = await params;

  const decodedPath = decodeURIComponent(decodeURIComponent(file_name));

  const allData = await getCard(category);
  const currentProjectIndex = allData.findIndex(
    (p) => p.fileName === decodedPath,
  );

  const itemView = allData[currentProjectIndex];
  if (!itemView) {
    return {};
  }

  let title = "";
  let description = "";
  const cat = category.toString();

  switch (category) {
    case "projects":
      const { whatText, result, company, app } = itemView as Project;
      title = `${whatText}`;
      description = `${result} | ${toTitleCase(cat)} | ${
        company.name
      } | ${app.name}`;
      break;
    case "blogs":
      const m = itemView as Blog;
      title = m.title;
      description = `${m.desc} | ${toTitleCase(cat)} | ${
        env.NEXT_PUBLIC_PERSON_NAME
      }`;
      break;
    case "apps":
      const { title: t, category, platforms } = itemView as App;
      title = t;
      description = `${category} | ${toTitleCase(category)} | ${platforms
        .map((x) => x.name)
        .join(" | ")} | ${env.NEXT_PUBLIC_PERSON_NAME}`;
      break;
    case "company":
      const o = itemView as Company;
      title = o.title;
      description = `${title} | ${toTitleCase(cat)}`;
      break;
  }

  return generateMetadataSEO({
    description,
    title,
    imgUrl: itemView.imgUrl,
    ogType: "article",
    itemView: itemView,
  });
}

export async function generateStaticParams({
  params,
}: generateStaticParamsType) {
  const { category } = await params;
  return await getStaticPathItemView(category);
}

export default async function View({ params }: ViewType) {
  const { file_name, category } = await params;

  const data = await getStaticPropsItemView({ file_name, type: category });

  if (data == "-1") {
    return notFound();
  }

  return <ProjectBlogView {...data} />;
}
