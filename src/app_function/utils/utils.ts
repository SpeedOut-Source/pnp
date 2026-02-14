import { type Project } from "./interfaces";
import tc from "thousands-counter";
import { env } from "../../env.mjs";
import urlJoin from "url-join";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPro(object: any): object is Project {
  return "whatText" in object;
}

export function toTitleCase(str: string): string {
  return str.replace(
    /\b\w+/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
}

export function showCountHuman(count: number): number {
  return tc(count, { digits: 2, uppercase: false });
}

export function sliceText(text: string, maxLength = 160): string {
  if (text.length > maxLength) {
    let slicedText = text.slice(0, maxLength);
    const lastChar = slicedText.charAt(slicedText.length - 1);
    if (lastChar !== " ") {
      slicedText = slicedText.substring(0, slicedText.lastIndexOf(" "));
      if (/[^\w\s]/.test(lastChar)) {
        slicedText = slicedText.substring(0, slicedText.length - 1);
      }
    }
    return slicedText;
  }
  return text;
}

export function getDataUrl(repoPath: string) {
  return urlJoin(
    "https://github.com",
    repoPath,
    `/blob/${env.NEXT_PUBLIC_REPO_DATA_BRANCH}`,
  );
}

export function getUserNRepo(repoPath: string): {
  userName: string;
  repo: string;
} {
  const sp = repoPath.split("/");
  return {
    userName: sp[1] ?? "",
    repo: sp[2] ?? "",
  };
}

export function getPrefixRepo() {
  return process.env.NODE_ENV === "production" &&
    !env.NEXT_PUBLIC_LOCALHOST_TEST
    ? env.NEXT_PUBLIC_PREFIX_REPO
    : "";
}

export function toViewTransitionName(
  str: string,
  prefix?: string,
  isSearch?: boolean,
): string {
  const cleanStr = str
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  let finalStr = prefix ? `${prefix}-${cleanStr}` : cleanStr;
  if (isSearch) {
    finalStr += "-search";
  }
  return finalStr;
}
