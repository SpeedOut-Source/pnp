import Image from "next/image";
export interface Testimonial {
  imgUrl: string;
  fullName: string;
  position: string;
  text: string;
}
export default function TestiCard(props: Testimonial) {
  return (
    <div className="p-card h-fit w-full space-y-3 p-3 lg:w-52">
      <div className="flex w-full items-center gap-2">
        <div className="relative h-12 w-12 overflow-hidden rounded-full ring ring-slate-400/20">
          <Image
            src={props.imgUrl}
            alt={props.fullName}
            objectFit="cover"
            layout="fill"
          />
        </div>
        <div className="tracking-wider">
          <p className="text-sm font-bold">{props.fullName}</p>
          <p className="text-xs">{props.position}</p>
        </div>
      </div>
      <p className="leading-normal">{props.text}</p>
    </div>
  );
}
