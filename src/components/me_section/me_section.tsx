import Me, { type MeProps } from "./me";
import RXT, { type RXTProps } from "./r_x_t";

export interface MeSectionProps {
  techs: RXTProps;
  me: MeProps;
}

export default function MeSection(props: MeSectionProps) {
  return (
    <div className="mx-4 flex flex-col items-center justify-center gap-4 md:flex-row lg:flex-col xl:flex-col">
      <Me {...props.me} />
      <RXT techs={props.techs.techs} />
    </div>
  );
}
