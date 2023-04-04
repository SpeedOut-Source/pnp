import Link from "next/link";
import { type ReactNode } from "react";

const LinkWrapper = ({
  href,
  children,
  disabled,
  className,
}: {
  href: string;
  children: ReactNode;
  className: string;
  disabled: boolean;
}) => {
  if (href === "#") {
    return (
      <button className={className} disabled={disabled}>
        {children}
      </button>
    );
  }
  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
};

export default LinkWrapper;
