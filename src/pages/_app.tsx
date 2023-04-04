import { type AppType } from "next/dist/shared/lib/utils";
import dynamic from "next/dynamic";
import "~/styles/globals.css";

const NextNProgress = dynamic(() => import("nextjs-progressbar"));
const Header = dynamic(() => import("~/components/header/header"));
const Footer = dynamic(() => import("~/components/footer/footer"));

import { Titillium_Web } from "next/font/google";
const inter = Titillium_Web({ subsets: ["latin"], weight: "400" });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <NextNProgress
        height={3}
        color="black"
        options={{ showSpinner: false }}
      />
      <div className="flex h-screen flex-col justify-between">
        <main className={inter.className}>
          <Header />
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MyApp;
