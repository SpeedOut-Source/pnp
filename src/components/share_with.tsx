"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { env } from "~/env.mjs";
import urlJoin from "url-join";
import CopyToClipboardButton from "./copy_to_clipboard_button";

const Link = dynamic(() => import("next/link"));

interface ShareWith {
  text: string;
}

export default function ShareWith(props: ShareWith) {
  const asPath = usePathname();
  const fullUrl = urlJoin(env.NEXT_PUBLIC_BASE_URL, asPath);

  return (
    <div className="p-card flex h-fit w-full flex-col space-y-2 overflow-visible py-2 text-xs sm:w-fit">
      <div className="flex w-full gap-1 text-left">
        <span>Share with</span>
        <CopyToClipboardButton copyText={fullUrl} tooltipText="Copy link" />
      </div>
      <div className="space-x-2">
        <Link
          target="_blank"
          className="link-hover link link-primary"
          href={`https://www.facebook.com/sharer/sharer.php?u=${fullUrl}`}
        >
          Facebook
        </Link>
        <Link
          target="_blank"
          className="link-hover link link-primary"
          href={`https://twitter.com/intent/tweet?text=${
            props.text
          } ${encodeURIComponent(fullUrl)}`}
        >
          Twitter
        </Link>
        <Link
          target="_blank"
          className="link-hover link link-primary"
          href={`https://t.me/share/url?url=${encodeURIComponent(
            fullUrl,
          )}&text=${props.text}`}
        >
          Telegram
        </Link>
      </div>
    </div>
  );
}
