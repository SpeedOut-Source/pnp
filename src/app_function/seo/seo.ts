import { type Metadata } from "next";
import keyword_extractor from "keyword-extractor";
import { env } from "../../env.mjs";
import { type CardItem } from "~/app_function/utils/interfaces";
import { sliceText } from "~/app_function/utils/utils";
import { type OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types";

interface SEOProps {
  title?: string;
  description: string;
  imgUrl?: string;
  ogType?: OpenGraphType;
  itemView?: CardItem;
}

export function generateMetadataSEO({
  imgUrl: img,
  title = env.NEXT_PUBLIC_PERSON_NAME,
  description: rawDesc,
  itemView,
  ogType = "website",
}: SEOProps): Metadata {
  const description = sliceText(rawDesc);

  const keywords = keyword_extractor
    .extract((itemView ? itemView.fileName : "") + " " + rawDesc, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true,
    })
    .filter((x) => !/[^\w\s]/.test(x));

  const baseUrl = env.NEXT_PUBLIC_BASE_URL;

  const metadata: Metadata = {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: baseUrl,
    },
    icons: {
      icon: `${baseUrl}/favicon.ico`,
    },
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: env.NEXT_PUBLIC_PERSON_NAME,
      type: ogType,
      images: img
        ? [
            {
              url: img,
              alt: description,
            },
          ]
        : undefined,
      ...(itemView && ogType === "article"
        ? {
            publishedTime: new Date(itemView.date).toISOString(),
            authors: [baseUrl],
            tags: keywords,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: env.NEXT_PUBLIC_TWITTER_HANDLE,
      creator: env.NEXT_PUBLIC_TWITTER_HANDLE,
    },
    ...(env.NEXT_PUBLIC_FACEBOOK_APPID && {
      other: {
        "fb:app_id": env.NEXT_PUBLIC_FACEBOOK_APPID,
      },
    }),
  };

  return metadata;
}
