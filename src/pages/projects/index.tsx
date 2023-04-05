/* eslint-disable @typescript-eslint/no-misused-promises */
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import Head from "next/head";
import { type GetStaticProps } from "next/types";
import { useEffect, useState } from "react";
import { type Configs } from "~/app_function/home/home_server";
import { projectBlogGetStaticProps } from "~/app_function/project_blog/project_blog_server";
import { type Blog } from "~/components/blogs/blogs_card";
import { type Project } from "~/components/projects/project_card";

const ProjectBlogLayout = dynamic(
  () => import("~/components/projects/project_layout")
);
const LinkWrapper = dynamic(() => import("~/components/link_wrapper"));

export interface pageInfo {
  no: number;
  size: number;
  total: number;
}

export interface AllDataProps {
  configs: Configs;
  data: Project[] | Blog[];
  pageInfo: pageInfo;
  isProject: boolean;
}

export const getStaticProps: GetStaticProps = async (context) => {
  return projectBlogGetStaticProps({ context, isProject: true });
};

export default function AllDataShowPage(props: AllDataProps) {
  let pageName: string;
  if (props.isProject) {
    pageName = "Projects";
  } else {
    pageName = "Blogs";
  }
  const title = `${pageName} | ${props.configs.appName}`;
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
        <p className="text-center text-3xl uppercase">{pageName}</p>
        <ProjectBlogLayout data={props.data} isProject={props.isProject} />
        <div className="flex w-full items-center justify-center gap-2">
          <LinkWrapper
            disabled={leftDisable}
            href={
              leftDisable
                ? "#"
                : `/${pageName.toLowerCase()}/page/${props.pageInfo.no - 1}`
            }
            className="p-card h-fit w-fit cursor-pointer"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </LinkWrapper>
          <LinkWrapper
            href={
              rightDisable
                ? "#"
                : `/${pageName.toLowerCase()}/page/${props.pageInfo.no + 1}`
            }
            disabled={rightDisable}
            className="p-card h-fit w-fit cursor-pointer"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </LinkWrapper>
        </div>
        <div className="my-2 text-center text-xs font-thin tracking-wider text-slate-500">
          Total {props.pageInfo.total}{" "}
          <span className="text-slate-400"> | </span>
          Page no {props.pageInfo.no}
        </div>
      </div>
    </>
  );
}
