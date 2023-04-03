/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import styles from "../../styles/markdown.module.css";
import dynamic from "next/dynamic";
import { type ReactMarkdownOptions } from "react-markdown/lib/react-markdown";

const ReactMarkdown: ReactMarkdownOptions | any = dynamic(() =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  import("react-markdown").then((e: any) => e.default)
);
const rehypeRaw = dynamic(() =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  import("rehype-raw").then((e: any) => e.default)
);

const remarkGfm = dynamic(() =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  import("remark-gfm").then((e: any) => e.default)
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
