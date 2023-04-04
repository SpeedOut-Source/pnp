import { type AllProjectsProps } from "~/pages/projects";
import { getConfigs, getProjects } from "../utils/utils";
import { type ProjectsProps } from "~/components/projects/resent_projects";
import { type Project } from "~/components/projects/project_card";
import { type GetStaticProps } from "next";
import { PAGE_SIZE } from "../utils/constants";

const projectsServer: GetStaticProps = async (context) => {
  let pageNo = 1;
  console.log("pageinfo", context);
  if (
    context.params &&
    context.params.no &&
    typeof context.params.no === "string"
  ) {
    pageNo = Number.parseInt(context.params.no);
  }

  const configs = await getConfigs();
  const projects = await getProjects();

  // Fake projects
  const p: Project[] = [];
  for (let index = 0; index < 50; index++) {
    p.push(projects.projects[0]!);
  }

  const fp: ProjectsProps = {
    projects: p,
  };

  const limitShow = PAGE_SIZE * pageNo;
  const dataArray = fp.projects.slice(limitShow - PAGE_SIZE, limitShow);

  const projectsProps: AllProjectsProps = {
    configs,
    projects: {
      projects: dataArray,
    },
    pageInfo: {
      size: PAGE_SIZE,
      no: pageNo,
      total: fp.projects.length,
    },
  };

  return {
    props: projectsProps,
  };
};

export default projectsServer;
