import { HomeServer, type HomeProps } from "~/app_function/home/home_server";
import dynamic from "next/dynamic";
import SEO from "~/components/seo";
import { DEFAULT_BASE_URL } from "~/app_function/utils/constants";

const RecentApps = dynamic(() => import("~/components/apps/recent_apps"));
const RecentProjects = dynamic(
  () => import("~/components/projects/recent_projects")
);
const Hero = dynamic(() => import("~/components/hero/hero"));
const RecentBlogs = dynamic(() => import("~/components/blogs/recent_blogs"));
const ContactSection = dynamic(
  () => import("~/components/contact/contact_section")
);

export async function getStaticProps() {
  return HomeServer();
}

const Home = (props: HomeProps) => {
  const title = `${props.configs.appName}`;
  return (
    <>
      <SEO
        configs={props.configs}
        description={`${props.meSection.techs.techs.join(", ")}`}
        imgUrl={
          (process.env.NEXT_PUBLIC_BASE_URL ?? DEFAULT_BASE_URL) +
          props.meSection.me.imgUrl
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
      </div>
    </>
  );
};

export default Home;
