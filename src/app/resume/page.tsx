import { env } from "~/env.mjs";
import dynamic from "next/dynamic";
import urlJoin from "url-join";
import Spotlight from "~/components/spotlight";
import { generateMetadataSEO } from "~/app_function/seo/seo";
import DownloadResume from "~/components/resume/download_resume";

export const generateMetadata = async () => {
  return generateMetadataSEO({
    description: `Resume | ${env.NEXT_PUBLIC_PERSON_NAME}`,
    title: `Resume | ${env.NEXT_PUBLIC_PERSON_NAME}`,
  });
};

const PdfReader = dynamic(() => import("~/components/pdf_reader"));

export default function Resume() {
  const resumePdfUrl = urlJoin(
    env.NEXT_PUBLIC_USER_CONTENT_BASE_URL,
    env.NEXT_PUBLIC_REPO_PATH,
    env.NEXT_PUBLIC_REPO_DATA_BRANCH,
    env.NEXT_PUBLIC_RESUME_PATH,
  );
  return (
    <>
      <Spotlight />
      <div className="my-5 flex justify-center">
        <DownloadResume resumePdfUrl={resumePdfUrl} />
      </div>
      <PdfReader resumeUrl={resumePdfUrl} />
    </>
  );
}
