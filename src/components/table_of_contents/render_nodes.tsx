"use client";

import { useHighlighted } from "~/app_function/hooks/useHighlighted";
import type { TransformNodeOutput } from "~/app_function/remark/headings";

export interface RenderNodesProps {
  nodes: TransformNodeOutput[];
}

export default function RenderNodes({ nodes }: RenderNodesProps) {
  return (
    <ul>
      {nodes.map((node) => (
        <li key={node.data.hProperties.id}>
          <TOCLink {...node} />
          {node.children?.length > 0 && <RenderNodes nodes={node.children} />}
        </li>
      ))}
    </ul>
  );
}

const TOCLink = (node: TransformNodeOutput) => {
  const fontSizes = new Map<number, string>([
    [2, "text-base"],
    [3, "text-sm"],
    [4, "text-xs"],
  ]);

  const id = node.data.hProperties.id;
  const { value } = useHighlighted(id);
  return (
    <a
      href={`#${id}`}
      className={`block whitespace-normal ${fontSizes.get(node.depth) ?? "text-base"} py-1 ${
        value ? "focus" : ""
      }`}
    >
      {node.value}
    </a>
  );
};
