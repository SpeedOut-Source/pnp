import { HomeServer, type HomeProps } from "~/app_function/home/home_server";
import dynamic from "next/dynamic";
import { DEFAULT_IS_LIGHT, useThemeStore } from "~/app_state/theme_mode";
import { useEffect, useState } from "react";
import { env } from "../env.mjs";

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
const Comments = dynamic(() => import("~/components/comments"));

export async function getStaticProps() {
  return HomeServer();
}

const Home = (props: HomeProps) => {
  const title = `${env.NEXT_PUBLIC_PERSON_NAME}`;
  const utm = useThemeStore();
  const [isLight, setIsLight] = useState(DEFAULT_IS_LIGHT);

  useEffect(() => {
    setIsLight(utm.themeName === "winter");
  }, [utm]);

  return (
    <>
      <SEO
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
          <Comments key={title} theme={isLight ? "light" : "dark_dimmed"} />
        </div>
      </div>
    </>
  );
};

export default Home;
