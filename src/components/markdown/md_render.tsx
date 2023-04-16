/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import dynamic from "next/dynamic";
import {
  // type PluggableList,
  type ReactMarkdownOptions,
} from "react-markdown/lib/react-markdown";
// import { useEffect, useState } from "react";
import AbsoluteLoading from "./absolute_loading";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const ReactMarkdown = dynamic<ReactMarkdownOptions>(
  () =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    import("react-markdown").then((e: any) => e.default),
  {
    loading: () => <AbsoluteLoading />,
  }
);

interface MDRender {
  data: string;
}
export default function MDRender(props: MDRender) {
  // const [rehypeRaw, setRehypeRaw] = useState<PluggableList>();
  // const [remarkGfm, setRemarkGfm] = useState<PluggableList>();

  // useEffect(() => {
  //   const t = async () => {
  //     const m = (await import("rehype-raw")).default;
  //     setRehypeRaw([m]);
  //   };
  //   void t();

  //   const t1 = async () => {
  //     const m = (await import("remark-gfm")).default;
  //     setRemarkGfm([m]);
  //   };

  //   void t1();
  //   void t();
  // }, []);

  return (
    <article className="container prose prose-stone relative mx-auto max-w-3xl px-2 prose-headings:my-1 prose-a:my-1 prose-a:text-blue-600 prose-a:no-underline prose-li:my-0 prose-img:my-2 prose-img:inline-block prose-img:rounded-xl">
      {/* {(!rehypeRaw || !remarkGfm) && <AbsoluteLoading />} */}
      <ReactMarkdown
        components={{
          a: ({ children, ...props }) => {
            if (props.href?.includes("http")) {
              props.target = "_blank";
              props.rel = "noopener noreferrer";
              props.className = "hover:underline";
            }
            return <a {...props}>{children}</a>;
          },
          img: ({ ...props }) => (
            <span className="flex justify-center">
              <img {...props} />
            </span>
          ),
        }}
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
      >
        {props.data}
      </ReactMarkdown>
    </article>
  );
}
