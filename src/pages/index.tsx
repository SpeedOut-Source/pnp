import { HomeServer, type HomeProps } from "~/app_function/home/home_server";
import dynamic from "next/dynamic";
import SEO from "~/components/seo";
import { DEFAULT_BASE_URL } from "~/app_function/utils/constants";

const ResentProjects = dynamic(
  () => import("~/components/projects/resent_projects")
);
const Hero = dynamic(() => import("~/components/hero/hero"));
const ResentBlogs = dynamic(() => import("~/components/blogs/resent_blogs"));
const ContactSection = dynamic(() => import("~/components/contact_section"));

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
      <div className="container mx-auto space-y-1 md:mt-5">
        <Hero
          me={props.meSection}
          company={props.workFor}
          testis={props.testis}
        />
        <ResentProjects {...props.resentProjects} />
        <ResentBlogs {...props.resentBlogs} />
        <ContactSection />
      </div>
    </>
  );
};

export default Home;
