"use client";

import dynamic from "next/dynamic";
import { GoogleAnalytics } from "nextjs-google-analytics";
import ThemeProvider from "./theme_provider";

const SearchDialog = dynamic(() => import("./search/search_dialog"));
const ProgressBar = dynamic(() => import("./progress_bar"));
const CrispWithNoSSR = dynamic(() => import("../components/crisp_chat"));

export default function ImportPopup() {
  return (
    <>
      <ProgressBar />
      <SearchDialog />
      <GoogleAnalytics trackPageViews={{ ignoreHashChange: true }} />
      <CrispWithNoSSR />
      <ThemeProvider />
    </>
  );
}
