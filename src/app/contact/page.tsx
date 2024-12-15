import dynamic from "next/dynamic";
import ContactSection from "~/components/contact/contact_section";
import { env } from "~/env.mjs";
import Spotlight from "~/components/spotlight";
import { generateMetadataSEO } from "~/app_function/seo/seo";

const MapOn = dynamic(() => import("~/components/contact/map_on"));

export const generateMetadata = async () => {
  return generateMetadataSEO({
    description: `Contact | ${env.NEXT_PUBLIC_PERSON_NAME}`,
    title: `Contact | ${env.NEXT_PUBLIC_PERSON_NAME}`,
  });
};

export default function Contact() {
  return (
    <>
      <Spotlight />
      <ContactSection />
      <MapOn />
    </>
  );
}
