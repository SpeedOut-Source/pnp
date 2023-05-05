import {
  createAutocomplete,
  type AutocompleteOptions,
  type AutocompleteState,
} from "@algolia/autocomplete-core";
import { getAlgoliaResults } from "@algolia/autocomplete-preset-algolia";
import algoliasearch from "algoliasearch/lite";
import React, {
  type BaseSyntheticEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  type AppHit,
  type AllHit,
  type BlogHit,
} from "~/app_function/types/HitTypes";
import SearchApps from "../apps/search_apps";
import SearchBlogs from "../blogs/search_blogs";

const searchClient = algoliasearch(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!
);

export default function Autocomplete(
  props: Partial<AutocompleteOptions<AllHit>>
) {
  const [autocompleteState, setAutocompleteState] = useState<
    AutocompleteState<AllHit>
  >({
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    query: "",
    activeItemId: null,
    status: "idle",
  });
  const autocomplete = useMemo(
    () =>
      createAutocomplete<
        AllHit,
        BaseSyntheticEvent,
        React.MouseEvent,
        React.KeyboardEvent
      >({
        onStateChange({ state }) {
          setAutocompleteState(state);
        },
        insights: true,
        getSources() {
          return [
            {
              sourceId: "portfolio",
              getItems({ query }) {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: "blogs",
                      query,
                      params: {
                        hitsPerPage: 5,
                      },
                    },
                    {
                      indexName: "apps",
                      query,
                      params: {
                        hitsPerPage: 5,
                      },
                    },
                  ],
                });
              },
            },
          ];
        },
        ...props,
      }),
    [props]
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { getEnvironmentProps } = autocomplete;
  const apps = useMemo(() => {
    return autocompleteState.collections[0]?.items.filter(
      (i) => i.__autocomplete_indexName === "apps"
    ) as unknown as AppHit[];
  }, [autocompleteState.collections]);

  const blogs = useMemo(() => {
    return autocompleteState.collections[0]?.items.filter(
      (i) => i.__autocomplete_indexName === "blogs"
    ) as unknown as BlogHit[];
  }, [autocompleteState.collections]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (!formRef.current || !panelRef.current || !inputRef.current) {
      return undefined;
    }

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { onTouchStart, onTouchMove, onMouseDown } = getEnvironmentProps({
      formElement: formRef.current,
      inputElement: inputRef.current,
      panelElement: panelRef.current,
    });

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [getEnvironmentProps, autocompleteState.isOpen]);

  return (
    <div className="w-full" {...autocomplete.getRootProps({})}>
      <form
        ref={formRef}
        className="mb-4 flex w-full items-center gap-2 px-6"
        {...autocomplete.getFormProps({ inputElement: inputRef.current })}
      >
        <button
          className="p-card flex h-full cursor-pointer items-center rounded-xl"
          type="submit"
          title="Submit"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
        <input
          className="input w-full"
          ref={inputRef}
          {...autocomplete.getInputProps({
            inputElement: inputRef.current,
          })}
          placeholder="Search apps, blogs, projects etc"
        />
      </form>

      {autocompleteState.isOpen && (
        <div className="ml-2 h-[80vh] overflow-y-auto md:h-[85vh]">
          <div className="mr-2">
            <SearchApps data={apps} />
            <SearchBlogs data={blogs} />
          </div>
        </div>
      )}
    </div>
  );
}
