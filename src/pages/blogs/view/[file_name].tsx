import { type GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { type Configs } from "~/app_function/home/home_server";
import {
  getBlogs,
  getConfigs,
  getData,
  parseBlog,
  parseProject,
} from "~/app_function/utils/utils";
import { Blog } from "~/components/blogs/blogs_card";

const MDRender = dynamic(() => import("~/components/markdown/md_render"));

export async function getStaticPaths() {
  const allBlogs = await getBlogs();
  const paths = allBlogs.blogs.map((x) => {
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
      await getData(`blogs/${context.params.file_name}`)
    ).toString();

    const blog = parseBlog(dataRaw, context.params.file_name);

    const end = dataRaw.lastIndexOf("\n---") + 5;
    const data = dataRaw.slice(end);

    const configs = await getConfigs();

    const bvp: BlogViewProps = {
      data,
      configs,
      blog,
    };
    return {
      props: bvp,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export interface BlogViewProps {
  data: string;
  configs: Configs;
  blog: Blog;
}

export default function BlogView(props: BlogViewProps) {
  const title = `${props.blog.fileName} | ${props.configs.appName}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={props.blog.desc} />
        <meta property="og:image" content={props.blog.imgUrl} />
      </Head>

      <MDRender data={props.data} />
    </>
  );
}
