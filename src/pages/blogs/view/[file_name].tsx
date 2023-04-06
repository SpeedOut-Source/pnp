import { type GetStaticPropsContext } from "next";
import { type ParsedUrlQuery } from "querystring";
import {
  getStaticPathItemView,
  getStaticPropsItemView,
} from "~/app_function/project_blog/item_view_server";
import ProjectBlogView, {
  type ProjectBlogViewProps,
} from "~/pages/projects/view/[file_name]";

export async function getStaticPaths() {
  return await getStaticPathItemView({ isProject: false });
}

export async function getStaticProps(
  context: GetStaticPropsContext<ParsedUrlQuery, ProjectBlogViewProps>
) {
  return await getStaticPropsItemView({ context, isProject: false });
}

export default ProjectBlogView;
