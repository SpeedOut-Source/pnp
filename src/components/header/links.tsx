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
        <Link href="/projects" className="link-hover link">
          Projects
        </Link>
      </span>
      <span className="tooltip tooltip-bottom" data-tip="View">
        <Link
          target="_blank"
          href="https://drive.google.com/file/d/1-btObZRvgGQ5-_oP5rDnPVXkekxZOOzM/view?usp=sharing"
          className="link-hover link"
        >
          Resume
        </Link>
      </span>
    </div>
  );
}
