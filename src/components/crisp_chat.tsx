"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";
import { env } from "~/env.mjs";

const CrispChat = () => {
  useEffect(() => {
    if (env.NEXT_PUBLIC_CRISP_WEBSITE_ID === undefined) return;
    Crisp.configure(env.NEXT_PUBLIC_CRISP_WEBSITE_ID);
  });

  return null;
};

export default CrispChat;
