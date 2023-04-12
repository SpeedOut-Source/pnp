/* eslint-disable @typescript-eslint/no-misused-promises */
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import { type GetStaticProps } from "next/types";
import { useEffect, useState } from "react";
import { type Configs } from "~/app_function/home/home_server";
import { projectBlogGetStaticProps } from "~/app_function/project_blog/project_blog_server";
import { type Card, type CardData } from "~/app_function/utils/interfaces";
import { toTitleCase } from "~/app_function/utils/utils";
import SEO from "~/components/seo";

const ProjectBlogLayout = dynamic(
  () => import("~/components/projects/project_blog_layout")
);
const LinkWrapper = dynamic(() => import("~/components/link_wrapper"));

export interface pageInfo {
  no: number;
  size: number;
  total: number;
}

export interface AllDataProps {
  configs: Configs;
  data: CardData;
  pageInfo: pageInfo;
  type: Card;
}

export const getStaticProps: GetStaticProps = async (context) => {
  return projectBlogGetStaticProps({ context, type: "projects" });
};

export default function AllDataShowPage(props: AllDataProps) {
  const pageName: string = toTitleCase(props.type);

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
      <SEO configs={props.configs} description={title} title={title} />
      <div className="container mx-auto">
        <p className="text-center text-3xl uppercase">{pageName}</p>
        <div className="mx-auto w-full max-w-6xl">
          <div className="m-2">
            <ProjectBlogLayout
              key={`${props.type}-${props.pageInfo.no}`}
              data={props.data}
              type={props.type}
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-center gap-2 pt-2">
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
          <span className="text-base-content/40"> | </span>
          Page no {props.pageInfo.no}
        </div>
      </div>
    </>
  );
}
