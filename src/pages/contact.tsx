import dynamic from "next/dynamic";
import ContactSection from "~/components/contact/contact_section";
import { env } from "../env.mjs";
import Spotlight from "~/components/spotlight";
const SEO = dynamic(() => import("~/components/seo"));

const MapOn = dynamic(() => import("~/components/contact/map_on"));

export default function Contact() {
  return (
    <>
      <SEO
        description={`Contact | ${env.NEXT_PUBLIC_PERSON_NAME}`}
        title={`Contact | ${env.NEXT_PUBLIC_PERSON_NAME}`}
      />
      <Spotlight />
      <ContactSection />
      <MapOn />
    </>
  );
}
