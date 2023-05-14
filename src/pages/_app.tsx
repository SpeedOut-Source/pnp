import { type AppType } from "next/dist/shared/lib/utils";
import dynamic from "next/dynamic";
import { Titillium_Web } from "next/font/google";
import { DEFAULT_IS_LIGHT, useThemeStore } from "~/app_state/theme_mode";
import { useEffect, useState } from "react";
import aa from "search-insights";
import "~/styles/globals.css";

const NextNProgress = dynamic(() => import("nextjs-progressbar"));
const Header = dynamic(() => import("~/components/header/header"));
const Footer = dynamic(() => import("~/components/footer/footer"));
const ThemeProvider = dynamic(() => import("~/components/theme_provider"));
const ImportPopup = dynamic(() => import("~/components/import_popup"));

const inter = Titillium_Web({ subsets: ["latin"], weight: "400" });

aa("init", {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  apiKey: process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!,
  useCookie: true
});

const MyApp: AppType = ({ Component, pageProps }) => {
  const utm = useThemeStore();
  const [isLight, setIsLight] = useState(DEFAULT_IS_LIGHT);

  useEffect(() => {
    setIsLight(utm.themeName === "winter");
  }, [utm]);

  return (
    <>
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
      <ImportPopup />
    </>
  );
};

export default MyApp;
