"use client";

import { useThemeStore } from "~/app_state/theme_mode";
import { useState } from "react";
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
        <div className="bg-base-content/80 h-full w-full animate-pulse rounded-xl" />
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
  const { isLight } = useThemeStore();

  return (
    <span className="tooltip tooltip-bottom" data-tip={props.text}>
      <div className="btn btn-circle btn-ghost">
        <ImageIcon isLight={isLight} props={props} />
      </div>
    </span>
  );
}
