import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRef, useEffect, useCallback } from "react";
import { useActionKey } from "~/app_function/hooks/useActionKey";
import { useSearchModeStore } from "~/app_state/search_open";

export function SearchButton() {
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);
  const actionKey = useActionKey();
  const searchModeStore = useSearchModeStore();

  const setOpen = useCallback(
    (e: MouseEvent | KeyboardEvent) => {
      e.preventDefault();
      searchModeStore.setIsOpen(!searchModeStore.isOpen);
    },
    [searchModeStore]
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (searchButtonRef && searchButtonRef.current) {
        if (
          (event.keyCode === 27 && searchModeStore.isOpen) ||
          (event.key === "k" && (event.metaKey || event.ctrlKey))
        ) {
          setOpen(event);
        }
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [searchModeStore, searchButtonRef, setOpen]);

  return (
    <button
      className="w-56 md:w-fit"
      type="button"
      ref={searchButtonRef}
      onClick={(e) => {
        setOpen(e as unknown as MouseEvent);
      }}
    >
      <div className="p-card flex cursor-pointer items-center gap-3 overflow-visible rounded-xl bg-base-300 px-4">
        <MagnifyingGlassIcon className="h-5 w-5" />
        {actionKey && (
          <kbd className="font-sans font-semibold text-base-content">
            <label
              data-tip={actionKey[1]}
              className="tooltip tooltip-bottom text-base-content no-underline"
            >
              {actionKey[0]}
            </label>{" "}
            K
          </kbd>
        )}
      </div>
    </button>
  );
}
