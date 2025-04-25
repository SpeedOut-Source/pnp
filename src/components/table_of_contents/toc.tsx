"use client";

import RenderNodes, { type RenderNodesProps } from "./render_nodes";

export default function TableOfContents({ nodes }: RenderNodesProps) {
  if (!nodes.length) {
    return null;
  }

  return (
    <div className="bg-base-100/40 ring-base-content/5 max-w-xs rounded-2xl p-2 ring-1">
      <h3 className="text-md mt-1 ml-2 font-semibold">Table of contents</h3>
      <div className="scrollbar-style menu menu-xs max-h-[80vh] overflow-y-auto">
        <RenderNodes nodes={nodes} />
      </div>
    </div>
  );
}
