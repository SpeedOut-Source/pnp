import { generateMetadataSEO } from "~/app_function/seo/seo";
import { env } from "~/env.mjs";

export const generateMetadata = async () => {
  return generateMetadataSEO({
    description: `404 | This page is not found | ${env.NEXT_PUBLIC_PERSON_NAME}`,
    title: `404 | This page is not found | ${env.NEXT_PUBLIC_PERSON_NAME}`,
  });
};

export default function Custom404() {
  return (
    <>
      <main className="errorSplash container mx-auto">
        <div>
          404 <span>|</span> This page is not found
        </div>
      </main>
    </>
  );
}
