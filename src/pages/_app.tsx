import { type AppType } from "next/dist/shared/lib/utils";
import dynamic from "next/dynamic";
import Footer from "~/components/footer/footer";
import Header from "~/components/header/header";
const NextNProgress = dynamic(() => import("nextjs-progressbar"));

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <NextNProgress
        height={3}
        color="black"
        options={{ showSpinner: false }}
      />
      <div className="flex h-screen flex-col justify-between">
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MyApp;
