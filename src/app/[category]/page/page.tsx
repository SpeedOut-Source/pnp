import { projectBlogGetStaticProps } from "~/app_function/project_blog/project_blog_server";
import { AllDataShowPage } from "~/components/view/all_data_show_page";
import { notFound } from "next/navigation";
import { type PageType } from "./[no]/page";

export default async function Page({ params }: PageType) {
  const { category } = await params;

  const data = await projectBlogGetStaticProps({ type: category });

  if (data == "-1") {
    return notFound();
  }

  return <AllDataShowPage {...data} />;
}
