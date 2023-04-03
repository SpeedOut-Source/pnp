/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Head from "next/head";
import styles from "../styles/markdown.module.css";
import dynamic from "next/dynamic";
import { type ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import { PrivacyServer } from "~/app_function/privacy/privacy_server";

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

export interface PrivacyProps {
  data: string;
}

export default function Privacy(props: PrivacyProps) {
  return (
    <>
      <Head>
        <title>Privacy | Action Tokens</title>
        <meta name="description" content="Action Tokens Plot & sPlots" />
      </Head>

      <main className={styles.markdownBody}>
        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
          {props.data}
        </ReactMarkdown>
      </main>
    </>
  );
}

export async function getStaticProps() {
  return PrivacyServer();
}
