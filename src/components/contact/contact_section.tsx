import ContactItem from "./contact_item";
import { CONNECT_OPTIONS } from "./connect_data";

export default function ContactSection() {
  return (
    <div className="mx-auto h-fit max-w-6xl px-4 pt-5 sm:pr-0 sm:pl-4">
      <p className="text-center text-2xl text-slate-400 normal-case">Contact</p>
      <div className="flex w-full justify-center">
        <div className="p-card hover:bg-base-200 my-3 h-fit w-fit animate-none! overflow-visible active:scale-100!">
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
