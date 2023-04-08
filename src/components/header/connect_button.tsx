import { DEFAULT_IS_LIGHT, useThemeStore } from "~/app_state/theme_mode";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Link = dynamic(() => import('next/link'));
const Image = dynamic(() => import('next/image'));

export interface IConnectButtonProps {
  text: string;
  url: string;
}

export default function ConnectButton(props: IConnectButtonProps) {
  const utm = useThemeStore();
  const [isLight, setIsLight] = useState(DEFAULT_IS_LIGHT);

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
