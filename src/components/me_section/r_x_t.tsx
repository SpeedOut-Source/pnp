import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "~/components/ui/menubar";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";

import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { type TotalTagsType } from "~/app_function/utils/utils-server";
import { cn } from "~/lib/utils";

interface Props extends TotalTagsType {
  className?: string;
  title?: string;
  classNameMenubar?: string;
}

export default function RXT({
  tags,
  className,
  classNameMenubar,
  title = "Recent Expertise Technology",
}: Props) {
  return (
    <ViewTransition name="rxt">
      <div
        className={cn(
          "p-card h-fit w-full space-y-4 p-4 text-justify xl:max-w-md",
          className,
        )}
      >
        <p className="flex w-full items-center gap-2 text-start font-bold">
          <WrenchScrewdriverIcon className="h-5 w-5" />
          <Link href="/tags" className="cursor-pointer hover:underline">
            {title}
          </Link>
        </p>
        <Menubar
          className={cn(
            "flex h-auto! flex-wrap justify-start border-none! bg-transparent! p-0!",
            classNameMenubar,
          )}
        >
          {tags.map(({ tag, exist, total }) => (
            <MenubarMenu key={tag}>
              <MenubarTrigger className="data-[state=open]:text-base-content focus:text-base-content! my-0! cursor-pointer! px-0! py-0! capitalize hover:underline focus:bg-transparent! data-[state=open]:bg-transparent!">
                {tag}{" "}
                {total > 1 ? (
                  <span className="indicator-new bg-base-100 my-0! ml-1! px-1! py-0!">
                    <span>{total}</span>
                  </span>
                ) : (
                  <></>
                )}
                <span>{tag === tags[tags.length - 1]!.tag ? "" : ","}</span>
              </MenubarTrigger>

              <MenubarContent
                sideOffset={0}
                className="border-base-300! bg-base-100! text-base-content!"
              >
                <MenubarItem disabled className="text-base-content! capitalize">
                  tag mentioned in
                </MenubarItem>
                <MenubarSeparator className="bg-base-content/30!" />
                {exist.map(({ type, total: itemTotal }) => (
                  <Link
                    key={`/${type}/page/tag/${tag}`}
                    href={`/${type}/page/tag/${tag}`}
                  >
                    <MenubarItem
                      key={type}
                      className="focus:bg-base-300! focus:text-base-content! flex cursor-pointer! justify-between capitalize"
                    >
                      <span>{type}</span>
                      <span className="indicator-new ml-1">
                        <span>{itemTotal}</span>
                      </span>
                    </MenubarItem>
                  </Link>
                ))}
              </MenubarContent>
            </MenubarMenu>
          ))}
        </Menubar>
      </div>
    </ViewTransition>
  );
}
