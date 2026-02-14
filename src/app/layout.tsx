import { Titillium_Web } from "next/font/google";
import { env } from "../env.mjs";
import aa from "search-insights";
import "~/styles/globals.css";
import { ThemeProvider } from "next-themes";

const inter = Titillium_Web({ subsets: ["latin"], weight: "400" });

aa("init", {
  appId: env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  apiKey: env.NEXT_PUBLIC_ALGOLIA_API_KEY,
  useCookie: true,
});

import "~/styles/globals.css";
import dynamic from "next/dynamic";
import React from "react";

const Header = dynamic(() => import("~/components/header/header"));
const Footer = dynamic(() => import("~/components/footer/footer"));
const ImportPopup = dynamic(() => import("~/components/import_popup"));
const GradientEffectTop = dynamic(
  () => import("~/components/gradient_effect/top"),
);
const DiscountBanner = dynamic(
  () => import("~/components/header/discount_banner"),
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className="scroll-smooth"
      lang="en"
      data-scroll-behavior="smooth"
      data-theme="dark"
      suppressHydrationWarning
    >
      <body className="scrollbar-style relative isolate">
        <ThemeProvider
          enableSystem={false}
          themes={["dark", "winter"]}
          defaultTheme={"dark"}
        >
          <DiscountBanner />
          <GradientEffectTop />
          <div className="flex h-screen flex-col justify-between">
            <main className={inter.className}>
              <Header />
              {children}
            </main>
            <Footer />
          </div>
          <ImportPopup />
        </ThemeProvider>
      </body>
    </html>
  );
}
