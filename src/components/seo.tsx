import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { type Configs } from "~/app_function/home/home_server";
import { DEFAULT_BASE_URL } from "~/app_function/utils/constants";
import { type CardItem } from "~/app_function/utils/interfaces";
import { sliceText } from "~/app_function/utils/utils";

interface SEOProps {
  title: string;
  description: string;
  configs: Configs;
  imgUrl?: string;
  ogType?: string;
  itemView?: CardItem;
}

function SEO({
  imgUrl: img,
  title,
  description,
  configs,
  itemView,
  ogType = "website",
}: SEOProps) {
  const router = useRouter();
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? DEFAULT_BASE_URL};`;
  description = sliceText(description);
  return (
    <NextSeo
      title={title}
      description={description}
      additionalLinkTags={[
        {
          rel: "icon",
          href: `${baseUrl}/favicon.ico`,
        },
      ]}
      openGraph={{
        url: `${baseUrl}${router.asPath}`,
        title,
        description,
        images: img
          ? [
              {
                url: img,
                alt: `${description}`,
              },
            ]
          : undefined,
        site_name: configs.appName,
        type: ogType,
        article: itemView && {
          publishedTime: new Date(itemView.date).toISOString(),
          authors: [baseUrl],
          tags: Array.from(
            new Set(
              [...itemView.fileName.split("-"), ...description.split(" ")]
                .map((x) => x.trim().toLowerCase().split(".").join(""))
                .filter((x) => x !== "|")
            )
          ),
        },
      }}
      facebook={{ appId: "732825215185793" }}
      twitter={{
        handle: configs.twitterHandle,
        site: configs.twitterHandle,
        cardType: "summary_large_image",
      }}
    />
  );
}

export default SEO;
