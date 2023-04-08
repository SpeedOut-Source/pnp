import ContactItem from "./contact_item";
import { CONNECT_OPTIONS } from "./connect_data";

export default function ContactSection() {
  return (
    <div className="mx-auto h-fit max-w-6xl px-4 pt-5 sm:pl-4 sm:pr-0">
      <p className="text-center text-2xl normal-case text-slate-400">Contact</p>
      <div className="flex w-full justify-center">
        <div className="p-card my-3 h-fit w-fit overflow-visible hover:bg-base-200">
          <div className="mx-2 my-2 flex w-fit justify-center">
            <div className="grid w-fit grid-cols-1 gap-x-2 lg:flex">
              {CONNECT_OPTIONS.map((x) => (
                <ContactItem key={x.url} {...x} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
