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
      className="w-fit"
      type="button"
      ref={searchButtonRef}
      onClick={(e) => {
        setOpen(e as unknown as MouseEvent);
      }}
    >
      <div
        className="p-card flex w-fit cursor-pointer items-center gap-3 overflow-visible rounded-full bg-transparent px-3 lg:rounded-xl lg:bg-base-300">
        <MagnifyingGlassIcon className="h-5 w-5" />
        {actionKey && (
          <div className="hidden items-center gap-1 lg:flex">
            <kbd
              data-tip={actionKey[1]}
              className="kbd tooltip tooltip-bottom kbd-sm text-base-content no-underline"
            >
              {actionKey[0]}
            </kbd>{" "}
            <kbd className="kbd kbd-sm">k</kbd>
          </div>
        )}
      </div>
    </button>
  );
}
