/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import pino from "pino";

// create pino logger
const log = pino({
  enabled: process.env.NEXT_PUBLIC_LOG_ENABLE === "true",
  level: "trace",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true
    }
  }
});

export default log;
