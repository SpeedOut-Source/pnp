import Image from "next/image";
import type {
  Card,
  CardItem,
  Company,
  Project,
} from "~/app_function/utils/interfaces";
import HeaderCard from "./header_card";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";

const ShareWith = dynamic(() => import("~/components/share_with"));
const DateTimePost = dynamic(() => import("~/components/date_time_post"));

export default function MetaData({
  type,
  project,
  itemView,
  githubEditUrl,
  shareTxt,
}: {
  type: Card;
  project: Project | undefined;
  itemView: CardItem;
  githubEditUrl: string;
  shareTxt: string;
}) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-between gap-2 px-2 sm:flex-row sm:items-end xl:flex-col xl:items-end xl:px-0">
      <div className="p-card flex h-fit w-full flex-col items-start overflow-visible py-2 text-xs text-slate-500 sm:w-fit">
        {(type === "projects" || type === "company") && (
          <div className="flex items-center gap-1">
            <span>Company :</span>
            <div>
              <div className="flex items-center gap-1">
                <Image
                  width={20}
                  height={20}
                  src={project ? project.company.logoUrl : itemView.imgUrl}
                  alt={
                    project ? project.company.name : (itemView as Company).title
                  }
                />
                <span>
                  {project ? project.company.name : (itemView as Company).title}
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center gap-1">
          <HeaderCard itemView={itemView} project={project} type={type} />
        </div>
        <div className="flex items-center gap-1">
          Post date: <DateTimePost date={itemView.date} />
        </div>
        {type !== "apps" && (
          <div className="flex items-center gap-1">
            Read time: <span>{(itemView as Project).readTime} min</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          Type:
          <div className="flex items-center gap-1">
            <Link
              className="title link-hover link link-primary capitalize"
              href={"/" + type}
            >
              {type}
            </Link>{" "}
            <div
              className="tooltip tooltip-right"
              data-tip="Edit this on Github"
            >
              <Link href={githubEditUrl} target="_blank" rel="">
                <PencilSquareIcon className="link-hover link h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ShareWith text={shareTxt} />
    </div>
  );
}
