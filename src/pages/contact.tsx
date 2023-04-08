import { type Configs } from "~/app_function/home/home_server";
import { getConfigs } from "~/app_function/utils/utils-server";
import ContactSection from "~/components/contact_section";
import SEO from "~/components/seo";

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
    </>
  );
}
