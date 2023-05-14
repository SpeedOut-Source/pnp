import keyword_extractor from "keyword-extractor";
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
               description: rawDesc,
               configs,
               itemView,
               ogType = "website"
             }: SEOProps) {
  const router = useRouter();
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? DEFAULT_BASE_URL}`;
  const description = sliceText(rawDesc);
  const pageUrl = `${baseUrl}${router.asPath}`;
  const keywords = keyword_extractor
    .extract((itemView ? itemView.fileName : "") + " " + rawDesc, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true
    })
    .filter((x) => !/[^\w\s]/.test(x));
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={pageUrl}
      additionalLinkTags={[
        {
          rel: "icon",
          href: `${baseUrl}/favicon.ico`
        }
      ]}
      openGraph={{
        url: pageUrl,
        title,
        description,
        images: img
          ? [
            {
              url: img,
              alt: `${description}`
            }
          ]
          : undefined,
        site_name: configs.appName,
        type: ogType,
        article: itemView && {
          publishedTime: new Date(itemView.date).toISOString(),
          authors: [baseUrl],
          tags: keywords
        }
      }}
      facebook={{ appId: "732825215185793" }}
      twitter={{
        handle: configs.twitterHandle,
        site: configs.twitterHandle,
        cardType: "summary_large_image"
      }}
    />
  );
}

export default SEO;
