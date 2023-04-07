import Link from "next/link";
import Image from "next/image";
import { useThemeStore } from "~/app_state/theme_mode";
import { useState, useEffect } from "react";

export interface IConnectButtonProps {
  text: string;
  url: string;
}

export default function ConnectButton(props: IConnectButtonProps) {
  const utm = useThemeStore();
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    setIsLight(utm.themeName === "winter");
  }, [utm]);
  return (
    <span className="tooltip tooltip-bottom" data-tip={props.text}>
      <Link
        href={props.url}
        target="_blank"
        className="btn-ghost btn-circle btn"
      >
        <div className=" relative h-8 w-8 ">
          <Image
            className={isLight ? "opacity-80" : "invert-colors"}
            layout="fill"
            objectFit="fill"
            src={`/images/logos/${props.text.toLowerCase()}.png`}
            alt={props.text}
          />
        </div>
      </Link>
    </span>
  );
}
