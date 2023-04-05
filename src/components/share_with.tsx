import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { delay } from "./sapage/src/components/app/helper";
interface ShareWith {
  text: string;
}

export default function ShareWith(props: ShareWith) {
  const [copyTip, setCopyTip] = useState("Copy link");
  const [fullUrl, setFullUrl] = useState("/");
  useEffect(() => {
    setFullUrl(window.location.href);
  }, []);
  // const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? "/"}${router.asPath}`;

  return (
    <div className="p-card flex h-fit w-full flex-col space-y-2 overflow-visible py-2 text-xs sm:w-fit">
      <div className="flex w-full gap-1 text-left">
        <span>Share with</span>
        <span className="tooltip" data-tip={copyTip}>
          <CopyToClipboard
            text={fullUrl}
            onCopy={async () => {
              setCopyTip("Copied");
              await delay(500);
              setCopyTip("Copy link");
            }}
          >
            <DocumentDuplicateIcon className="h-4 w-4 cursor-pointer hover:text-blue-600" />
          </CopyToClipboard>
        </span>
      </div>
      <div className="space-x-2">
        <Link
          target="_blank"
          className="link-hover link-primary link"
          href={`https://www.facebook.com/sharer/sharer.php?u=${fullUrl}`}
        >
          Facebook
        </Link>
        <Link
          target="_blank"
          className="link-hover link-primary link"
          href={`https://twitter.com/intent/tweet?text=${
            props.text
          } ${encodeURIComponent(fullUrl)}`}
        >
          Twitter
        </Link>
        <Link
          target="_blank"
          className="link-hover link-primary link"
          href={`https://t.me/share/url?url=${encodeURIComponent(
            fullUrl
          )}&text=${props.text}`}
        >
          Telegram
        </Link>
      </div>
    </div>
  );
}
