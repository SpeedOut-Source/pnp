import { showCountHuman } from "~/app_function/utils/utils";
import Link from "next/link";
import { type ReactNode } from "react";
import clsx from "clsx";

interface CountAddProp {
  url?: string;
  counts?: number;
  name?: string;
  children: ReactNode;
  tooltipClass?: string;
}

export default function CountAdd(props: CountAddProp) {
  const counts =
    props.counts && props.counts > 0 ? showCountHuman(props.counts) : undefined;
  return (
    <div className="indicator">
      {counts && props.name && (
        <span className="indicator-item indicator-new bg-base-300/60 mt-1 -mr-1">
          <span
            className={clsx("tooltip", props.tooltipClass)}
            data-tip={`${counts} ${props.name}`}
          >
            {counts}
          </span>
        </span>
      )}
      {props.url ? (
        <Link href={props.url} className="link-hover link">
          {props.children}
        </Link>
      ) : (
        props.children
      )}
    </div>
  );
}
