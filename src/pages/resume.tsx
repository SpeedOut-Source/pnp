import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import Link from "next/link";
import { env } from "../env.mjs";
import urlJoin from "url-join";
const SEO = dynamic(() => import("~/components/seo"));

const PdfReader = dynamic(() => import("~/components/pdf_reader"));

export default function Resume() {
  const resumePdfUrl = urlJoin(
    env.NEXT_PUBLIC_USER_CONTENT_BASE_URL,
    env.NEXT_PUBLIC_REPO_PATH,
    env.NEXT_PUBLIC_REPO_DATA_BRANCH,
    env.NEXT_PUBLIC_RESUME_PATH
  );
  return (
    <>
      <SEO
        description={`Resume | ${env.NEXT_PUBLIC_PERSON_NAME}`}
        title={`Resume | ${env.NEXT_PUBLIC_PERSON_NAME}`}
      />
      <div>
        <div className="mb-5 flex justify-center">
          <Link
            href={resumePdfUrl}
            download={true}
            className="p-card cursor-pointer gap-2"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
            Download resume
          </Link>
        </div>
        <PdfReader resumeUrl={resumePdfUrl} />
      </div>
    </>
  );
}
