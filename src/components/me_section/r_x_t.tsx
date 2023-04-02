interface RXTProps {
  techs: string[];
}

export default function RXT(props: RXTProps) {
  return (
    <div className="btn-ghost btn h-fit max-w-sm cursor-default space-y-4 rounded-xl bg-slate-200 p-4 text-start normal-case tracking-wider">
      <p className="text-start font-bold">Recent Expertise Technology</p>
      <p>{props.techs.join(", ")} ...</p>
    </div>
  );
}
