import dynamic from "next/dynamic";
import { type MeProps } from "./me";
import { type TotalTagsType } from "~/app_function/utils/utils-server";

export interface MeSectionProps {
  totalTags: TotalTagsType;
  me: MeProps;
}

const Me = dynamic(() => import("./me"));
const RXT = dynamic(() => import("./r_x_t"));

export default function MeSection(props: MeSectionProps) {
  return (
    <div className="mx-4 mt-3 flex flex-col items-center justify-start gap-4 xl:mt-12">
      <Me {...props.me} />
      <RXT tags={props.totalTags.tags} />
    </div>
  );
}
