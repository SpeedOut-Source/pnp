import dynamic from "next/dynamic";

const Image = dynamic(() => import("next/legacy/image"));

export interface MeProps {
  fullName: string;
  imgUrl: string;
  blurDataURL?: string | null;
  hText: string;
  text: string;
}

export default function Me(props: MeProps) {
  return (
    <div className="p-card h-fit w-full space-y-3 p-4 text-justify xl:max-w-md">
      <div className="flex w-full flex-col items-center justify-center gap-2 xl:flex-row xl:justify-start xl:gap-4">
        <div className="ring-base-300 relative h-32 w-32 cursor-default overflow-hidden rounded-full ring-4">
          <Image
            loading="lazy"
            placeholder="blur"
            blurDataURL={props.blurDataURL!}
            objectFit="cover"
            layout="fill"
            src={props.imgUrl}
            alt={props.fullName}
          />
        </div>
        <h1 className="w-fit text-xl xl:w-0">{props.fullName}</h1>
      </div>
      <div>
        <span className="font-bold">{props.hText}</span>
        <span> {props.text}</span>
      </div>
    </div>
  );
}
