import { type AllDataProps } from "~/pages/projects";
import {
  getCard,
  getConfigs,
  getDBConfigs,
} from "../utils/utils-server";
import { type GetStaticPropsContext, type PreviewData } from "next";
import { PAGE_SIZE, PAGE_SIZE_APP } from "../utils/constants";
import { type ParsedUrlQuery } from "querystring";
import {
  type Card,
} from "../utils/interfaces";

export interface ProjectBlogGetStaticServer {
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>;
  type: Card;
}

export function getPageSize(type: Card) {
  switch (type) {
    case "apps":
      return PAGE_SIZE_APP;
    default:
      return PAGE_SIZE;
  }
}

export async function projectBlogGetStaticPaths(type: Card) {
  const dbConfig = await getDBConfigs();

  let total = 0;
  switch (type) {
    case "apps":
      total = dbConfig.appTotal;
      break;
    case "blogs":
      total = dbConfig.blogTotal;
      break;
    default:
      total = dbConfig.projectTotal;
      break;
  }

  const paths: {
    params: {
      no: string;
    };
  }[] = [];
  for (let index = 1; index <= Math.ceil(total / getPageSize(type)); index++) {
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

  const data = await getCard(props.type);
  const pageSize = getPageSize(props.type);
  const limitShow = pageSize * pageNo;
  const dataArray = data.slice(limitShow - pageSize, limitShow);

  const projectsProps: AllDataProps = {
    configs,
    data: dataArray,
    pageInfo: {
      size: pageSize,
      no: pageNo,
      total: data.length,
    },
    type: props.type,
  };

  return {
    props: projectsProps,
  };
}
