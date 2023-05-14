import ConnectButton from "../header/connect_button";
import { type ContactItemProps } from "./contact_item";

export const CONNECT_OPTIONS: ContactItemProps[] = [
  {
    icon: <ConnectButton text="Gmail" />,
    name: "Gmail",
    text: "biplobsd11@gmail.com",
    url: "mailto:biplobsd11@gmail.com"
  },
  {
    icon: <ConnectButton text="GitHub" />,
    name: "GitHub",
    text: "biplobsd",
    copyUrl: true,
    url: "https://github.com/biplobsd"
  },

  {
    icon: <ConnectButton text="Twitter" />,
    name: "Twitter",
    text: "biplobsd11",
    copyUrl: true,
    url: "https://twitter.com/biplobsd11"
  },
  {
    icon: <ConnectButton text="LinkedIn" />,
    name: "LinkedIn",
    text: "biplob-sutradhar",
    copyUrl: true,
    url: "https://www.linkedin.com/in/biplob-sutradhar/"
  }
];
