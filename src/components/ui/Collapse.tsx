import { ReactNode } from "react";

interface CollapseProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}

export function Collapse({
  title,
  children,
  defaultOpen = false,
  className = "",
  titleClassName = "",
  contentClassName = "",
}: CollapseProps) {
  return (
    <div
      tabIndex={0}
      className={`collapse-arrow bg-base-100 border-base-300 collapse border ${className}`}
    >
      <input type="checkbox" defaultChecked={defaultOpen} className="peer" />
      <div className={`collapse-title font-semibold ${titleClassName}`}>
        {title}
      </div>
      <div className={`collapse-content text-sm ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
}
