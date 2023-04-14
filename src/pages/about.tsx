import changeLogJson from "../../changelog.json";
import packageJson from "../../package.json";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { type Configs } from "~/app_function/home/home_server";
import { getConfigs } from "~/app_function/utils/utils-server";
import { useThemeStore, DEFAULT_IS_LIGHT } from "~/app_state/theme_mode";
import SEO from "~/components/seo";

const SAPage = dynamic(
  () => import("../components/sapage/src/components/SAPage")
);

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

export default function About(props: AboutProps) {
  const utm = useThemeStore();
  const [isLight, setIsLight] = useState(DEFAULT_IS_LIGHT);

  useEffect(() => {
    setIsLight(utm.themeName === "winter");
  }, [utm]);

  return (
    <div>
      <SEO
        configs={props.configs}
        description={`About | ${props.configs.appName}`}
        title={`About | ${props.configs.appName}`}
      />
      <div className="container mx-auto">
        <SAPage
          app={{
            title: "Portfolio Next.js Project",
            codeName: packageJson.name,
            logo: {
              logoUrl: `/images/logos/github-profile-dark${
                isLight ? "-light" : ""
              }.png`,
              alt: packageJson.name,
            },
            version: packageJson.version,
          }}
          devCompany={{
            name: "SpeedOut",
            url: "https://play.google.com/store/apps/dev?id=7013622463085625240",
            year: 2023,
          }}
          devs={[
            {
              name: "Biplob Kumar Sutradhar",
              imgUrl: "https://avatars.githubusercontent.com/u/43641536",
              role: "Lead developer",
              url: "https://github.com/biplobsd",
            },
          ]}
          reportUrl="https://github.com/biplobsd/biplobsd.github.io/issues"
          poweredBy={{
            companyName: "Biplob Sutradhar",
            url: "https://biplobsd.github.io",
          }}
          changeLogs={changeLogJson}
        />
      </div>
    </div>
  );
}
