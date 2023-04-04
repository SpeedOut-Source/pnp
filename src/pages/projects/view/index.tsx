import { type GetStaticProps } from "next";
import projectsServer from "~/app_function/projects/projects_server";
import AllProjects from "..";

export const getStaticProps: GetStaticProps = async (context) => {
  return projectsServer(context);
};

export default AllProjects;
