import dynamic from "next/dynamic";
import { PrivacyServer } from "~/app_function/privacy/privacy_server";
import { env } from "../env.mjs";
const MDRender = dynamic(() => import("~/components/markdown/md_render"));

const SEO = dynamic(() => import("~/components/seo"));

export interface PrivacyProps {
  data: string;
}

export default function Privacy(props: PrivacyProps) {
  const title = `Privacy | ${env.NEXT_PUBLIC_PERSON_NAME}`;

  return (
    <>
      <SEO description={title} title={title} />
      <MDRender data={props.data} />
    </>
  );
}

export async function getStaticProps() {
  return PrivacyServer();
}
