"use client";

import RenderNodes, { type RenderNodesProps } from "./render_nodes";

export default function TableOfContents({ nodes }: RenderNodesProps) {
  if (!nodes.length) {
    return null;
  }

  return (
    <div className="max-w-xs rounded-2xl bg-base-100/40 p-2 ring-1 ring-base-content/5">
      <h3 className="text-md ml-2 mt-1 font-semibold">Table of contents</h3>
      <div className="scrollbar-style menu menu-xs max-h-[80vh] overflow-y-auto">
        <RenderNodes nodes={nodes} />
      </div>
    </div>
  );
}
