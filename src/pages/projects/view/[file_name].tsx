import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import matter from "gray-matter";
import { type GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { type Configs } from "~/app_function/home/home_server";

import {
  getConfigs,
  getData,
  getProject,
  getProjects,
} from "~/app_function/utils/utils-server";
import Loading from "~/components/markdown/loading";
import ProjectCard, { type Project } from "~/components/projects/project_card";
import SEO from "~/components/seo";
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

    const { content, data } = matter(dataRaw);
    const project = getProject(data, context.params.file_name);

    const allProjects = await getProjects();
    const currentProjectIndex = allProjects.projects.findIndex(
      (p) => p.fileName === context.params?.file_name
    );
    const previous = allProjects.projects[currentProjectIndex - 1] ?? null;
    const next = allProjects.projects[currentProjectIndex + 1] ?? null;

    const configs = await getConfigs();

    const pvp: ProjectViewProps = {
      data: content,
      configs,
      project,
      previous,
      next,
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
  previous: Project | null;
  next: Project | null;
}

export default function ProjectView(props: ProjectViewProps) {
  const title = `${props.project.whatText} | ${props.configs.appName}`;

  return (
    <>
      <SEO
        configs={props.configs}
        description={`${props.project.result} | ${props.project.app.name} | ${props.project.company.name}`}
        title={title}
        imgUrl={props.project.imgUrl}
      />
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
      <div className="container divider mx-auto max-w-3xl px-2" />
      {(props.previous || props.next) && (
        <div className="container mx-auto max-w-3xl px-2">
          <div className="flex items-center justify-between gap-4 ">
            {props.previous && (
              <div className="h-fit w-fit">
                <div className="mb-2 flex items-center text-2xl normal-case text-slate-400">
                  <ChevronLeftIcon className="h-6 w-6"></ChevronLeftIcon>
                  Previous{" "}
                </div>
                <ProjectCard {...props.previous} />
              </div>
            )}
            {props.next && (
              <div className="h-fit w-fit">
                <div className="mb-2 flex items-center justify-end text-2xl normal-case text-slate-400">
                  Next <ChevronRightIcon className="h-6 w-6"></ChevronRightIcon>
                </div>
                <ProjectCard {...props.next} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
