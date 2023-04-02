import ConnectButton from "./connect_button";

export default function ConnectSection() {
  return (
    <div className="w-fit items-center gap-3 rounded-xl bg-slate-200 px-4 md:flex lg:flex xl:flex">
      <div className="font-semibold tracking-wider">Connect on</div>
      <div className="flex items-center">
        <ConnectButton text="Github" url="https://github.com/biplobsd" />
        <ConnectButton
          text="Linkedin"
          url="https://www.linkedin.com/in/biplob-sutradhar/"
        />
        <ConnectButton text="Twitter" url="https://twitter.com/_biplobsd" />
        <ConnectButton text="Gmail" url="mailto:biplobsd11@gamil.com" />
      </div>
    </div>
  );
}
