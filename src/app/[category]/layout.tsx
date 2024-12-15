import { CardSchema } from "~/app_function/utils/interfaces";
import { type generateStaticParamsType } from "./page/[no]/page";
import { toTitleCase } from "~/app_function/utils/utils";
import { env } from "~/env.mjs";
import { generateMetadataSEO } from "~/app_function/seo/seo";

export async function generateMetadata({ params }: generateStaticParamsType) {
  const { category } = await params;
  const pageName = toTitleCase(category);
  const title = `${pageName} | ${env.NEXT_PUBLIC_PERSON_NAME}`;

  return generateMetadataSEO({
    description: `See all ${title}`,
    title,
  });
}

export async function generateStaticParams() {
  const categories = CardSchema.options;
  return categories.map((category) => ({
    category,
  }));
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
