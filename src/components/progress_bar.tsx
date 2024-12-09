"use client";

import { useThemeStore } from "~/app_state/theme_mode";
import { AppProgressBar } from "next-nprogress-bar";

const ProgressBar = () => {
  const { isLight } = useThemeStore();

  return (
    <>
      <style>
        {`
          #nprogress .bar {
            background: ${isLight ? "#696969" : "#f5f5f5"} !important;
          }
        `}
      </style>
      <AppProgressBar
        height={"3px"}
        color={isLight ? "#696969" : "#f5f5f5"}
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default ProgressBar;
