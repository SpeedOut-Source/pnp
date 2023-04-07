import { type WorkForProps } from "~/app_function/utils/interfaces";
import CompanyCard from "./company_card";

export default function WorkFor(props: WorkForProps) {
  return (
    <div className="mx-auto h-fit w-full px-4 sm:mx-0 lg:max-w-2xl lg:px-0">
      <p className="text-2xl normal-case text-slate-400">
        {"I've done work for"}
      </p>
      <div className="mx-auto grid w-full justify-center gap-2 py-4 sm:grid-cols-2 md:mx-2 md:grid-cols-3 md:gap-4">
        {props.company.map((x) => (
          <CompanyCard key={x.logoUrl} {...x} />
        ))}
      </div>
    </div>
  );
}
