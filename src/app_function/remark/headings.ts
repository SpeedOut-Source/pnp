import { toString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";
import type { Root } from "remark-parse/lib";
import type { VFile } from "vfile";

export type TransformNodeOutput = {
  value: string;
  depth: number;
  data: {
    hProperties: {
      id: string;
    };
  };
  children: TransformNodeOutput[];
};

type IndexMap = Record<number, TransformNodeOutput>;

type Nodes = Record<string, number>;

function transformNode(
  node: TransformNodeOutput,
  output: TransformNodeOutput[],
  indexMap: IndexMap
) {
  const transformedNode: TransformNodeOutput = {
    value: toString(node),
    depth: node.depth,
    data: node.data,
    children: [],
  };

  if (node.depth === 2) {
    output.push(transformedNode);
    indexMap[node.depth] = transformedNode;
  } else if (node.depth !== 1) {
    const parent = indexMap[node.depth - 1];
    if (parent) {
      parent.children.push(transformedNode);
      indexMap[node.depth] = transformedNode;
    }
  }
}

export function headingTree() {
  return (node: Root, file: VFile) => {
    file.data.headings = getHeadings(node);
  };
}

function getHeadings(root: Root) {
  const nodes = {};
  const output: TransformNodeOutput[] = [];
  const indexMap = {};
  visit(root, "heading", (node) => {
    addID(node as unknown as TransformNodeOutput, nodes);
    transformNode(node as unknown as TransformNodeOutput, output, indexMap);
  });
  return output;
}

function addID(node: TransformNodeOutput, nodes: Nodes) {
  const id = node.children.map((c) => c.value).join("");
  nodes[id] = (nodes[id] ?? 0) + 1;
  node.data = node.data || {
    hProperties: {
      id: `${id}${nodes[id] ?? 0 > 1 ? ` ${nodes[id] ?? 0 - 1}` : ""}`
        .replace(/[^a-zA-Z\d\s-]/g, "")
        .split(" ")
        .join("-")
        .toLowerCase(),
    },
  };
}
