import express, { Request, Response } from "express";

const router: express.Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const { emailAddress, username } = req.body;

  return res.json({ user: { emailAddress, username } });
});

export default router;
