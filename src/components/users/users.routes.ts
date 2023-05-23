import express, { Request, Response } from "express";
import { AppError, commonErrorNames, commonHttpErrors } from "@utils/errors";
import { database } from "@infra/database/database";

const router: express.Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const { emailAddress, username } = req.body;

  if (!emailAddress || !username) {
    throw new AppError(
      commonErrorNames.badRequest,
      commonHttpErrors.badRequest,
      "Must provide email and username",
      true,
    );
  }

  await database.user.create({
    data: {
      username,
      emailAddress,
      hashedPassword: "example",
      avatar: "http://127.0.0.1/#",
      uuid: "example",
      displayName: "example",
      karma: 0,
    },
  });

  const user = await database.user.findFirst();

  return res.status(200).json({ user });
});

export default router;
