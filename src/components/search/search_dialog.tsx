import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect } from "react";
import { useSearchModeStore } from "~/app_state/search_open";
import AutoComplete from "./search";
import { useRouter } from "next/router";

export default function SearchDialog() {
  const searchModeStore = useSearchModeStore();

  const router = useRouter();
  
  const closeModal = useCallback(() => {
    searchModeStore.setIsOpen(false);
  }, [searchModeStore]);

  useEffect(() => {
    const handleComplete = closeModal;
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router, closeModal]);

  return (
    <Transition appear show={searchModeStore.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed top-0 flex w-full justify-center">
          <div className="flex h-fit items-center justify-center overflow-y-auto p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="h-fit w-screen transform overflow-y-auto rounded-2xl bg-base-300 pb-2 pt-6 text-left align-middle shadow-xl transition-all lg:max-w-6xl">
                <AutoComplete />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
