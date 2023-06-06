/* eslint-disable class-methods-use-this */
import { HttpCode, commonErrorNames, commonHttpErrors } from "@utils/errors";
import logger from "@utils/logger";
import { Request, Response } from "express";

abstract class BaseController {
  protected req: Request | undefined;

  protected res: Response | undefined;

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  protected abstract executeImpl(): Promise<any>;

  public async execute(req: Request, res: Response): Promise<void> {
    this.req = req;
    this.res = res;

    await this.executeImpl();
  }

  public static jsonResponse(res: Response, code: HttpCode, message: string) {
    return res.status(code).json({ message });
  }

  public ok<T>(res: Response, dto?: T) {
    if (dto) {
      return res.status(commonHttpErrors.ok).json(dto);
    }

    return res.sendStatus(commonHttpErrors.ok);
  }

  public badRequest(message?: string) {
    return BaseController.jsonResponse(
      this.res as Response,
      commonHttpErrors.badRequest,
      message ?? commonErrorNames.badRequest,
    );
  }

  public notFound(message?: string) {
    return BaseController.jsonResponse(
      this.res as Response,
      commonHttpErrors.notFound,
      message ?? commonErrorNames.notFound,
    );
  }

  public fail(error: Error | string) {
    logger.error(error);
    return this.res
      ?.status(commonHttpErrors.internalServerError)
      .json({ message: error.toString() });
  }
}

export { BaseController };
