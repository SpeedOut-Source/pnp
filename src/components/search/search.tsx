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
import {
  ArchiveBoxXMarkIcon,
  FireIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  type AppHit,
  type AllHit,
  type BlogHit,
  type ProjectHit,
  type CompanyHit,
  type TestimonialHit,
} from "~/app_function/types/HitTypes";
import SearchApps from "../apps/search_apps";
import SearchBlogs from "../blogs/search_blogs";
import clsx from "clsx";
import ScrollIntoView from "./scroll_into_view";
import SearchProjects from "../projects/search_projects";
import SearchCompany from "../company/search_company";
import SearchTestimonials from "../work_for_t/serach_testimonials";
import {
  ALGOLIA_INDEX_APPS,
  ALGOLIA_INDEX_BLOGS,
  ALGOLIA_INDEX_COMPANY,
  ALGOLIA_INDEX_PROJECTS,
  ALGOLIA_INDEX_TESTIMONIALS,
} from "~/app_function/utils/constants";
import { env } from "../../env.mjs";

const searchClient = algoliasearch(
  env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  env.NEXT_PUBLIC_ALGOLIA_API_KEY
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
                      indexName: ALGOLIA_INDEX_BLOGS,
                      query,
                      params: {
                        hitsPerPage: 5,
                      },
                    },
                    {
                      indexName: ALGOLIA_INDEX_APPS,
                      query,
                      params: {
                        hitsPerPage: 5,
                      },
                    },
                    {
                      indexName: ALGOLIA_INDEX_PROJECTS,
                      query,
                      params: {
                        hitsPerPage: 5,
                      },
                    },
                    {
                      indexName: ALGOLIA_INDEX_COMPANY,
                      query,
                      params: {
                        hitsPerPage: 5,
                      },
                    },
                    {
                      indexName: ALGOLIA_INDEX_TESTIMONIALS,
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
  const appsRef = useRef<HTMLSpanElement>(null);
  const blogsRef = useRef<HTMLSpanElement>(null);
  const projectsRef = useRef<HTMLSpanElement>(null);
  const companyRef = useRef<HTMLSpanElement>(null);
  const testimonialsRef = useRef<HTMLSpanElement>(null);
  const { getEnvironmentProps } = autocomplete;
  const apps = useMemo(() => {
    return autocompleteState.collections[0]?.items.filter(
      (i) => i.__autocomplete_indexName === ALGOLIA_INDEX_APPS
    ) as unknown as AppHit[];
  }, [autocompleteState.collections]);

  const blogs = useMemo(() => {
    return autocompleteState.collections[0]?.items.filter(
      (i) => i.__autocomplete_indexName === ALGOLIA_INDEX_BLOGS
    ) as unknown as BlogHit[];
  }, [autocompleteState.collections]);

  const projects = useMemo(() => {
    return autocompleteState.collections[0]?.items.filter(
      (i) => i.__autocomplete_indexName === ALGOLIA_INDEX_PROJECTS
    ) as unknown as ProjectHit[];
  }, [autocompleteState.collections]);

  const company = useMemo(() => {
    return autocompleteState.collections[0]?.items.filter(
      (i) => i.__autocomplete_indexName === ALGOLIA_INDEX_COMPANY
    ) as unknown as CompanyHit[];
  }, [autocompleteState.collections]);

  const testimonials = useMemo(() => {
    return autocompleteState.collections[0]?.items.filter(
      (i) => i.__autocomplete_indexName === ALGOLIA_INDEX_TESTIMONIALS
    ) as unknown as TestimonialHit[];
  }, [autocompleteState.collections]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (!formRef.current || !panelRef.current || !inputRef.current) {
      return undefined;
    }
    getEnvironmentProps({
      formElement: formRef.current,
      inputElement: inputRef.current,
      panelElement: panelRef.current,
    });
  }, [getEnvironmentProps, autocompleteState.isOpen]);

  return (
    <div className="flex h-full w-full flex-col">
      <form
        ref={formRef}
        className="mb-2 flex w-full items-center gap-2 px-6"
        {...autocomplete.getFormProps({ inputElement: inputRef.current })}
      >
        <button
          className={clsx(
            "p-card flex h-full cursor-pointer items-center rounded-xl"
          )}
          type="submit"
          title="Submit"
        >
          <label
            className={clsx(
              autocompleteState.status !== "idle" && "swap-active",
              "swap-rotate swap  items-center "
            )}
          >
            <MagnifyingGlassIcon className="swap-off mx-auto h-5 w-5" />
            <div className="loading btn-ghost swap-on btn mx-auto border-0 p-0 before:!mr-0" />
          </label>
        </button>
        <input
          className="input w-full"
          ref={inputRef}
          {...autocomplete.getInputProps({
            inputElement: inputRef.current,
          })}
          placeholder="Search for apps, blogs, projects etc"
        />
      </form>

      {autocompleteState.isOpen && (
        <>
          <span className="mx-6 flex flex-wrap gap-4 py-2 text-xs">
            <label>
              {autocompleteState.collections[0]?.items.length} items
            </label>
            <ScrollIntoView data={testimonials} ref={testimonialsRef}>
              Testimonials
            </ScrollIntoView>
            <ScrollIntoView data={company} ref={companyRef}>
              Company
            </ScrollIntoView>
            <ScrollIntoView data={apps} ref={appsRef}>
              Apps
            </ScrollIntoView>
            <ScrollIntoView data={projects} ref={projectsRef}>
              Projects
            </ScrollIntoView>
            <ScrollIntoView data={blogs} ref={blogsRef}>
              Blogs
            </ScrollIntoView>
          </span>
          <div className="scrollbar-style ml-2 flex-1 flex-col overflow-y-auto">
            <div className="mr-2">
              <span ref={testimonialsRef}>
                <SearchTestimonials data={testimonials} />
              </span>
              <span ref={companyRef}>
                <SearchCompany data={company} />
              </span>
              <span ref={appsRef}>
                <SearchApps data={apps} />
              </span>
              <span ref={projectsRef}>
                <SearchProjects data={projects} />
              </span>
              <span ref={blogsRef}>
                <SearchBlogs data={blogs} />
              </span>
            </div>
          </div>
        </>
      )}
      {!autocompleteState.isOpen && autocompleteState.query.length <= 0 && (
        <div className="flex h-full flex-col items-center justify-center gap-1">
          <FireIcon className="h-8 w-8" />
          Results will show here
        </div>
      )}
      {autocompleteState.status === "idle" &&
        !autocompleteState.isOpen &&
        autocompleteState.query.length > 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-1">
            <ArchiveBoxXMarkIcon className="h-8 w-8" />
            No results for &rdquo;{autocompleteState.query}&rdquo;
          </div>
        )}
    </div>
  );
}
