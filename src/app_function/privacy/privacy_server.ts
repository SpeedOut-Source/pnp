import { type PrivacyProps } from "~/pages/privacy";
import { getData } from "../utils/utils-server";

export async function PrivacyServer() {
  const data = (await getData("privacy-policy.md")).toString();

  const privacyProps: PrivacyProps = {
    data,
  };

  return {
    props: privacyProps,
  };
}
