"use client";

import { useThemeStore } from "~/app_state/theme_mode";
import { ProgressProvider } from "@bprogress/next/app";

const ProgressBar = () => {
  const { isLight } = useThemeStore();

  return (
    <>
      <style>
        {`
          #bprogress .bar {
            background: ${isLight ? "#696969" : "#f5f5f5"} !important;
          }
        `}
      </style>
      <ProgressProvider
        height={"3px"}
        color={isLight ? "#696969" : "#f5f5f5"}
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default ProgressBar;
