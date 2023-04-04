import AllProjects from "..";
import { type GetStaticProps } from "next";
import projectsServer from "~/app_function/projects/projects_server";
import { PAGE_SIZE } from "~/app_function/utils/constants";
import { getDBConfigs } from "~/app_function/utils/utils";

export async function getStaticPaths() {
  const dbConfig = await getDBConfigs();
  const total = dbConfig.projectTotal;

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

export const getStaticProps: GetStaticProps = async (context) => {
  return projectsServer(context);
};

export default AllProjects;
