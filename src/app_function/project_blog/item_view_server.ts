import {
  addBlurList,
  extractImageUrlsFromMarkdown,
  getCard,
  getData,
} from "../utils/utils-server";
import matter from "gray-matter";
import { type App, type Card, type CardData } from "../utils/interfaces";
import { RingBuffer } from "../utils/ring_buffer";
import { remark } from "remark";
import { headingTree, type TransformNodeOutput } from "../remark/headings";
import { type ProjectBlogViewProps } from "~/components/view/project_blog_view";
import { join } from "path";
import { env } from "~/env.mjs";

export async function getStaticPathItemView(type: Card) {
  const allData: CardData = await getCard(type);

  const paths = allData.map((x) => {
    const fileName = x.fileName.slice(0, -3);
    return {
      file_name:
        env.NODE_ENV === "development"
          ? encodeURIComponent(fileName)
          : fileName,
      category: type,
    };
  });

  return paths;
}

export interface ProjectBlogGetStaticServer {
  file_name?: string;
  type: Card;
}

export async function getStaticPropsItemView({
  file_name,
  type,
}: ProjectBlogGetStaticServer) {
  if (!file_name || typeof file_name !== "string") {
    return "-1";
  }
  try {
    const decodedPath = decodeURIComponent(decodeURIComponent(file_name));
    const filePath = join(type, decodedPath);
    const dataRaw = (await getData(filePath)).toString();

    const { content } = matter(dataRaw);

    const allData = await getCard(type);

    const currentProjectIndex = allData.findIndex(
      (p) => p.fileName === decodedPath,
    );

    const previous = allData[currentProjectIndex - 1] ?? null;
    const next = allData[currentProjectIndex + 1] ?? null;

    const itemView = allData[currentProjectIndex];
    if (!itemView) {
      return "-1";
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
      (itemView as App).imgsBlurData = await addBlurList(images);
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

    return pvp;
  } catch (e) {
    console.error(e);
    return "-1";
  }
}
