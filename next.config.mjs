/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");
import { env } from "./src/env.mjs";
const PREFIX_REPO =
  process.env.NODE_ENV === "production" ? env.NEXT_PUBLIC_PREFIX_REPO : undefined;

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: [
      "avatars.githubusercontent.com",
      "user-images.githubusercontent.com",
      "camo.githubusercontent.com",
    ],
  },

  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en",
  // },
  assetPrefix: PREFIX_REPO,
  basePath: PREFIX_REPO,
};

export default config;
