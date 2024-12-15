import dynamic from "next/dynamic";
import { PrivacyServer } from "~/app_function/privacy/privacy_server";
import { env } from "~/env.mjs";
import { generateMetadataSEO } from "~/app_function/seo/seo";

export const generateMetadata = async () => {
  return generateMetadataSEO({
    description: `Privacy | ${env.NEXT_PUBLIC_PERSON_NAME}`,
    title: `Privacy | ${env.NEXT_PUBLIC_PERSON_NAME}`,
  });
};

const MDRender = dynamic(() => import("~/components/markdown/md_render"));

export default async function Privacy() {
  const mdData = await PrivacyServer();
  return (
    <>
      <section className="px-2 pt-2">
        <MDRender data={mdData} />
      </section>
    </>
  );
}
