/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import pino from "pino";
import { env } from "../../env.mjs";

// create pino logger
const log = pino({
  enabled: env.NEXT_PUBLIC_LOG_ENABLE,
  level: "trace",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

export default log;
