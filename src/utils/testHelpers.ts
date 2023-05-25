import { beforeAll } from "vitest";
import express from "express";
import loadExpress from "@infra/http/expressLoader";

const routeTestInit = (app: express.Application) => {
  beforeAll(async () => {
    await loadExpress({ app });
  });
};

export default { routeTestInit };
