import Head from "next/head";
import changeLogJson from "../../changelog.json";
import packageJson from "../../package.json";
import dynamic from "next/dynamic";

const SAPage = dynamic(
  () => import("../components/sapage/src/components/SAPage")
);

export default function About() {
  return (
    <div>
      <Head>
        <title>About | Biplob Sutradhar</title>
        <meta name="description" content="About | Biplob Sutradhar" />
      </Head>
      <main className="container mx-auto">
        <SAPage
          app={{
            title: "Portfolio Next.js Project",
            codeName: packageJson.name,
            logo: {
              logoUrl: "/images/me/propic.png",
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
          reportUrl="https://github.com/actionaac/issues"
          poweredBy={{
            companyName: "Biplob Sutradhar",
            url: "https://biplobsd.github.io",
          }}
          changeLogs={changeLogJson}
        />
      </main>
    </div>
  );
}
