import { Html, Head, Main, NextScript } from "next/document";
import { env } from "../env.mjs";

export default function Document() {
  return (
    <Html lang="en" data-theme="dark">
      <Head>
        {/* DO NOT CHANGE BELOW COMMENT */}
        {/* ADD-META-TAGS */}
        {env.NEXT_PUBLIC_BUYMEACOFFEE_USERNAME && (
          <script
            async
            data-name="BMC-Widget"
            data-cfasync="false"
            src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
            data-id={env.NEXT_PUBLIC_BUYMEACOFFEE_USERNAME}
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
