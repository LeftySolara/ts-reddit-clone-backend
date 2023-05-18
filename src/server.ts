import express, { Request, Response, NextFunction } from "express";
import bodyParser, { urlencoded } from "body-parser";
import { pinoHttp } from "pino-http";
import { appConfig } from "@utils/appConfig";
import logger from "@utils/logger";

const app = express();

app.use(bodyParser.json());
app.use(urlencoded({ extended: true }));

app.use(pinoHttp({ logger }));

/* Add CORS headers to all responses. */
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    appConfig.express.corsOrigin as string,
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/", (req: Request, res: Response) => {
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
