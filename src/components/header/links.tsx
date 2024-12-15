import dynamic from "next/dynamic";

const Link = dynamic(() => import("next/link"));

export interface ILinksProps {
  className: string;
}

export default function Links(props: ILinksProps) {
  return (
    <div className={props.className}>
      <span className="tooltip tooltip-bottom" data-tip="View all">
        <Link href="/blogs" className="link-hover link">
          Blogs
        </Link>
      </span>
      <span className="tooltip tooltip-bottom" data-tip="View all">
        <Link href="/apps" className="link-hover link">
          Apps
        </Link>
      </span>
      <span className="tooltip tooltip-bottom" data-tip="View all">
        <Link href="/projects" className="link-hover link">
          Projects
        </Link>
      </span>
      <span className="tooltip tooltip-bottom" data-tip="View">
        <Link href="/resume" className="link-hover link">
          Resume
        </Link>
      </span>
    </div>
  );
}
