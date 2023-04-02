import Link from "next/link";
import * as React from "react";

export interface ILinksProps {
  className: string;
}

export default function Links(props: ILinksProps) {
  return (
    <div className={props.className}>
      <Link href="/blogs" className="link-hover link">
        Blogs
      </Link>
      <Link href="/resume" className="link-hover link">
        Resume
      </Link>
      <Link href="/contract" className="link-hover link">
        Contract
      </Link>
    </div>
  );
}
