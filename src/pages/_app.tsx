import { type AppType } from "next/dist/shared/lib/utils";
import dynamic from "next/dynamic";
import "~/styles/globals.css";

const NextNProgress = dynamic(() => import("nextjs-progressbar"));
const Header = dynamic(() => import("~/components/header/header"));
const Footer = dynamic(() => import("~/components/footer/footer"));

import { Titillium_Web } from "next/font/google";
import ThemeProvider from "~/components/theme_provider";
import { useThemeStore } from "~/app_state/theme_mode";
import { useEffect, useState } from "react";
const inter = Titillium_Web({ subsets: ["latin"], weight: "400" });

const MyApp: AppType = ({ Component, pageProps }) => {
  const utm = useThemeStore();
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    setIsLight(utm.themeName === "winter");
  }, [utm]);

  return (
    <ThemeProvider>
      <NextNProgress
        height={3}
        color={isLight ? "#696969" : "#f5f5f5"}
        options={{ showSpinner: false }}
      />
      <div className="flex h-screen flex-col justify-between">
        <main className={inter.className}>
          <Header />
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default MyApp;
