import Link from "next/link";
import type { TagsListType } from "~/app_function/utils/utils-server";
import { type Card } from "~/app_function/utils/interfaces";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export default function TagsShow({
  tags,
  type,
  tag,
  allShow,
  className,
}: {
  tags?: TagsListType;
  type: Card;
  tag?: string;
  allShow?: boolean;
  className?: string;
}) {
  if (!tags) {
    return <></>;
  } else if (tags.length === 0) {
    return <></>;
  }

  return (
    <div
      className={twMerge(
        "scrollbar-style-100 my-4 flex space-x-2 overflow-x-auto scroll-smooth pb-2 capitalize",
        className,
      )}
    >
      {allShow ? (
        <Link
          href={`/${type}/page/tag#all`}
          className={clsx(
            "p-card cursor-pointer",
            tag === undefined ? "btn-active" : "",
          )}
          id="all"
        >
          All
        </Link>
      ) : (
        <></>
      )}
      {tags.map((x) => (
        <Link
          href={`/${type}/page/tag/${x.tag}#${x.tag}`}
          id={x.tag}
          className={clsx(
            `p-card cursor-pointer capitalize`,
            x.tag === tag ? "btn-active" : "",
          )}
          key={x.tag}
        >
          {x.tag}
        </Link>
      ))}
    </div>
  );
}
