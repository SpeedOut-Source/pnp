import Image from "next/image";

interface MeProps {
  fullName: string;
  imgUrl: string;
  hText: string;
  text: string;
}

export default function Me(props: MeProps) {
  return (
    <div className="p-card h-fit w-full space-y-3 p-4 md:max-w-sm">
      <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row md:justify-start md:gap-4">
        <div className="relative h-32 w-32 cursor-default overflow-hidden rounded-full ring-4 ring-slate-400/40">
          <Image
            objectFit="cover"
            layout="fill"
            src={props.imgUrl}
            alt={props.fullName}
          />
        </div>
        <span className="w-fit text-xl md:w-0">{props.fullName}</span>
      </div>
      <div>
        <span className="font-bold">{props.hText}</span>
        <span> {props.text}</span>
      </div>
    </div>
  );
}
