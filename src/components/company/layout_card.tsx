import { unstable_ViewTransition as ViewTransition } from "react";
import { type Company } from "~/app_function/utils/interfaces";
import dynamic from "next/dynamic";
import { type CompanyHit } from "~/app_function/types/HitTypes";
import TimeLine from "./time_line";
import { HighlightSwitch } from "../search/highlight_switch";
import { toViewTransitionName } from "~/app_function/utils/utils";

const Link = dynamic(() => import("next/link"));
const Image = dynamic(() => import("next/legacy/image"));

export default function LayoutCardCompany(x: Company) {
  const transitionName = toViewTransitionName(x.fileName, "company");

  return (
    <span className="tooltip w-full" data-tip="More details">
      <Link
        href={`/company/view/${x.fileName}`}
        className="p-card flex h-full w-full cursor-pointer flex-col py-4"
      >
        <div className="relative mx-auto mb-2 h-10 w-10 overflow-hidden">
          <ViewTransition name={transitionName}>
            <Image
              blurDataURL={x.imgBlurData ?? undefined}
              placeholder={x.imgBlurData ? "blur" : undefined}
              alt={x.title}
              src={x.imgUrl}
              objectFit="fill"
              layout="fill"
            />
          </ViewTransition>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-widest">
            <HighlightSwitch
              hit={x as CompanyHit}
              attribute="title"
              data={x.title}
            />
          </span>
          <TimeLine start={x.start} end={x.end} />
        </div>
      </Link>
    </span>
  );
}
