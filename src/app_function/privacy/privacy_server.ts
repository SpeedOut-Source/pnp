import { getData } from "../utils/utils-server";

export async function PrivacyServer() {
  const data = (await getData("privacy-policy.md")).toString();
  return data;
}
