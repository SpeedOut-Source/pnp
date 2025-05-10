"use client";

import dynamic from "next/dynamic";
import { getPrefixRepo } from "~/app_function/utils/utils";
import { useThemeStore } from "~/app_state/theme_mode";

const Image = dynamic(() => import("next/image"));

export default function GetLogoListing({
  name,
  appLogo,
}: {
  name: string;
  appLogo?: string;
}) {
  const { isLight } = useThemeStore();
  switch (name.toLowerCase()) {
    case "windows":
    case "microsoft":
    case "microsoft edge":
    case "edge add-ons":
      return (
        <Image
          src={`${getPrefixRepo()}/images/listing/microsoftstore.svg`}
          alt={name}
          height={10}
          width={135}
        />
      );
    case "chrome web store":
      return (
        <Image
          className="rounded-md"
          src={`${getPrefixRepo()}/images/listing/chrome-web-store.png`}
          alt={name}
          height={10}
          width={160}
        />
      );
    case "firefox add-ons":
      return (
        <Image
          className="rounded-md"
          src={`https://github.com/kazcfz/Browser-Promotional-Badges/raw/refs/heads/main/Mozilla/Firefox/Get%20The%20Add-On.svg`}
          alt={name}
          height={10}
          width={160}
        />
      );
    case "opera add-ons":
      return (
        <Image
          className="rounded-md"
          src={`https://raw.githubusercontent.com/kazcfz/Browser-Promotional-Badges/refs/heads/main/Opera/Add-ons/addons_206x58_en%402x.png`}
          alt={name}
          height={10}
          width={160}
        />
      );
    case "android":
      return (
        <Image
          src={`${getPrefixRepo()}/images/listing/playstore.svg`}
          alt={name}
          height={10}
          width={200}
        />
      );
    case "google colab":
      return (
        <Image
          src={`${getPrefixRepo()}/images/listing/open-in-colab.svg`}
          alt={name}
          height={10}
          width={200}
        />
      );
    case "github release":
      return (
        <Image
          className=""
          src={`${getPrefixRepo()}/images/listing/github-mark${isLight ? "" : "-white"
            }.svg`}
          alt={name}
          height={10}
          width={50}
        />
      );
    default:
      return (
        <Image
          src={
            appLogo ??
            `${getPrefixRepo()}/images/logos/github-profile-dark${isLight ? "-light" : ""
            }.png`
          }
          alt={name}
          height={10}
          width={50}
        />
      );
  }
}
