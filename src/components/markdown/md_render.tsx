/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck

import dynamic from "next/dynamic";
import { type ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { headingTree } from "~/app_function/remark/headings";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import React from "react";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import lua from "react-syntax-highlighter/dist/cjs/languages/prism/lua";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import sql from "react-syntax-highlighter/dist/cjs/languages/prism/sql";
import dart from "react-syntax-highlighter/dist/cjs/languages/prism/dart";
import CopyToClipboardButton from "../copy_to_clipboard_button";
import Image from "next/image";
import { type ImgBlurData } from "~/app_function/utils/interfaces";
import Skeleton from "../skeleton";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("lua", lua);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("sql", sql);
SyntaxHighlighter.registerLanguage("dart", dart);

const ReactMarkdown = dynamic<ReactMarkdownOptions>(
  () =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
    import("react-markdown").then((e: any) => e.default),
  {
    loading: () => <Skeleton count={3} />,
  },
);

interface MDRender {
  data: string;
  imgBlurdata?: ImgBlurData;
}

export default function MDRender({ data, imgBlurdata }: MDRender) {
  return (
    <div className="container prose prose-stone relative mx-auto max-w-3xl rounded-2xl bg-base-100/80 px-4 py-2 ring-1 ring-base-content/5 prose-headings:my-1 prose-a:my-1 prose-a:text-blue-600 prose-a:no-underline prose-pre:m-0 prose-pre:bg-transparent prose-pre:p-0 prose-li:my-0 prose-img:my-2 prose-img:inline-block prose-img:rounded-xl">
      <ReactMarkdown
        components={{
          img: ({ ...props }) => {
            if (!props.src) return <></>;

            if (!imgBlurdata) return <img {...props} />;

            const blurDataURL = imgBlurdata.hasOwnProperty(props.src)
              ? imgBlurdata[props.src]
              : undefined;

            return (
              <Image
                {...props}
                blurDataURL={blurDataURL ? blurDataURL.base64 : undefined}
                placeholder={blurDataURL ? "blur" : "empty"}
                width={
                  props.width
                    ? parseFloat(props.width)
                    : blurDataURL
                      ? blurDataURL.width
                      : 0
                }
                height={
                  props.height
                    ? parseFloat(props.height)
                    : blurDataURL
                      ? blurDataURL.height
                      : 0
                }
                sizes="100vw"
                className={props.width ? undefined : "w-auto"}
              />
            );
          },
          a: ({ children, ...props }) => {
            if (props.href?.includes("http")) {
              props.target = "_blank";
              props.rel = "noopener noreferrer";
              props.className = "hover:underline break-all";
            }
            return <a {...props}>{children}</a>;
          },
          code({ inline, className, ...props }) {
            const hasLang = /language-(\w+)/.exec(className ?? "");
            return !inline && hasLang ? (
              <SyntaxHighlighter
                style={oneDark}
                language={hasLang[1]}
                PreTag="div"
                className="scrollbar-style mockup-code"
                showLineNumbers={true}
                useInlineStyles={true}
              >
                {String(props.children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={`${className} break-all`} {...props} />
            );
          },
          pre: (pre) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const codeChunk = (pre as any).node.children[0].children[0]
              .value as string;

            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            const language = (pre as any).children[0]?.props.className.replace(
              /language-/g,
              "",
            ) as string;

            return (
              <div className="relative overflow-x-hidden">
                <CopyToClipboardButton
                  style={{
                    right: 0,
                  }}
                  copyText={codeChunk}
                  tooltipText="Copy code"
                  className="tooltip-left absolute z-40 mr-2 mt-5"
                />
                <span
                  style={{
                    bottom: 0,
                    right: 0,
                  }}
                  className="absolute z-40 mb-5 mr-1 rounded-lg bg-base-content/40 p-1 text-xs uppercase text-base-300 backdrop-blur-sm"
                >
                  {language}
                </span>
                <pre {...pre}></pre>
              </div>
            );
          },
        }}
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm, headingTree]}
      >
        {data}
      </ReactMarkdown>
    </div>
  );
}
