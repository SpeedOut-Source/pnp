import AllProjects from "..";
import { type GetStaticProps } from "next";
import projectsServer from "~/app_function/projects/projects_server";
import { PAGE_SIZE } from "~/app_function/utils/constants";
import { getProjects } from "~/app_function/utils/utils";

export async function getStaticPaths() {
  const allProjects = await getProjects();
  console.log("AllProjects", allProjects);
  //   const total = allProjects.projects.length;
  const total = 50;

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
  console.log("getStaticPaths", paths);

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  return projectsServer(context);
};

export default AllProjects;
