/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import dynamic from "next/dynamic";
import { type ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const ReactMarkdown: ReactMarkdownOptions | any = dynamic(() =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  import("react-markdown").then((e: any) => e.default)
);

interface MDRender {
  data: string;
}
export default function MDRender(props: MDRender) {
  return (
    <article className="container prose prose-stone mx-auto max-w-3xl px-2 prose-headings:my-1 prose-a:my-1 prose-a:text-blue-600 prose-li:my-0 prose-img:my-2 prose-img:inline-block prose-img:rounded-xl">
      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
        {props.data}
      </ReactMarkdown>
    </article>
  );
}
