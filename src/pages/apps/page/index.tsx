import { type GetStaticProps } from "next";
import { projectBlogGetStaticProps } from "~/app_function/project_blog/project_blog_server";
import AllDataShowPage from "..";

export const getStaticProps: GetStaticProps = async (context) => {
  return projectBlogGetStaticProps({ context, type: "apps" });
};

export default AllDataShowPage;
