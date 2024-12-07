"use client";

import { useEffect, useState } from "react";
import { DEFAULT_IS_LIGHT, useThemeStore } from "~/app_state/theme_mode";
import { AppProgressBar } from "next-nprogress-bar";

const ProgressBar = () => {
  const utm = useThemeStore();
  const [isLight, setIsLight] = useState(DEFAULT_IS_LIGHT);

  useEffect(() => {
    setIsLight(utm.themeName === "winter");
  }, [utm]);

  return (
    <AppProgressBar
      height={"3px"}
      color={isLight ? "#696969" : "#f5f5f5"}
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};

export default ProgressBar;
