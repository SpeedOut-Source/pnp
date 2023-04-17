import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { type Configs } from "~/app_function/home/home_server";
import { DEFAULT_BASE_URL } from "~/app_function/utils/constants";

interface SEOProps {
  title: string;
  description: string;
  configs: Configs;
  imgUrl?: string;
}

function SEO({ imgUrl: img, title, description, configs }: SEOProps) {
  const router = useRouter();
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? DEFAULT_BASE_URL};`;
  description = description.slice(0, 160);
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={process.env.NEXT_PUBLIC_BASE_URL}
      openGraph={{
        url: `${baseUrl}${router.asPath}`,
        title,
        description,
        images: img
          ? [
              {
                url: img,
                alt: `${description} | ${title}`,
              },
            ]
          : undefined,
        site_name: title,
      }}
      twitter={{
        handle: configs.twitterHandle,
        site: configs.twitterHandle,
        cardType: "summary_large_image",
      }}
    />
  );
}

export default SEO;
