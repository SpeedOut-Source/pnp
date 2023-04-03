import Head from "next/head";
import { type Configs } from "~/app_function/home/home_server";
import { PrivacyServer } from "~/app_function/privacy/privacy_server";
import MDRender from "~/components/markdown/md_render";

export interface PrivacyProps {
  data: string;
  configs: Configs;
}

export default function Privacy(props: PrivacyProps) {
  const title = `Privacy | ${props.configs.appName}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Head>

      <MDRender text={props.data} />
    </>
  );
}

export async function getStaticProps() {
  return PrivacyServer();
}
