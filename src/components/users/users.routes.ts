import express, { Request, Response } from "express";
import { AppError, commonErrorNames, commonHttpErrors } from "@utils/errors";

const router: express.Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const { emailAddress, username } = req.body;

  if (!emailAddress || !username) {
    throw new AppError(
      commonErrorNames.badRequest,
      commonHttpErrors.badRequest,
      "Must provide email and username",
      true,
    );
  }

  return res.status(200).json({ user: { emailAddress, username } });
});

export default router;
