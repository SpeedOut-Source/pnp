import {
  DocumentDuplicateIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { delay } from "./sapage/src/components/app/helper";

export default function ContactSection() {
  const mailAddr = "biplobsd11@gmail.com";
  const [copyTip, setCopyTip] = useState("Copy email");
  return (
    <div className="mx-auto h-fit max-w-6xl px-4 sm:pl-4 sm:pr-0">
      <p className="text-2xl normal-case text-slate-400">Contact</p>
      <div className="flex justify-center">
        <div className="p-card group my-3 h-20 w-full max-w-lg">
          <div className="flex items-center gap-2">
            <EnvelopeIcon className="h-5 w-5" />
            <span>biplobsd11@gmail.com</span>
            <span
              className="tooltip hidden group-hover:inline"
              data-tip={copyTip}
            >
              <CopyToClipboard
                text={mailAddr}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onCopy={async () => {
                  setCopyTip("Copied");
                  await delay(500);
                  setCopyTip("Copy link");
                }}
              >
                <DocumentDuplicateIcon className="h-5 w-5 cursor-pointer hover:text-blue-600" />
              </CopyToClipboard>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
