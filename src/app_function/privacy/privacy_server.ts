import { type PrivacyProps } from "~/pages/privacy";
import { getConfigs, getData } from "../utils/utils-server";

export async function PrivacyServer() {
  const configs = await getConfigs();
  const data = (await getData("privacy-policy.md")).toString();

  const privacyProps: PrivacyProps = {
    data,
    configs,
  };

  return {
    props: privacyProps,
  };
}
