import Link from "next/link";
import Image from "next/image";
import { type Company } from "~/app_function/utils/interfaces";
import { useState, useEffect } from "react";
import { useThemeStore } from "~/app_state/theme_mode";

export default function CompanyCard(x: Company) {
  const utm = useThemeStore();
  const [isLight, setIsLight] = useState(true);
  const [color, setColor] = useState(false);

  useEffect(() => {
    setIsLight(utm.themeName === "winter");
  }, [utm]);

  return (
    <span className="tooltip" data-tip={"Visit website"} key={x.name}>
      <Link target="_blank" href={x.homePage} className="w-full">
        <div
          onPointerEnter={() => setColor(true)}
          onPointerLeave={() => setColor(false)}
          className="p-card flex h-fit w-full cursor-pointer flex-col  py-2"
        >
          <div className="relative mx-auto mb-2 h-10 w-10 overflow-hidden">
            <Image
              className={isLight || color ? "opacity-80" : "invert-colors"}
              alt={x.name}
              src={x.logoUrl}
              objectFit="fill"
              layout="fill"
            />
          </div>
          <span className="normal-case ">{x.name}</span>
        </div>
      </Link>
    </span>
  );
}
