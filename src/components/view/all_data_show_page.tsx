"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type Card, type CardData } from "~/app_function/utils/interfaces";
import { toTitleCase } from "~/app_function/utils/utils";

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
  tags?: string[];
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
      <div className="container mx-auto max-w-6xl">
        <p className="text-center text-3xl uppercase">{pageName}</p>
        {props.tags?.length ? (
          <div className="my-4 capitalize flex overflow-x-auto space-x-2 scroll-smooth scrollbar-style pb-2">
            <Link
              href={`/${props.type}/page/tag/`}
              className={`btn ${props.tag === undefined ? "btn-active" : ""}`}
            >
              All
            </Link>
            {props.tags.map((x) => (
              <Link
                href={`/${props.type}/page/tag/${x}`}
                className={`btn ${props.tag === x ? "btn-active" : ""}`}
                key={x}
              >
                {x}
              </Link>
            ))}
          </div>
        ) : (
          <></>
        )}
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
