"use client";

import dynamic from "next/dynamic";
import { GoogleAnalytics } from "nextjs-google-analytics";

const ThemeProvider = dynamic(() => import("~/components/theme_provider"));
const SearchDialog = dynamic(() => import("./search/search_dialog"));
const ProgressBar = dynamic(() => import("./progress_bar"));
const CrispWithNoSSR = dynamic(() => import("../components/crisp_chat"));

export default function ImportPopup() {
  return (
    <>
      <ThemeProvider />
      <ProgressBar />
      <SearchDialog />
      <GoogleAnalytics trackPageViews={{ ignoreHashChange: true }} />
      <CrispWithNoSSR />
    </>
  );
}
