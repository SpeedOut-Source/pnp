import { type GetStaticProps } from "next";
import Head from "next/head";
import { type Configs } from "~/app_function/home/home_server";
import { getConfigs, getData, getProjects } from "~/app_function/utils/utils";
import MDRender from "~/components/markdown/md_render";

export async function getStaticPaths() {
  const allProjects = await getProjects();
  console.log("AllProjects", allProjects);
  const paths = allProjects.projects.map((x) => {
    return {
      params: {
        file_name: x.fileName,
      },
    };
  });
  console.log("getStaticPaths", paths);

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`

export const getStaticProps: GetStaticProps = async (context) => {
  if (
    !context.params ||
    !context.params.file_name ||
    typeof context.params.file_name !== "string"
  ) {
    return {
      notFound: true,
    };
  }
  try {
    const dataRaw = (
      await getData(`projects/${context.params.file_name}`)
    ).toString();

    const end = dataRaw.lastIndexOf("\n---") + 5;
    const data = dataRaw.slice(end);

    const configs = await getConfigs();

    return {
      props: { data, configs },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export interface ProjectViewProps {
  data: string;
  configs: Configs;
}

export default function ProjectView(props: ProjectViewProps) {
  const title = `${props.data.slice(0, 100)} | ${props.configs.appName}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Head>

      <MDRender text={props.data} />
    </>
  );
}
