/* eslint-disable @typescript-eslint/no-explicit-any */
import { Highlight, type HighlightHitParams } from "./Highlight";
import { JSX } from "react";

export type HighlightHitParamsWithData<THit> = HighlightHitParams<THit> & {
  data: string;
};

export function HighlightSwitch<THit extends { _highlightResult?: any }>({
  hit,
  attribute,
  tagName = "mark",
  data,
}: HighlightHitParamsWithData<THit>): JSX.Element {
  if (!("__autocomplete_indexName" in hit)) {
    return <span>{data}</span>;
  }

  return <Highlight attribute={attribute} tagName={tagName} hit={hit} />;
}
