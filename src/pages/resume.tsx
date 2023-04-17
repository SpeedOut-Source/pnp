import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import Link from "next/link";
import { type Configs } from "~/app_function/home/home_server";
import { getConfigs } from "~/app_function/utils/utils-server";

const SEO = dynamic(() => import("~/components/seo"));

const PdfReader = dynamic(() => import("~/components/pdf_reader"));

export async function getStaticProps() {
  const configs = await getConfigs();

  const props: ResumeProps = {
    configs,
  };

  return {
    props: props,
  };
}

interface ResumeProps {
  configs: Configs;
}

export default function Resume(props: ResumeProps) {
  const resumePdfUrl =
    props.configs.baseUrl + props.configs.repoPath + props.configs.resumePath;
  return (
    <>
      <SEO
        configs={props.configs}
        description={`Resume | ${props.configs.appName}`}
        title={`Resume | ${props.configs.appName}`}
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
