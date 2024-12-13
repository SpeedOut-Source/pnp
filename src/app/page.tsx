import { HomeServer } from "~/app_function/home/home_server";
import { generateMetadataSEO } from "~/app_function/seo/seo";
import Hero from "~/components/hero/hero";
import RecentApps from "~/components/apps/recent_apps";
import RecentProjects from "~/components/projects/recent_projects";
import ContactSection from "~/components/contact/contact_section";
import Comments from "~/components/comments";
import { env } from "~/env.mjs";
import { getData } from "~/app_function/utils/utils-server";
import Testimonials from "~/components/work_for_t/testimonials";
import type { MeProps } from "~/components/me_section/me";

export const generateMetadata = async () => {
  const dataBio = (await getData("home/bio.json")).toString();
  const me = JSON.parse(dataBio) as MeProps;

  return generateMetadataSEO({
    description: `${me.hText} ${me.text}`,
    imgUrl: me.imgUrl,
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
        <Hero me={meSection} company={workFor} recentBlogs={recentBlogs} />
        {recentApps.data.length > 0 && <RecentApps {...recentApps} />}
        {recentProjects.data.length > 0 && (
          <RecentProjects {...recentProjects} />
        )}
        <div className="mx-auto max-w-6xl px-2">
          <Testimonials {...testis} />
        </div>
        <ContactSection />
        <div className="divider mx-auto max-w-6xl px-2" />
        <div className="mx-auto max-w-6xl px-2">
          <Comments key={title} />
        </div>
      </div>
    </>
  );
};

export default Home;
