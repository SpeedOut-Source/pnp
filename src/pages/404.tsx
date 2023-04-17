import dynamic from "next/dynamic";
import { type Configs } from "~/app_function/home/home_server";
import { getConfigs } from "~/app_function/utils/utils-server";
const SEO = dynamic(() => import("~/components/seo"));

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
        description={`404 | ${props.configs.appName}`}
        title={`404 | ${props.configs.appName}`}
      />

      <main className="errorSplash container mx-auto">
        <div>
          404 <span>|</span> This page is not found
        </div>
      </main>
    </>
  );
}
