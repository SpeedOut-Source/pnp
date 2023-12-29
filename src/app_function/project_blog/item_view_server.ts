import {
  addBlurList,
  extractImageUrlsFromMarkdown,
  getCard,
  getData,
} from "../utils/utils-server";
import matter from "gray-matter";
import { type GetStaticPropsContext, type PreviewData } from "next";
import { type ParsedUrlQuery } from "querystring";
import { type ProjectBlogViewProps } from "~/pages/projects/view/[file_name]";
import { type App, type Card, type CardData } from "../utils/interfaces";
import { RingBuffer } from "../utils/ring_buffer";
import { remark } from "remark";
import { type TransformNodeOutput, headingTree } from "../remark/headings";

export async function getStaticPathItemView(type: Card) {
  const allData: CardData = await getCard(type);

  const paths = allData.map((x) => {
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

export interface ProjectBlogGetStaticServer {
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>;
  type: Card;
}

export async function getStaticPropsItemView({
  context,
  type,
}: ProjectBlogGetStaticServer) {
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
      await getData(`${type}/${context.params.file_name}`)
    ).toString();

    const { content } = matter(dataRaw);

    const allData = await getCard(type);

    const currentProjectIndex = allData.findIndex(
      (p) => p.fileName === context.params?.file_name,
    );
    const previous = allData[currentProjectIndex - 1] ?? null;
    const next = allData[currentProjectIndex + 1] ?? null;

    const itemView = allData[currentProjectIndex];
    if (!itemView) {
      return {
        notFound: true,
      };
    }
    let more4: unknown[] | null = null;
    if (type === "apps" || type === "company") {
      const ringBuffer = RingBuffer.fromArray(
        allData as unknown[],
        allData.length,
      );
      ringBuffer.setPos(currentProjectIndex - 1);
      more4 = ringBuffer.toArray().slice(0, 5);
      more4.splice(1, 1);
    }
    const imgBlurdata = await addBlurList(
      extractImageUrlsFromMarkdown(content),
    );

    if (type === "apps") {
      const images = (itemView as App).imgs;
      const imgBlurdata = await addBlurList(images);
      (itemView as App).imgsBlurData = imgBlurdata;
    }

    const processedContentTOC = await remark()
      .use(headingTree)
      .process(content);

    const pvp: ProjectBlogViewProps = {
      data: content,
      imgBlurdata,
      itemView,
      previous,
      next,
      type: type,
      more4: more4 as CardData | null,
      toc: processedContentTOC.data.headings as TransformNodeOutput[],
    };

    return {
      props: pvp,
    };
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
}
