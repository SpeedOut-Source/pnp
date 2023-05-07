import { type Company } from "~/app_function/utils/interfaces";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useThemeStore, DEFAULT_IS_LIGHT } from "~/app_state/theme_mode";
import { Highlight } from "../search/Highlight";
import { type CompanyHit } from "~/app_function/types/HitTypes";

const Link = dynamic(() => import("next/link"));
const Image = dynamic(() => import("next/legacy/image"));
const TimeLine = dynamic(() => import("./time_line"), { ssr: false });

export default function LayoutCardCompany(x: Company) {
  const utm = useThemeStore();
  const [isLight, setIsLight] = useState(DEFAULT_IS_LIGHT);
  const [color, setColor] = useState(false);

  useEffect(() => {
    setIsLight(utm.themeName === "winter");
  }, [utm]);

  return (
    <span className="tooltip w-full" data-tip="More details">
      <Link
        href={`/company/view/${x.fileName}`}
        onPointerEnter={() => setColor(true)}
        onPointerLeave={() => setColor(false)}
        className="p-card flex h-full w-full cursor-pointer flex-col py-4"
      >
        <div className="relative mx-auto mb-2 h-10 w-10 overflow-hidden">
          <Image
            blurDataURL={x.imgBlurData ? x.imgBlurData : undefined}
            placeholder={x.imgBlurData ? "blur" : undefined}
            className={isLight || color ? "opacity-80" : "invert-colors"}
            alt={x.title}
            src={x.imgUrl}
            objectFit="fill"
            layout="fill"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-widest">
            <Highlight hit={x as CompanyHit} attribute="title" />
          </span>
          <TimeLine start={x.start} end={x.end} />
        </div>
      </Link>
    </span>
  );
}
