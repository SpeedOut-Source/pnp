/* eslint-disable @typescript-eslint/no-non-null-assertion */
import ConnectButton from "../header/connect_button";
import { type ContactItemProps } from "./contact_item";

export const CONNECT_OPTIONS: ContactItemProps[] = [
  {
    icon: <ConnectButton text="Gmail" />,
    name: "Gmail",
    text: process.env.NEXT_PUBLIC_GMAIL!,
    url: `mailto:${process.env.NEXT_PUBLIC_GMAIL!}`,
  },
  {
    icon: <ConnectButton text="GitHub" />,
    name: "GitHub",
    text: process.env.NEXT_PUBLIC_GITHUB!,
    copyUrl: true,
    url: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB!}`,
  },
  {
    icon: <ConnectButton text="Twitter" />,
    name: "Twitter",
    text: process.env.NEXT_PUBLIC_TWITTER!,
    copyUrl: true,
    url: `https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER!}`,
  },
  {
    icon: <ConnectButton text="LinkedIn" />,
    name: "LinkedIn",
    text: process.env.NEXT_PUBLIC_LINKEDIN!,
    copyUrl: true,
    url: `https://www.linkedin.com/in/${process.env.NEXT_PUBLIC_LINKEDIN!}`,
  },
];
