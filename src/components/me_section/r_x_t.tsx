import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "~/components/ui/menubar";
import Link from "next/link";

import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { type TotalTagsType } from "~/app_function/utils/utils-server";

export default function RXT({ tags }: TotalTagsType) {
  return (
    <div className="p-card h-fit w-full space-y-4 p-4 text-justify xl:max-w-md">
      <p className="flex w-full items-center gap-2 text-start font-bold">
        <WrenchScrewdriverIcon className="h-5 w-5" />
        Recent Expertise Technology
      </p>
      {
        <Menubar>
          {tags.map(({ tag, exist, total }) => (
            <MenubarMenu key={tag}>
              <MenubarTrigger className="capitalize hover:underline">
                {tag}{" "}
                {total > 1 ? (
                  <span className="indicator-new ml-1 bg-base-100">
                    <span>{total}</span>
                  </span>
                ) : (
                  <></>
                )}
                <span>{tag === tags[tags.length - 1]!.tag ? "" : ","}</span>
              </MenubarTrigger>

              <MenubarContent>
                <MenubarItem disabled className="capitalize">
                  tag mentioned in
                </MenubarItem>
                <MenubarSeparator />
                {exist.map(({ type, total: itemTotal }) => (
                  <Link
                    key={`/${type}/page/tag/${tag}`}
                    href={`/${type}/page/tag/${tag}`}
                  >
                    <MenubarItem
                      key={type}
                      className="flex justify-between capitalize"
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
      }
    </div>
  );
}
