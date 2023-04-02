import Image from "next/image";

interface Company {
  name: string;
  logoUrl: string;
}

interface WorkForProps {
  company: Company[];
}

export default function WorkFor(props: WorkForProps) {
  return (
    <div className="mx-auto h-fit w-full px-4 sm:mx-0 lg:max-w-2xl">
      <p className="text-2xl uppercase text-slate-400">
        {"I've done work for"}
      </p>
      <div className="mx-auto flex w-fit justify-center gap-6 py-4">
        {props.company.map((x) => (
          <div key={x.name} className="w-fit">
            <div className="relative mx-auto h-20 w-20">
              <Image
                alt=""
                src="/images/logos/action-tokens.png"
                objectFit="fill"
                layout="fill"
              />
            </div>
            <span className="uppercase">{x.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
