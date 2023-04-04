import Head from "next/head";
import { HomeServer, type HomeProps } from "~/app_function/home/home_server";
import dynamic from "next/dynamic";

const ResentProjects = dynamic(
  () => import("~/components/projects/resent_projects")
);
const Hero = dynamic(() => import("~/components/hero/hero"));
const ResentBlogs = dynamic(() => import("~/components/blogs/resent_blogs"));

export async function getStaticProps() {
  return HomeServer();
}

const Home = (props: HomeProps) => {
  const title = `Home | ${props.configs.appName}`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={`${props.meSection.me.hText} ${props.meSection.me.text}`}
        />
        <meta property="og:image" content={props.meSection.me.imgUrl} />
      </Head>
      <div className="container mx-auto space-y-1 md:mt-5">
        <Hero
          me={props.meSection}
          company={props.workFor}
          testis={props.testis}
        />
        <ResentProjects {...props.resentProjects} />
        <ResentBlogs {...props.resentBlogs} />
      </div>
    </>
  );
};

export default Home;
