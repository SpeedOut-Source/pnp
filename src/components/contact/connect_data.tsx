import ConnectButton from "../header/connect_button";
import { type ContactItemProps } from "./contact_item";
import { env } from "../../env.mjs";

export const CONNECT_OPTIONS: ContactItemProps[] = [
  {
    icon: <ConnectButton text="Gmail" />,
    name: "Gmail",
    text: env.NEXT_PUBLIC_GMAIL,
    url: `mailto:${env.NEXT_PUBLIC_GMAIL}`,
  },
  {
    icon: <ConnectButton text="GitHub" />,
    name: "GitHub",
    text: env.NEXT_PUBLIC_GITHUB,
    copyUrl: true,
    url: `https://github.com/${env.NEXT_PUBLIC_GITHUB}`,
  },
  {
    icon: <ConnectButton text="X" />,
    name: "X",
    text: env.NEXT_PUBLIC_TWITTER_HANDLE,
    copyUrl: true,
    url: `https://x.com/${env.NEXT_PUBLIC_TWITTER_HANDLE}`,
  },
  {
    icon: <ConnectButton text="LinkedIn" />,
    name: "LinkedIn",
    text: env.NEXT_PUBLIC_LINKEDIN,
    copyUrl: true,
    url: `https://www.linkedin.com/in/${env.NEXT_PUBLIC_LINKEDIN}`,
  },
];
