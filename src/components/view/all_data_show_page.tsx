"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { type Card, type CardData } from "~/app_function/utils/interfaces";
import { toTitleCase } from "~/app_function/utils/utils";
import { type TagsListType } from "~/app_function/utils/utils-server";
import TagsShow from "~/components/view/tags_show";

const ProjectBlogLayout = dynamic(
  () => import("~/components/projects/project_blog_layout"),
);
const LinkWrapper = dynamic(() => import("~/components/link_wrapper"));

export interface pageInfo {
  no: number;
  size: number;
  total: number;
}

export interface AllDataProps {
  data: CardData;
  pageInfo: pageInfo;
  type: Card;
  tags?: TagsListType;
  tag?: string;
}

export function AllDataShowPage(props: AllDataProps) {
  const pageName: string = toTitleCase(props.type);

  const [leftDisable, setLeftDisable] = useState(false);
  const [rightDisable, setRightDisable] = useState(false);

  useEffect(() => {
    setLeftDisable(props.pageInfo.no <= 1);
    setRightDisable(
      props.pageInfo.size * props.pageInfo.no >= props.pageInfo.total,
    );
  }, [props]);

  return (
    <>
      <div className="mx-4 max-w-6xl sm:mx-auto md:container">
        <p className="text-center text-3xl uppercase">{pageName}</p>
        <TagsShow {...props} allShow />
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
