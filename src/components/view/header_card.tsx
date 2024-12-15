import Image from "next/image";
import type {
  App,
  Card,
  CardItem,
  Company,
  Project,
} from "~/app_function/utils/interfaces";
import dynamic from "next/dynamic";
const DateTimePost = dynamic(() => import("~/components/date_time_post"));

export default function HeaderCard({
  type,
  project,
  itemView,
}: {
  type: Card;
  project: Project | undefined;
  itemView: CardItem;
}) {
  switch (type) {
    case "projects":
      if (!project) {
        return <></>;
      }
      return (
        <>
          <span>App:</span>
          <div>
            <div className="flex items-center gap-1">
              <Image
                width={20}
                height={20}
                src={project.app.logoUrl}
                alt={project.app.name}
              />
              <span>{project.app.name}</span>
            </div>
          </div>
        </>
      );
    case "apps":
      return (
        <>
          App name: <span>{(itemView as App).title}</span>
        </>
      );
    case "company":
      const data = itemView as Company;
      return (
        <div className="text-left">
          <p>
            Start: <DateTimePost date={data.start} />
          </p>
          <p>
            End:{" "}
            <span>
              {data.end > 0 ? <DateTimePost date={data.end} /> : "Present"}
            </span>
          </p>
        </div>
      );
    default:
      break;
  }
}
