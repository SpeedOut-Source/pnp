import Link from "next/link";
import Image from "next/image";

export interface IConnectButtonProps {
  text: string;
  url: string;
}

export default function ConnectButton(props: IConnectButtonProps) {
  return (
    <Link href={props.url} target="_blank" className="btn-ghost btn-circle btn">
      <div className=" relative h-8 w-8">
        <Image
          layout="fill"
          objectFit="fill"
          src={`/images/logos/${props.text.toLowerCase()}.png`}
          alt={props.text}
        />
      </div>
    </Link>
  );
}
