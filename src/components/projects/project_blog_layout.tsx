import dynamic from "next/dynamic";
import {
  type Company,
  type App,
  type Card,
  type CardData,
} from "~/app_function/utils/interfaces";
import LayoutCardApp from "../apps/layout_card";
import LayoutCardCompany from "../company/layout_card";

const LayoutCard = dynamic(() => import("../layout_card"));

interface ProjectBlogLayout {
  data: CardData;
  type?: Card;
}

export default function ProjectBlogLayout(props: ProjectBlogLayout) {
  if (!props.data || props.data.length < 0) {
    return <div className="text-center">No {props.type}</div>;
  }
  if (props.type && (props.type === "apps" || props.type === "company")) {
    return (
      <div className="xs:grid-cols-2 mx-auto grid w-fit justify-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {props.data.map((x, i) =>
          props.type === "apps" ? (
            <LayoutCardApp {...(x as App)} key={i + x.fileName + x.date} />
          ) : (
            <LayoutCardCompany
              {...(x as Company)}
              key={i + x.fileName + x.date}
            />
          ),
        )}
      </div>
    );
  }

  return (
    <div className="xs:grid-cols-2 mx-auto grid w-fit justify-center gap-4 sm:grid-cols-2 md:grid-cols-3">
      {props.data.map((x, i) => (
        <LayoutCard data={x} key={i + x.fileName + x.date} />
      ))}
    </div>
  );
}
