import dynamic from "next/dynamic";
import { env } from "../env.mjs";
const SEO = dynamic(() => import("~/components/seo"));

export default function Custom404() {
  return (
    <>
      <SEO
        description={`404 | ${env.NEXT_PUBLIC_PERSON_NAME}`}
        title={`404 | ${env.NEXT_PUBLIC_PERSON_NAME}`}
      />

      <main className="errorSplash container mx-auto">
        <div>
          404 <span>|</span> This page is not found
        </div>
      </main>
    </>
  );
}
