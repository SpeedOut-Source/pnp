import { type Hit } from "@algolia/client-search";
import { type App, type Blog } from "../utils/interfaces";

type WithAutocompleteAnalytics<THit> = THit & {
  __autocomplete_indexName: string;
  __autocomplete_queryID: string;
};

export type BlogHit = WithAutocompleteAnalytics<Hit<Blog>>;
export type AppHit = WithAutocompleteAnalytics<Hit<App>>;

export type AllHit = BlogHit | AppHit;
