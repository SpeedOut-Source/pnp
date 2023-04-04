import { type AllDataProps } from "~/pages/projects";
import {
  getBlogs,
  getConfigs,
  getDBConfigs,
  getProjects,
} from "../utils/utils";
import { type GetStaticPropsContext, type PreviewData } from "next";
import { PAGE_SIZE } from "../utils/constants";
import { type ParsedUrlQuery } from "querystring";
import { type Project } from "~/components/projects/project_card";
import { type Blog } from "~/components/blogs/blogs_card";

interface ProjectBlogGetStaticServer {
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>;
  isProject: boolean;
}

export async function projectBlogGetStaticPaths({
  isProject,
}: {
  isProject: boolean;
}) {
  const dbConfig = await getDBConfigs();

  const total = isProject ? dbConfig.projectTotal : dbConfig.blogTotal;

  const paths: {
    params: {
      no: string;
    };
  }[] = [];
  for (let index = 1; index <= Math.ceil(total / PAGE_SIZE); index++) {
    paths.push({
      params: {
        no: index.toString(),
      },
    });
  }

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function projectBlogGetStaticProps(
  props: ProjectBlogGetStaticServer
) {
  let pageNo = 1;
  if (
    props.context.params &&
    props.context.params.no &&
    typeof props.context.params.no === "string"
  ) {
    pageNo = Number.parseInt(props.context.params.no);
  }

  const configs = await getConfigs();

  let data: Project[] | Blog[];

  if (props.isProject) {
    data = (await getProjects()).projects;
  } else {
    data = (await getBlogs()).blogs;
  }

  const limitShow = PAGE_SIZE * pageNo;
  const dataArray = data.slice(limitShow - PAGE_SIZE, limitShow);

  const projectsProps: AllDataProps = {
    configs,
    data: dataArray,
    pageInfo: {
      size: PAGE_SIZE,
      no: pageNo,
      total: data.length,
    },
    isProject: props.isProject,
  };

  return {
    props: projectsProps,
  };
}
