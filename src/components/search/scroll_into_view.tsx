import { type ReactNode, forwardRef, type ForwardedRef } from "react";

interface ScrollIntoViewProps<T> {
  data: T[];

  children: ReactNode;
}

export default forwardRef(function ScrollIntoView<T>(
  props: ScrollIntoViewProps<T>,
  ref: ForwardedRef<HTMLSpanElement>
) {
  if (props.data.length <= 0) return <></>;
  return (
    <button
      data-tip="Scroll to section"
      className="link-hover link tooltip tooltip-bottom indicator"
      onClick={() => {
        const m = ref as React.RefObject<HTMLSpanElement>;
        m.current?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <div>
        {props.children}
        <span className="indicator-item badge">{props.data.length}</span>
      </div>
    </button>
  );
});
