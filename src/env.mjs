import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    NEXT_PUBLIC_REPO_PATH: z.string(),
    ALGOLIA_SEARCH_ADMIN_KEY: z.string(),
    DATA_PATH: z.string().default("../pnp-data/"),
    PREFIX_REPO: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
    NEXT_PUBLIC_PERSON_NAME: z.string().min(1),
    NEXT_PUBLIC_BASE_URL: z.string().min(1),
    NEXT_PUBLIC_LOG_ENABLE: z
      .string()
      .refine((s) => s === "true" || s === "false")
      .transform((s) => s === "true"),
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string(),
    NEXT_PUBLIC_GOOGLE_MAP_LAT: z
      .string()
      .transform((s) => parseInt(s, 10))
      .pipe(z.number()),
    NEXT_PUBLIC_GOOGLE_MAP_LNG: z
      .string()
      .transform((s) => parseInt(s, 10))
      .pipe(z.number()),
    NEXT_PUBLIC_GOOGLE_MAP_LOCATION_NAME: z.string(),
    NEXT_PUBLIC_REPO_ID: z.string(),
    NEXT_PUBLIC_CATEGORY: z.string(),
    NEXT_PUBLIC_CATEGORY_ID: z.string(),
    NEXT_PUBLIC_USER_CONTENT_BASE_URL: z.string(),
    NEXT_PUBLIC_REPO_PATH: z.string(),
    NEXT_PUBLIC_RESUME_PATH: z.string(),
    NEXT_PUBLIC_USER_CONTENT_BASE_IMG_PATH: z.string(),
    NEXT_PUBLIC_FACEBOOK_APPID: z.string(),
    NEXT_PUBLIC_BUYMEACOFFEE_USERNAME: z.string().optional(),
    NEXT_PUBLIC_GMAIL: z.string(),
    NEXT_PUBLIC_GITHUB: z.string(),
    NEXT_PUBLIC_TWITTER_HANDLE: z.string(),
    NEXT_PUBLIC_LINKEDIN: z.string(),
    NEXT_PUBLIC_ALGOLIA_APP_ID: z.string(),
    NEXT_PUBLIC_ALGOLIA_API_KEY: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
    NEXT_PUBLIC_PERSON_NAME: process.env.NEXT_PUBLIC_PERSON_NAME,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_LOG_ENABLE: process.env.NEXT_PUBLIC_LOG_ENABLE,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_GOOGLE_MAP_LAT: process.env.NEXT_PUBLIC_GOOGLE_MAP_LAT,
    NEXT_PUBLIC_GOOGLE_MAP_LNG: process.env.NEXT_PUBLIC_GOOGLE_MAP_LNG,
    NEXT_PUBLIC_GOOGLE_MAP_LOCATION_NAME:
      process.env.NEXT_PUBLIC_GOOGLE_MAP_LOCATION_NAME,
    NEXT_PUBLIC_REPO_ID: process.env.NEXT_PUBLIC_REPO_ID,
    NEXT_PUBLIC_CATEGORY: process.env.NEXT_PUBLIC_CATEGORY,
    NEXT_PUBLIC_CATEGORY_ID: process.env.NEXT_PUBLIC_CATEGORY_ID,
    NEXT_PUBLIC_USER_CONTENT_BASE_URL:
      process.env.NEXT_PUBLIC_USER_CONTENT_BASE_URL,
    NEXT_PUBLIC_REPO_PATH: process.env.NEXT_PUBLIC_REPO_PATH,
    NEXT_PUBLIC_RESUME_PATH: process.env.NEXT_PUBLIC_RESUME_PATH,
    NEXT_PUBLIC_USER_CONTENT_BASE_IMG_PATH:
      process.env.NEXT_PUBLIC_USER_CONTENT_BASE_IMG_PATH,
    NEXT_PUBLIC_FACEBOOK_APPID: process.env.NEXT_PUBLIC_FACEBOOK_APPID,
    NEXT_PUBLIC_BUYMEACOFFEE_USERNAME:
      process.env.NEXT_PUBLIC_BUYMEACOFFEE_USERNAME,
    NEXT_PUBLIC_GMAIL: process.env.NEXT_PUBLIC_GMAIL,
    NEXT_PUBLIC_GITHUB: process.env.NEXT_PUBLIC_GITHUB,
    NEXT_PUBLIC_TWITTER_HANDLE: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
    NEXT_PUBLIC_LINKEDIN: process.env.NEXT_PUBLIC_LINKEDIN,
    ALGOLIA_SEARCH_ADMIN_KEY: process.env.ALGOLIA_SEARCH_ADMIN_KEY,
    NEXT_PUBLIC_ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    NEXT_PUBLIC_ALGOLIA_API_KEY: process.env.NEXT_PUBLIC_ALGOLIA_API_KEY,
    DATA_PATH: process.env.DATA_PATH,
    PREFIX_REPO: process.env.PREFIX_REPO,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
