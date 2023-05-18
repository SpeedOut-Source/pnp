import { Html, Head, Main, NextScript } from "next/document";
import { BUYMEACOFFEE_USERNAME } from "~/app_function/utils/constants";

export default function Document() {
  return (
    <Html lang="en" data-theme="dark">
      <Head>
        <meta name="msvalidate.01" content="2B3B56800802BE35A75AE72C50119295" />
        {BUYMEACOFFEE_USERNAME && (
          <script
            async
            data-name="BMC-Widget"
            data-cfasync="false"
            src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
            data-id={BUYMEACOFFEE_USERNAME}
            data-description="Support me on Buy me a coffee!"
            data-message=""
            data-color="#5F7FFF"
            data-position="Right"
            data-x_margin="18"
            data-y_margin="18"
          ></script>
        )}
      </Head>
      <body className="scrollbar-style">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
