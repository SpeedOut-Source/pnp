import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";

export interface RXTProps {
  techs: string[];
}

export default function RXT(props: RXTProps) {
  return (
    <div className="p-card h-fit w-full space-y-4 p-4 text-justify xl:max-w-md ">
      <p className="flex w-full items-center gap-2 text-start font-bold">
        <WrenchScrewdriverIcon className="h-5 w-5" />
        Recent Expertise Technology
      </p>
      <p>{props.techs.join(", ")} ...</p>
    </div>
  );
}
