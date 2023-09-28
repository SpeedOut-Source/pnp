import RenderNodes, { type RenderNodesProps } from "./render_nodes";

export default function TableOfContents({ nodes }: RenderNodesProps) {
  if (!nodes.length) {
    return null;
  }

  return (
    <div className="max-w-xs rounded-2xl bg-base-100/80 p-2 ring-1 ring-base-content/5">
      <h3 className="text-md">Table of contents</h3>
      <div className="menu menu-xs">
        <RenderNodes nodes={nodes} />
      </div>
    </div>
  );
}
