import { type GetStaticProps } from "next";
import AllDataShowPage from "..";
import { projectBlogGetStaticProps } from "~/app_function/project_blog/project_blog_server";

export const getStaticProps: GetStaticProps = async (context) => {
  return projectBlogGetStaticProps({ context, type: "blogs" });
};

export default AllDataShowPage;
