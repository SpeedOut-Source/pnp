import dynamic from "next/dynamic";
import { type Options } from "react-markdown";
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
import { type Element } from "hast";

// Register syntax highlighter languages
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

// Dynamic import for ReactMarkdown with proper typing
const ReactMarkdown = dynamic<Options>(
  () => import("react-markdown").then((mod) => mod.default),
  {
    loading: () => <Skeleton count={3} />,
  },
);

interface MDRenderProps {
  data: string;
  imgBlurdata?: ImgBlurData;
}

export default function MDRender({ data, imgBlurdata }: MDRenderProps) {
  return (
    <div className="prose prose-stone bg-base-100/80 ring-base-content/5 prose-headings:my-1 prose-a:my-1 prose-a:text-blue-600 prose-a:no-underline prose-pre:m-0 prose-pre:bg-transparent prose-pre:p-0 prose-li:my-0 prose-img:my-2 prose-img:inline-block prose-img:rounded-xl relative container mx-auto max-w-3xl rounded-2xl px-4 py-2 ring-1">
      <ReactMarkdown
        components={{
          img: ({ ...props }) => {
            if (!props.src) return <></>;

            const blurDataURL = imgBlurdata
              ? imgBlurdata.hasOwnProperty(props.src as string)
                ? imgBlurdata[props.src as string]
                : undefined
              : undefined;

            return (
              <Image
                {...props}
                src={props.src as string}
                alt={props.alt || ""}
                blurDataURL={blurDataURL ? blurDataURL.base64 : undefined}
                placeholder={blurDataURL ? "blur" : "empty"}
                width={
                  props.width
                    ? parseFloat(String(props.width))
                    : blurDataURL
                      ? blurDataURL.width
                      : 0
                }
                height={
                  props.height
                    ? parseFloat(String(props.height))
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
              return (
                <a
                  {...props}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all hover:underline"
                >
                  {children}
                </a>
              );
            }
            return <a {...props}>{children}</a>;
          },
          code: ({ className, children, ...props }) => {
            const hasLang = /language-(\w+)/.exec(className ?? "");

            if (hasLang) {
              return (
                <SyntaxHighlighter
                  style={oneDark}
                  language={hasLang[1]}
                  PreTag="div"
                  className="scrollbar-style mockup-code"
                  showLineNumbers={true}
                  useInlineStyles={true}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            }

            return (
              <code className={`${className ?? ""} break-all`} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ node, children, ...props }) => {
            // Type-safe access to node properties
            const codeElement = node?.children?.[0] as Element | undefined;
            const codeTextNode = codeElement?.children?.[0];

            const codeChunk =
              codeTextNode && "value" in codeTextNode
                ? String(codeTextNode.value)
                : "";

            // Get language from the code element's className
            const codeProps = Array.isArray(children) ? children[0] : children;

            const language =
              codeProps &&
              typeof codeProps === "object" &&
              "props" in codeProps &&
              codeProps.props?.className
                ? String(codeProps.props.className).replace(/language-/g, "")
                : "text";

            return (
              <div className="relative overflow-x-hidden">
                <CopyToClipboardButton
                  style={{
                    right: 0,
                  }}
                  copyText={codeChunk}
                  tooltipText="Copy code"
                  className="tooltip-left absolute z-40 mt-5 mr-2"
                />
                <span
                  style={{
                    bottom: 0,
                    right: 0,
                  }}
                  className="bg-base-content/40 text-base-300 absolute z-40 mr-1 mb-5 rounded-lg p-1 text-xs uppercase backdrop-blur-xs"
                >
                  {language}
                </span>
                <pre {...props}>{children}</pre>
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
