import dynamic from "next/dynamic";
import { showCountHuman } from "~/app_function/utils/utils";

const Link = dynamic(() => import("next/link"));

interface ViewMore {
  url: string;
  text?: string;
  counts?: number;
  name?: string;
}

export default function ViewMore(props: ViewMore) {
  const counts =
    props.counts && props.counts > 0 ? showCountHuman(props.counts) : undefined;
  return (
    <div className="indicator mt-3">
      {counts && props.name && (
        <span className="indicator-item indicator-new">
          <span className="tooltip" data-tip={`${counts} ${props.name}`}>
            {counts}
          </span>
        </span>
      )}
      <Link
        href={props.url}
        className="p-card cursor-pointer font-semibold uppercase"
      >
        {props.text ?? "view more"}
      </Link>
    </div>
  );
}
