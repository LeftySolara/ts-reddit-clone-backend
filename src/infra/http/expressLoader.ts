import { Application, NextFunction, Request, Response } from "express";
import bodyParser, { urlencoded } from "body-parser";
import { pinoHttp } from "pino-http";
import { appConfig } from "@utils/appConfig";
import logger from "@utils/logger";
import userRoutes from "@components/users/users.routes";
import { AppError, ErrorHandler } from "@utils/errors";

const loadExpress = async ({ app }: { app: Application }) => {
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

  /* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars */
  app.use(
    async (
      error: AppError,
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      await ErrorHandler.handleError(error, res);
    },
  );

  app.use("/users", userRoutes);
};

export default loadExpress;
