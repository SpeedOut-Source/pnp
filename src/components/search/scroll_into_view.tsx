import { type ReactNode, forwardRef, type ForwardedRef } from "react";

interface ScrollIntoViewProps<T> {
  data: T[];

  children: ReactNode;
}

export default forwardRef(function ScrollIntoView<T>(
  props: ScrollIntoViewProps<T>,
  ref: ForwardedRef<HTMLSpanElement>,
) {
  if (props.data.length <= 0) return <></>;
  return (
    <button
      data-tip="Scroll to section"
      className="link-hover indicator link tooltip tooltip-bottom"
      onClick={() => {
        const m = ref as React.RefObject<HTMLSpanElement>;
        m.current?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <div>
        {props.children}
        <span className="badge indicator-item border-0 bg-base-200/40 text-xs text-base-content/50">
          {props.data.length}
        </span>
      </div>
    </button>
  );
});
