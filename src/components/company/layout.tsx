import dynamic from "next/dynamic";
import { type Company } from "~/app_function/utils/interfaces";

const LayoutCard = dynamic(() => import("./layout_card"));

interface Layout {
  data: Company[];
}

export default function Layout(props: Layout) {
  if (!props.data || props.data.length < 0) {
    return <div className="text-center">No Company</div>;
  }
  return (
    <div className="xs:grid-cols-2 mx-auto grid w-fit justify-center gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {props.data.map((x) => (
        <LayoutCard {...x} key={x.date} />
      ))}
    </div>
  );
}
