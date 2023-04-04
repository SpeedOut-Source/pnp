/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import styles from "../../styles/markdown.module.css";
import dynamic from "next/dynamic";
import { type ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const ReactMarkdown: ReactMarkdownOptions | any = dynamic(() =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  import("react-markdown").then((e: any) => e.default)
);

interface MDRender {
  text: string;
}
export default function MDRender(props: MDRender) {
  return (
    <div className={styles.markdownBody}>
      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
        {props.text}
      </ReactMarkdown>
    </div>
  );
}
