import { type DevPlateProps } from "./app/interfaces";
import dynamic from "next/dynamic";

const Link = dynamic(() => import("next/link"));
const Image = dynamic(() => import("next/legacy/image"));

export default function DevPlate(props: DevPlateProps) {
  return (
    <Link
      className="p-card h-fit w-full cursor-pointer p-2"
      href={props.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex h-fit w-full items-center justify-start text-start">
        <div className="relative h-16 w-16 overflow-hidden rounded-full border">
          <Image
            src={props.imgUrl}
            alt={`${props.name} profile picture`}
            objectFit="cover"
            layout="fill"
          />
        </div>
        <div className="ml-3">
          <div className="text-lg font-semibold">{props.name}</div>
          <div className="text-sm">{props.role}</div>
        </div>
      </div>
    </Link>
  );
}
