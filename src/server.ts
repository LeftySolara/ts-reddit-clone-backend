import express, { Request, Response, NextFunction } from "express";
import { appConfig } from "./appConfig";
import logger from "./logger";

const app = express();

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  logger.info("Received request...");
  return res.json({ message: "Hello World!" });
});

app.listen(appConfig.express.serverPort, () => {
  logger.info(
    { port: appConfig.express.serverPort },
    "Listening on port %s...",
    appConfig.express.serverPort,
  );
});
