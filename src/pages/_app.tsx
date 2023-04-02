import { type AppType } from "next/dist/shared/lib/utils";
import Footer from "~/components/footer/footer";
import Header from "~/components/header/header";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className="flex h-screen flex-col justify-between">
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
};

export default MyApp;
