import { HomeServer } from "~/app_function/home/home_server";
import { generateMetadataSEO } from "~/app_function/seo/seo";
import Hero from "~/components/hero/hero";
import RecentApps from "~/components/apps/recent_apps";
import RecentProjects from "~/components/projects/recent_projects";
import ContactSection from "~/components/contact/contact_section";
import RecentBlogs from "~/components/blogs/recent_blogs";
import Comments from "~/components/comments";
import { env } from "~/env.mjs";
import { getApps, getTechs } from "~/app_function/utils/utils-server";

export const generateMetadata = async () => {
  const { apps } = await getApps();
  const { techs } = await getTechs();

  return generateMetadataSEO({
    description: `${techs.join(", ")}`,
    imgUrl: apps[0]?.imgUrl,
  });
};

const Home = async () => {
  const {
    meSection,
    workFor,
    testis,
    recentApps,
    recentProjects,
    recentBlogs,
  } = await HomeServer();
  const title = `${env.NEXT_PUBLIC_PERSON_NAME}`;

  return (
    <>
      <div className="mx-auto space-y-2 xl:container xl:mt-5">
        <Hero me={meSection} company={workFor} testis={testis} />
        {recentApps.data.length > 0 && <RecentApps {...recentApps} />}
        {recentProjects.data.length > 0 && (
          <RecentProjects {...recentProjects} />
        )}
        {recentBlogs.data.length > 0 && <RecentBlogs {...recentBlogs} />}
        <ContactSection />
        <div className="divider mx-auto max-w-6xl px-2" />
        <div className="mx-auto max-w-6xl px-2">
          <Comments key={title} theme={"dark_dimmed"} />
        </div>
      </div>
    </>
  );
};

export default Home;
