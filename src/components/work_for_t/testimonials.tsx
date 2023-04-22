import dynamic from "next/dynamic";
import { type Testimonial } from "./testi_card";
import { ChatBubbleLeftRightIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "~/app_function/utils/useIsomorphicLayoutEffect";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
export interface TestimonialsProps {
  testis: Testimonial[];
  addUrl: string;
}

const TestiCard = dynamic(() => import("./testi_card"));

type tt = Testimonial | undefined;

export default function Testimonials(props: TestimonialsProps) {
  const [expanded, setExpanded] = useState(false);
  const [showCollapseButton, setShowCollapseButton] = useState(false);
  const [transition, setTransition] = useState(false);
  const { ref: inViewRef, inView } = useInView({ threshold: 0 });

  const l1: tt[] = [];
  const l2: tt[] = [];
  const l3: tt[] = [];

  for (let index = 0; index < props.testis.length; index++) {
    switch (index % 3) {
      case 0:
        l1.push(props.testis[index]);
        break;
      case 1:
        l2.push(props.testis[index]);
        break;
      case 2:
        l3.push(props.testis[index]);
        break;
      default:
        break;
    }
  }

  const ref = useRef<HTMLDivElement | null>(null);
  const [initial, setInitial] = useState([true, true]);

  useIsomorphicLayoutEffect(() => {
    if (initial[0]) {
      setInitial([false, true]);
      return;
    }

    if (initial[1]) {
      setInitial([false, false]);
      return;
    }

    if (!ref.current) {
      return;
    }
    if (expanded) {
      ref.current.focus({ preventScroll: expanded });
      setShowCollapseButton(false);
    } else {
      ref.current.focus();
      ref.current.scrollIntoView();
    }
  }, [expanded]);

  useEffect(() => {
    setTimeout(() => setTransition(expanded), 0);
  }, [expanded]);

  useEffect(() => {
    if (!expanded || !inView) return;
    function onScroll() {
      if (!ref.current) return;
      const bodyRect = document.body.getBoundingClientRect();
      const rect = ref.current.getBoundingClientRect();
      const middle =
        rect.top + rect.height / 4 - bodyRect.top - window.innerHeight / 2;
      const isHalfWay = window.scrollY > middle;

      if (showCollapseButton && !isHalfWay) {
        setShowCollapseButton(false);
      } else if (!showCollapseButton && isHalfWay) {
        setShowCollapseButton(true);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [expanded, showCollapseButton, inView]);

  return (
    <div
      ref={ref}
      className="relative mx-auto h-fit w-full px-3 sm:mx-0 lg:max-w-2xl lg:px-0"
    >
      <p className="flex items-center gap-2 text-2xl normal-case text-slate-400">
        <ChatBubbleLeftRightIcon className="h-5 w-5" /> Testimonials{" "}
        <Link
          href={props.addUrl}
          className="tooltip"
          data-tip="Give Testimonial"
          target="_blank"
        >
          <PlusIcon className="h-5 w-5" />
        </Link>
      </p>
      <div className="relative md:mx-2">
        <div
          ref={inViewRef}
          className={`${
            expanded
              ? showCollapseButton
                ? "mb-16"
                : ""
              : "max-h-[33rem] overflow-hidden md:max-h-80"
          } mx-auto grid w-full items-start justify-center gap-2 rounded-b-3xl py-4 transition-all duration-500 ease-in-out sm:grid-cols-2 md:grid-cols-3`}
        >
          <ul className="space-y-2 ">
            {l1.map((x) => {
              if (x)
                return (
                  <li key={x.imgUrl}>
                    <TestiCard {...x} addUrl={props.addUrl} />
                  </li>
                );
            })}
          </ul>
          <ul className="space-y-2">
            {l2.map((x) => {
              if (x)
                return (
                  <li key={x.imgUrl}>
                    <TestiCard {...x} addUrl={props.addUrl} />
                  </li>
                );
            })}
          </ul>
          <ul className="space-y-2">
            {l3.map((x) => {
              if (x)
                return (
                  <li key={x.imgUrl} className="hover:z-50">
                    <TestiCard {...x} addUrl={props.addUrl} />
                  </li>
                );
            })}
          </ul>
        </div>

        <div
          className={`${
            expanded
              ? "sticky -mt-52 transition-opacity duration-300"
              : "absolute"
          } ${transition ? "transition-opacity duration-300" : ""} ${
            expanded ? (showCollapseButton ? "visible" : "invisible") : ""
          } inset-x-0 bottom-0 z-40 flex justify-center overflow-hidden rounded-3xl bg-gradient-to-t from-base-300 pb-8 pt-32 `}
        >
          <button
            onClick={() => setExpanded((x) => !x)}
            className={`${transition ? "transition-transform" : ""} ${
              expanded ? (!showCollapseButton ? "translate-y-4" : "") : ""
            } ${
              !expanded || showCollapseButton ? "pointer-events-auto" : ""
            } p-card ring ring-base-content/10`}
          >
            {expanded ? "Okay, I get the point" : "Show more..."}
          </button>
        </div>
      </div>
    </div>
  );
}
