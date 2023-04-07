import {
  getBlogs,
  getConfigs,
  getData,
  getProjects,
} from "../utils/utils-server";
import matter from "gray-matter";
import { type GetStaticPropsContext, type PreviewData } from "next";
import { type ParsedUrlQuery } from "querystring";
import { type ProjectBlogViewProps } from "~/pages/projects/view/[file_name]";
import { type Blog, type Project } from "../utils/interfaces";

export async function getStaticPathItemView({
  isProject,
}: {
  isProject: boolean;
}) {
  let allData: Project[] | Blog[];
  if (isProject) {
    allData = (await getProjects()).projects;
  } else {
    allData = (await getBlogs()).blogs;
  }

  const paths = allData.map((x) => {
    return {
      params: {
        file_name: x.fileName,
      },
    };
  });

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export interface ProjectBlogGetStaticServer {
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>;
  isProject: boolean;
}

export async function getStaticPropsItemView({
  context,
  isProject,
}: ProjectBlogGetStaticServer) {
  if (
    !context.params ||
    !context.params.file_name ||
    typeof context.params.file_name !== "string"
  ) {
    return {
      notFound: true,
    };
  }
  try {
    const dataRaw = (
      await getData(
        `${isProject ? "projects" : "blogs"}/${context.params.file_name}`
      )
    ).toString();

    const { content } = matter(dataRaw);

    const allData: Project[] | Blog[] = isProject
      ? (await getProjects()).projects
      : (await getBlogs()).blogs;

    const currentProjectIndex = allData.findIndex(
      (p) => p.fileName === context.params?.file_name
    );
    const previous = allData[currentProjectIndex - 1] ?? null;
    const next = allData[currentProjectIndex + 1] ?? null;

    const configs = await getConfigs();

    const itemView = allData[currentProjectIndex];
    if (!itemView) {
      return {
        notFound: true,
      };
    }

    const pvp: ProjectBlogViewProps = {
      data: content,
      configs,
      itemView,
      previous,
      next,
      isProject,
    };

    return {
      props: pvp,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}
