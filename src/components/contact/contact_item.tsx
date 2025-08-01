"use client";

import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";
import React, { useState } from "react";
import ClipboardCopy from "../ClipboardCopy";
import { delay } from "../sapage/src/components/app/helper";
import Link from "next/link";

export interface ContactItemProps {
  text: string;
  url: string;
  copyUrl?: boolean;
  name: string;
  icon: React.ReactNode;
}

export default function ContactItem(props: ContactItemProps) {
  const [copyTip, setCopyTip] = useState(`Copy ${props.name}`);
  return (
    <div className="group flex w-fit items-center gap-2">
      <Link
        href={props.url}
        target="_blank"
        className="flex items-center gap-2"
      >
        {props.icon}
        <span
          className="tooltip cursor-pointer"
          data-tip={`Click to open ${props.name}`}
        >
          {props.text}
        </span>
      </Link>

      <span
        className="tooltip invisible group-hover:visible"
        data-tip={copyTip}
      >
        <ClipboardCopy
          text={props.copyUrl ? props.url : props.text}
          onCopy={async () => {
            setCopyTip("Copied");
            await delay(500);
            setCopyTip(`Copy ${props.name}`);
          }}
        >
          <DocumentDuplicateIcon className="h-5 w-5 cursor-pointer hover:text-blue-600" />
        </ClipboardCopy>
      </span>
    </div>
  );
}
