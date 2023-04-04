/* eslint-disable @typescript-eslint/no-misused-promises */
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { type GetStaticProps } from "next/types";
import { useEffect, useState } from "react";
import { type Configs } from "~/app_function/home/home_server";
import projectsServer from "~/app_function/projects/projects_server";
import { LinkWrapper } from "~/components/link_wrapper";
import ProjectLayout from "~/components/projects/project_layout";
import { type ProjectsProps } from "~/components/projects/resent_projects";

export interface pageInfo {
  no: number;
  size: number;
  total: number;
}

export interface AllProjectsProps {
  configs: Configs;
  projects: ProjectsProps;
  pageInfo: pageInfo;
}

export const getStaticProps: GetStaticProps = async (context) => {
  return projectsServer(context);
};

export default function AllProjects(props: AllProjectsProps) {
  const title = `Projects | ${props.configs.appName}`;
  const [leftDisable, setLeftDisable] = useState(false);
  const [rightDisable, setRightDisable] = useState(false);

  useEffect(() => {
    setLeftDisable(props.pageInfo.no <= 1);
    setRightDisable(
      props.pageInfo.size * props.pageInfo.no >= props.pageInfo.total
    );
  }, [props]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Head>

      <div className="container mx-auto">
        <p className="text-center text-3xl uppercase">Projects</p>
        <ProjectLayout {...props.projects} />
        <div className="flex w-full items-center justify-center gap-2">
          <LinkWrapper
            disabled={leftDisable}
            href={leftDisable ? "#" : `/projects/page/${props.pageInfo.no - 1}`}
            className="p-card h-fit w-fit cursor-pointer"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </LinkWrapper>
          <LinkWrapper
            href={
              rightDisable ? "#" : `/projects/page/${props.pageInfo.no + 1}`
            }
            disabled={rightDisable}
            className="p-card h-fit w-fit cursor-pointer"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </LinkWrapper>
        </div>
        <div className="text-center tracking-wider">
          Total: {props.pageInfo.total} | Page no: {props.pageInfo.no}
        </div>
      </div>
    </>
  );
}
