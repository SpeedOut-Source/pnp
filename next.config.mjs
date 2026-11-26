/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import fs from "fs";
import path from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

await import("./src/env.mjs");
import { env } from "./src/env.mjs";
import withPWAInit from "@ducanh2912/next-pwa";

/**
 * Resolve the common ancestor of the project directory and `DATA_PATH`.
 * Required by Next.js 16.4+ Turbopack when `pnp-data` is symlinked or located
 * outside the app directory (such as in CI builds).
 */
function resolveTurbopackRoot() {
  const projectReal = fs.realpathSync(process.cwd());
  if (!fs.existsSync(env.DATA_PATH)) {
    return projectReal;
  }

  const dataReal = fs.realpathSync(env.DATA_PATH);
  let ancestor = projectReal;
  while (true) {
    const rel = path.relative(ancestor, dataReal);
    if (rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel))) {
      return ancestor;
    }
    const parent = path.dirname(ancestor);
    if (parent === ancestor) {
      return projectReal;
    }
    ancestor = parent;
  }
}

const withPWA = withPWAInit({
  dest: "public",
});


const PREFIX_REPO =
  process.env.NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_LOCALHOST_TEST !== "true"
    ? env.NEXT_PUBLIC_PREFIX_REPO
    : undefined;

/** @type {import("next").NextConfig} */
const config = {
  adapterPath: require.resolve("./scripts/adapter.cjs"),
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "user-images.githubusercontent.com" },
      { hostname: "camo.githubusercontent.com" },
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
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Fix react-pdf referencing canvas in SSR
      config.resolve.alias.canvas = false;
    }
    config.resolve.alias.encoding = false;
    return config;
  },
  turbopack: {
    root: resolveTurbopackRoot(),
    resolveAlias: {
      canvas: "./empty-module.ts",
    },
  },
};

export default withPWA(config);