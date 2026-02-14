"use client";

import { Dialog, DialogPanel, TransitionChild } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useSearchModeStore } from "~/app_state/search_open";
import AutoComplete from "./search";
import { usePathname } from "next/navigation";

export default function SearchDialog() {
  const searchModeStore = useSearchModeStore();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(searchModeStore.isOpen);

  useEffect(() => {
    setIsOpen(searchModeStore.isOpen);
  }, [searchModeStore.isOpen]);

  useEffect(() => {
    if (isOpen) {
      searchModeStore.setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const closeModal = useCallback(() => {
    searchModeStore.setIsOpen(false);
  }, [searchModeStore]);

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50"
      onClose={closeModal}
      transition
    >
      <TransitionChild
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/50" />
      </TransitionChild>

      <div className="fixed top-0 flex w-full justify-center">
        <div className="mb-2 flex h-screen w-full items-center justify-center text-center md:p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="bg-base-300 relative h-full w-full transform pb-2 text-left align-middle transition-all md:rounded-2xl md:shadow-xl lg:max-w-6xl">
              <div className="absolute flex w-full justify-end p-2">
                <button
                  onClick={closeModal}
                  className="btn btn-ghost m-0 h-fit min-h-fit p-0"
                >
                  <kbd className="kbd kbd-xs">ESC</kbd>
                </button>
              </div>
              <div className="h-full w-full pt-9">
                <AutoComplete />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  );
}
