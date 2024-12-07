"use client";

import Link from "next/link";
import { event } from "nextjs-google-analytics";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

export default function DownloadResume({
  resumePdfUrl,
}: {
  resumePdfUrl: string;
}) {
  return (
    <Link
      onClick={() =>
        event("resume", {
          category: "resume",
          label: "Resume download",
        })
      }
      href={resumePdfUrl}
      download={true}
      className="p-card cursor-pointer gap-2"
    >
      <ArrowDownTrayIcon className="m-1 h-5 w-5" />
      <span>Download resume</span>
    </Link>
  );
}
