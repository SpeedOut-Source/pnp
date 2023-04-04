import AllData from "..";
import { type GetStaticProps } from "next";
import {
  projectBlogGetStaticProps,
  projectBlogGetStaticPaths,
} from "~/app_function/project_blog/project_blog_server";

export async function getStaticPaths() {
  return projectBlogGetStaticPaths({ isProject: false });
}

export const getStaticProps: GetStaticProps = async (context) => {
  return projectBlogGetStaticProps({ context, isProject: false });
};

export default AllData;
