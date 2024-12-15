import { Titillium_Web } from "next/font/google";
import { env } from "../env.mjs";
import aa from "search-insights";
import "~/styles/globals.css";

const inter = Titillium_Web({ subsets: ["latin"], weight: "400" });

aa("init", {
  appId: env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  apiKey: env.NEXT_PUBLIC_ALGOLIA_API_KEY,
  useCookie: true,
});

import "~/styles/globals.css";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("~/components/header/header"));
const Footer = dynamic(() => import("~/components/footer/footer"));
const ImportPopup = dynamic(() => import("~/components/import_popup"));
const GradientEffectTop = dynamic(
  () => import("~/components/gradient_effect/top"),
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className="scrollbar-style relative isolate">
        <GradientEffectTop />
        <div className="flex h-screen flex-col justify-between">
          <main className={inter.className}>
            <Header />
            {children}
          </main>
          <Footer />
        </div>
        <ImportPopup />
      </body>
    </html>
  );
}
