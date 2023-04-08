import dynamic from "next/dynamic";
import { type Configs } from "~/app_function/home/home_server";
import { getConfigs } from "~/app_function/utils/utils-server";
import ContactSection from "~/components/contact/contact_section";
import SEO from "~/components/seo";

const MapOn = dynamic(() => import("~/components/contact/map_on"));

export async function getStaticProps() {
  const configs = await getConfigs();

  const props: AboutProps = {
    configs,
  };

  return {
    props: props,
  };
}

interface AboutProps {
  configs: Configs;
}

export default function Custom404(props: AboutProps) {
  return (
    <>
      <SEO
        configs={props.configs}
        description={`Contact | ${props.configs.appName}`}
        title={`Contact | ${props.configs.appName}`}
      />

      <ContactSection />

      <MapOn />
    </>
  );
}
