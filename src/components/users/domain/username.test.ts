import { describe, expect, it } from "vitest";
import { Username } from "./username";

describe("The Username value object", () => {
  describe("when being created", () => {
    it("should return a successful result with a Username object", () => {
      const username = "example";
      const vo = Username.create(username);

      expect(vo.isSuccess).toBe(true);
      expect(vo.isFailure).toBe(false);
      expect(vo.getValue()).toBeInstanceOf(Username);
      expect(vo.getValue().value).toBe(username);
    });

    it("should return a failed result if the username is less than 3 characters", () => {
      const username = "12";
      const vo = Username.create(username);

      expect(vo.isSuccess).toBe(false);
      expect(vo.isFailure).toBe(true);
      expect(() => vo.getValue()).toThrow();
      expect(vo.error).toBeDefined();
      expect(vo.errorValue).toBeDefined();
    });

    it("should return a failed result if the username is more than 20 characters", () => {
      const username = "123456789012345678901";
      const vo = Username.create(username);

      expect(vo.isSuccess).toBe(false);
      expect(vo.isFailure).toBe(true);
      expect(() => vo.getValue()).toThrow();
      expect(vo.error).toBeDefined();
      expect(vo.errorValue).toBeDefined();
    });
  });
});
