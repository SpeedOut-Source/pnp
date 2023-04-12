import dynamic from "next/dynamic";
import {
  type App,
  type Card,
  type CardData,
} from "~/app_function/utils/interfaces";
import LayoutCardApp from "../apps/layout_card";

const LayoutCard = dynamic(() => import("../layout_card"));

interface ProjectBlogLayout {
  data: CardData;
  type?: Card;
}

export default function ProjectBlogLayout(props: ProjectBlogLayout) {
  if (!props.data || props.data.length < 0) {
    return <div className="text-center">No {props.type}</div>;
  }
  if (props.type && props.type === "apps") {
    return (
      <div className="mx-auto grid w-fit justify-center gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {props.data.map((x) => (
          <LayoutCardApp {...(x as App)} key={x.date} />
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-fit justify-center gap-4 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3">
      {props.data.map((x) => (
        <LayoutCard data={x} key={x.date} />
      ))}
    </div>
  );
}
