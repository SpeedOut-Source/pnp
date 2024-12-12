import { type Card } from "~/app_function/utils/interfaces";
import { getTagConfigs } from "~/app_function/utils/utils-server";
import { env } from "~/env.mjs";

export type generateStaticParamsType = {
  params: Promise<{ category: Card }>;
};

export async function generateStaticParams({
  params,
}: generateStaticParamsType) {
  const { category } = await params;

  return (await getTagConfigs(category)).tags.map((tag) => ({
    tag: env.NODE_ENV === "development" ? encodeURIComponent(tag) : tag,
  }));
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
