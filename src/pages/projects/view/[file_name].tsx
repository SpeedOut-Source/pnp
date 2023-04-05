import { type GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { type Configs } from "~/app_function/home/home_server";

import {
  getConfigs,
  getData,
  getProjects,
  parseProject,
} from "~/app_function/utils/utils-server";
import Loading from "~/components/markdown/loading";
import { type Project } from "~/components/projects/project_card";
import ShareWith from "~/components/share_with";

const MDRender = dynamic(() => import("~/components/markdown/md_render"), {
  loading: () => <Loading />,
});

export async function getStaticPaths() {
  const allProjects = await getProjects();

  const paths = allProjects.projects.map((x) => {
    return {
      params: {
        file_name: x.fileName,
      },
    };
  });

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

    const project = parseProject(dataRaw, context.params.file_name);

    const end = dataRaw.lastIndexOf("\n---") + 5;
    const data = dataRaw.slice(end);

    const configs = await getConfigs();

    const pvp: ProjectViewProps = {
      data,
      configs,
      project,
    };

    return {
      props: pvp,
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
  project: Project;
}

export default function ProjectView(props: ProjectViewProps) {
  const title = `${props.project.whatText} | ${props.configs.appName}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={`${props.project.result} | ${props.project.app.name} | ${props.project.company.name}`}
        />
        <meta property="og:image" content={props.project.imgUrl} />
      </Head>
      <div className=" container mx-auto max-w-3xl px-2">
        <div className="">
          <Link className="link-hover link-primary link" href="/projects">
            Projects
          </Link>{" "}
          / {props.project.fileName}
        </div>
        <div className="my-2 flex flex-col items-center justify-between gap-2 sm:flex-row sm:items-end">
          <div className="p-card flex h-fit w-full flex-col items-start py-2 text-xs text-slate-500 sm:w-fit">
            <div className="flex items-center gap-1">
              App Name:{" "}
              <div>
                <div className="flex items-center gap-1">
                  <Image
                    width={20}
                    height={20}
                    src={props.project.app.logoUrl}
                    alt={props.project.app.name}
                  />
                  <span>{props.project.app.name}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              Company Name:{" "}
              <div>
                <div className="flex items-center gap-1">
                  <Image
                    width={20}
                    height={20}
                    src={props.project.company.logoUrl}
                    alt={props.project.company.name}
                  />
                  <span>{props.project.company.name}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              Date:{" "}
              <span>
                {new Date(props.project.date).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              Read time: <span>{props.project.readTime} min</span>
            </div>
          </div>
          <ShareWith
            text={`${props.project.whatText} ${props.project.result}`}
          />
        </div>
      </div>
      <MDRender data={props.data} />
    </>
  );
}
