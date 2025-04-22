"use client";

import { useState } from "react";
import { delay } from "./sapage/src/components/app/helper";
import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";
import { twMerge } from "tailwind-merge";
import ClipboardCopy from "./ClipboardCopy";

interface CopyToClipboardButtonProps {
  tooltipText: string;
  copyText: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function CopyToClipboardButton(
  props: CopyToClipboardButtonProps,
) {
  const [copyTip, setCopyTip] = useState(props.tooltipText);
  return (
    <span
      className={twMerge("tooltip", props.className)}
      data-tip={copyTip}
      style={props.style}
    >
      <ClipboardCopy
        text={props.copyText}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onCopy={async () => {
          setCopyTip("Copied");
          await delay(500);
          setCopyTip(props.tooltipText);
        }}
      >
        <DocumentDuplicateIcon className="h-4 w-4 cursor-pointer hover:text-blue-600" />
      </ClipboardCopy>
    </span>
  );
}
