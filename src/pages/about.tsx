import changeLogJson from "../../changelog.json";
import packageJson from "../../package.json";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useThemeStore, DEFAULT_IS_LIGHT } from "~/app_state/theme_mode";
import { env } from "../env.mjs";
const SEO = dynamic(() => import("~/components/seo"));

const SAPage = dynamic(
  () => import("../components/sapage/src/components/SAPage")
);

export default function About() {
  const utm = useThemeStore();
  const [isLight, setIsLight] = useState(DEFAULT_IS_LIGHT);

  useEffect(() => {
    setIsLight(utm.themeName === "winter");
  }, [utm]);

  return (
    <div>
      <SEO
        description={`About | ${env.NEXT_PUBLIC_PERSON_NAME}`}
        title={`About | ${env.NEXT_PUBLIC_PERSON_NAME}`}
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
