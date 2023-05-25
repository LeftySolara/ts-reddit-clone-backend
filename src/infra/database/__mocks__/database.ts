import { PrismaClient } from "@prisma/client";
import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";

const database = mockDeep<PrismaClient>();

beforeEach(() => {
  mockReset(database);
});

export { database };
