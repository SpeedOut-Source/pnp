import { type AppType } from "next/dist/shared/lib/utils";
import Footer from "~/components/footer/footer";
import Header from "~/components/header/header";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className="flex h-screen flex-col justify-between">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </main>
  );
};

export default MyApp;
