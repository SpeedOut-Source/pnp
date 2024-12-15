import changeLogJson from "changelog.json";
import packageJson from "package.json";
import dynamic from "next/dynamic";
import { getPrefixRepo } from "~/app_function/utils/utils";
import Spotlight from "~/components/spotlight";
import { generateMetadataSEO } from "~/app_function/seo/seo";
import { env } from "~/env.mjs";

const SAPage = dynamic(
  () => import("~/components/sapage/src/components/SAPage"),
);

export const generateMetadata = async () => {
  return generateMetadataSEO({
    description: `About | ${env.NEXT_PUBLIC_PERSON_NAME}`,
    title: `About | ${env.NEXT_PUBLIC_PERSON_NAME}`,
  });
};

export default function About() {
  return (
    <>
      <Spotlight />
      <div className="container mx-auto">
        <SAPage
          app={{
            title: "Portfolio Next.js Project",
            codeName: packageJson.name,
            logo: {
              logoUrl: `${getPrefixRepo()}/images/logos/github-profile-dark.png`,
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
          reportUrl="https://github.com/SpeedOut-Source/pnp/issues"
          poweredBy={{
            companyName: "Biplob Sutradhar",
            url: "https://biplobsd.github.io",
          }}
          changeLogs={changeLogJson}
        />
      </div>
    </>
  );
}
