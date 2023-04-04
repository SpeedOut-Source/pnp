import { type GetStaticProps } from "next";
import { projectBlogGetStaticProps } from "~/app_function/project_blog/project_blog_server";
import AllData from "..";

export const getStaticProps: GetStaticProps = async (context) => {
  return projectBlogGetStaticProps({ context, isProject: true });
};

export default AllData;
