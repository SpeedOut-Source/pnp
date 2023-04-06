import dynamic from "next/dynamic";
import { type Configs } from "~/app_function/home/home_server";
import { PrivacyServer } from "~/app_function/privacy/privacy_server";
import SEO from "~/components/seo";

const MDRender = dynamic(() => import("~/components/markdown/md_render"));

export interface PrivacyProps {
  data: string;
  configs: Configs;
}

export default function Privacy(props: PrivacyProps) {
  const title = `Privacy | ${props.configs.appName}`;

  return (
    <>
      <SEO configs={props.configs} description={title} title={title} />
      <MDRender data={props.data} />
    </>
  );
}

export async function getStaticProps() {
  return PrivacyServer();
}
