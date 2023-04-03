import Head from "next/head";
import ResentBlogs from "~/components/blogs/resent_blogs";
import Hero from "~/components/hero/hero";
import ResentProjects from "~/components/projects/resent_projects";
import { HomeServer, type HomeProps } from "~/app_function/home/home_server";

export async function getStaticProps() {
  return HomeServer();
}

const Home = (props: HomeProps) => {
  const title = `Home | ${props.configs.appName}`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Head>
      <div className="container mx-auto space-y-1 md:mt-5">
        <Hero
          me={props.meSection}
          company={props.workFor}
          testis={props.testis}
        />
        <ResentProjects />
        <ResentBlogs />
      </div>
    </>
  );
};

export default Home;
