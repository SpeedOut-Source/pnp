import { getCard, getConfigs, getData } from "../utils/utils-server";
import matter from "gray-matter";
import { type GetStaticPropsContext, type PreviewData } from "next";
import { type ParsedUrlQuery } from "querystring";
import { type ProjectBlogViewProps } from "~/pages/projects/view/[file_name]";
import { type Card, type CardData } from "../utils/interfaces";
import { RingBuffer } from "../utils/ring_buffer";

export async function getStaticPathItemView(type: Card) {
  const allData: CardData = await getCard(type);

  const paths = allData.map((x) => {
    return {
      params: {
        file_name: x.fileName
      }
    };
  });

  return {
    paths,
    fallback: false // can also be true or 'blocking'
  };
}

export interface ProjectBlogGetStaticServer {
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>;
  type: Card;
}

export async function getStaticPropsItemView({
                                               context,
                                               type
                                             }: ProjectBlogGetStaticServer) {
  if (
    !context.params ||
    !context.params.file_name ||
    typeof context.params.file_name !== "string"
  ) {
    return {
      notFound: true
    };
  }
  try {
    const dataRaw = (
      await getData(`${type}/${context.params.file_name}`)
    ).toString();

    const { content } = matter(dataRaw);

    const allData = await getCard(type);

    const currentProjectIndex = allData.findIndex(
      (p) => p.fileName === context.params?.file_name
    );
    const previous = allData[currentProjectIndex - 1] ?? null;
    const next = allData[currentProjectIndex + 1] ?? null;

    const configs = await getConfigs();

    const itemView = allData[currentProjectIndex];
    if (!itemView) {
      return {
        notFound: true
      };
    }
    let more4: unknown[] | null = null;
    if (type === "apps" || type === "company") {
      const ringBuffer = RingBuffer.fromArray(
        allData as unknown[],
        allData.length
      );
      ringBuffer.setPos(currentProjectIndex - 1);
      more4 = ringBuffer.toArray().slice(0, 5);
      more4.splice(1, 1);
    }

    const pvp: ProjectBlogViewProps = {
      data: content,
      configs,
      itemView,
      previous,
      next,
      type: type,
      more4: more4 as CardData | null
    };

    return {
      props: pvp
    };
  } catch (e) {
    return {
      notFound: true
    };
  }
}
