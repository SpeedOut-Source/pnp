import Image from "next/image";
import Link from "next/link";
import { type WorkForProps } from "~/app_function/utils/interfaces";

export default function WorkFor(props: WorkForProps) {
  return (
    <div className="mx-auto h-fit w-full px-4 sm:mx-0 lg:max-w-2xl lg:px-0">
      <p className="text-2xl normal-case text-slate-400">
        {"I've done work for"}
      </p>
      <div className="mx-auto grid w-full justify-center gap-2 py-4 sm:grid-cols-2 md:mx-2 md:grid-cols-3 md:gap-4">
        {props.company.map((x) => (
          <span className="tooltip" data-tip={"Visit website"} key={x.name}>
            <Link target="_blank" href={x.homePage} className="w-full">
              <div className="p-card flex h-fit w-full cursor-pointer flex-col  py-2">
                <div className="relative mx-auto mb-2 h-10 w-10 overflow-hidden">
                  <Image
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
        ))}
      </div>
    </div>
  );
}
