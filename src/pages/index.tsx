import { HomeServer, type HomeProps } from "~/app_function/home/home_server";
import dynamic from "next/dynamic";
import { getUserNRepo } from "~/app_function/utils/utils";
import { DEFAULT_IS_LIGHT, useThemeStore } from "~/app_state/theme_mode";
import { useEffect, useState } from "react";

const SEO = dynamic(() => import("~/components/seo"));
const RecentApps = dynamic(() => import("~/components/apps/recent_apps"));
const RecentProjects = dynamic(
  () => import("~/components/projects/recent_projects")
);
const Hero = dynamic(() => import("~/components/hero/hero"));
const RecentBlogs = dynamic(() => import("~/components/blogs/recent_blogs"));
const ContactSection = dynamic(
  () => import("~/components/contact/contact_section")
);
const Giscus = dynamic(() => import("@giscus/react"));

export async function getStaticProps() {
  return HomeServer();
}

const Home = (props: HomeProps) => {
  const title = `${props.configs.appName}`;
  const sp = getUserNRepo(props.configs.repoPath);
  const utm = useThemeStore();
  const [isLight, setIsLight] = useState(DEFAULT_IS_LIGHT);

  useEffect(() => {
    setIsLight(utm.themeName === "winter");
  }, [utm]);

  return (
    <>
      <SEO
        configs={props.configs}
        description={`${props.meSection.techs.techs.join(", ")}`}
        imgUrl={
          props.recentApps.data[0] ? props.recentApps.data[0].imgUrl : undefined
        }
        title={title}
      />
      <div className="container mx-auto space-y-2 md:mt-5">
        <Hero
          me={props.meSection}
          company={props.workFor}
          testis={props.testis}
        />
        {props.recentApps.data.length > 0 && (
          <RecentApps {...props.recentApps} />
        )}
        {props.recentProjects.data.length > 0 && (
          <RecentProjects {...props.recentProjects} />
        )}
        {props.recentBlogs.data.length > 0 && (
          <RecentBlogs {...props.recentBlogs} />
        )}
        <ContactSection />

        <div className="divider mx-auto max-w-6xl px-2" />

        <div className="mx-auto max-w-6xl px-2">
          <Giscus
            key={title}
            id="comments"
            repo={`${sp.userName}/${sp.repo}`}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            repoId={process.env.NEXT_PUBLIC_REPO_ID!}
            category={process.env.NEXT_PUBLIC_CATEGORY}
            categoryId={process.env.NEXT_PUBLIC_CATEGORY_ID}
            mapping="pathname"
            term="Welcome to @giscus/react component!"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme={isLight ? "light" : "dark_dimmed"}
            lang="en"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
