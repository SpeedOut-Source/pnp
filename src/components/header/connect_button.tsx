import { DEFAULT_IS_LIGHT, useThemeStore } from "~/app_state/theme_mode";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { getPrefixRepo } from "~/app_function/utils/utils";

const Image = dynamic(() => import("next/legacy/image"));

export interface IConnectButtonProps {
  text: string;
}

function ImageIcon({
  props,
  isLight,
}: {
  isLight: boolean;
  props: IConnectButtonProps;
}) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const handleLoadingComplete = () => {
    setIsImageLoading(false);
  };

  return (
    <div className="relative h-8 w-8">
      {isImageLoading && (
        <div className="h-full w-full animate-pulse rounded-xl bg-base-content/80" />
      )}
      <Image
        className={isLight ? "opacity-80" : "invert-colors"}
        layout="fill"
        objectFit="fill"
        src={`${getPrefixRepo()}/images/logos/${props.text.toLowerCase()}.png`}
        alt={props.text}
        onLoadingComplete={handleLoadingComplete}
      />
    </div>
  );
}

export default function ConnectButton(props: IConnectButtonProps) {
  const utm = useThemeStore();
  const [isLight, setIsLight] = useState(DEFAULT_IS_LIGHT);

  useEffect(() => {
    setIsLight(utm.themeName === "winter");
  }, [utm]);

  return (
    <span className="tooltip tooltip-bottom" data-tip={props.text}>
      <div className="btn-ghost btn-circle btn">
        <ImageIcon isLight={isLight} props={props} />
      </div>
    </span>
  );
}
