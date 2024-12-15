import { getCard, getDBConfigs } from "../utils/utils-server";
import { PAGE_SIZE, PAGE_SIZE_APP } from "../utils/constants";
import { type Card } from "../utils/interfaces";
import { type AllDataProps } from "~/components/view/all_data_show_page";

export function getPageSize(type: Card) {
  switch (type) {
    case "apps":
    case "company":
      return PAGE_SIZE_APP;
    default:
      return PAGE_SIZE;
  }
}

export async function projectBlogGetStaticPaths(type: Card, tag?: string) {
  const dbConfig = await getDBConfigs(tag, type);

  let total = 0;
  switch (type) {
    case "apps":
      total = dbConfig.appTotal;
      break;
    case "blogs":
      total = dbConfig.blogTotal;
      break;
    case "projects":
      total = dbConfig.projectTotal;
      break;
    case "company":
      total = dbConfig.companyTotal;
      break;
  }

  const paths: {
    no: string;
  }[] = [];

  for (let index = 1; index <= Math.ceil(total / getPageSize(type)); index++) {
    paths.push({
      no: index.toString(),
    });
  }

  return paths;
}

export async function projectBlogGetStaticProps({
  no,
  type,
  tag,
}: {
  no?: string;
  type: Card;
  tag?: string;
}): Promise<AllDataProps | "-1"> {
  let pageNo = 1;
  if (no) {
    pageNo = Number.parseInt(no);
  }

  try {
    const data = await getCard(type, tag);
    const pageSize = getPageSize(type);
    const limitShow = pageSize * pageNo;
    const dataArray = data.slice(limitShow - pageSize, limitShow);

    return {
      data: dataArray,
      pageInfo: {
        size: pageSize,
        no: pageNo,
        total: data.length,
      },
      type: type,
    };
  } catch {
    return "-1";
  }
}
