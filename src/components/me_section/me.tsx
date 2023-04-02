import Image from "next/image";

interface MeProps {
  fullName: string;
  imgUrl: string;
  hText: string;
  text: string;
}

export default function Me(props: MeProps) {
  return (
    <div className="btn-ghost btn h-fit max-w-sm cursor-default space-y-3 rounded-xl bg-slate-200 p-4 normal-case tracking-wider">
      <div className="flex w-full items-center justify-start gap-4">
        <div className="relative h-32 w-32 cursor-default overflow-hidden rounded-full ring-4 ring-slate-400/40">
          <Image
            objectFit="cover"
            layout="fill"
            src={props.imgUrl}
            alt={props.fullName}
          />
        </div>
        <span className="w-0 text-xl">{props.fullName}</span>
      </div>
      <div>
        <span className="font-bold">{props.hText}</span>
        <span> {props.text}</span>
      </div>
    </div>
  );
}
