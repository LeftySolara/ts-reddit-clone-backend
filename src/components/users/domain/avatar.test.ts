import { describe, it, expect } from "vitest";
import { Avatar } from "./avatar";

describe("The Avatar value object", () => {
  describe("when being created", () => {
    it("should return a successful result with an Avatar object", () => {
      const avatar = "https://myavatar.example.com";
      const vo = Avatar.create(avatar);

      expect(vo.isSuccess).toBe(true);
      expect(vo.isFailure).toBe(false);
      expect(vo.getValue()).toBeInstanceOf(Avatar);
      expect(vo.getValue().value).toBe(avatar);
    });

    it("should return a failed result if the given string is not in URL format", () => {
      const avatar = "myavatar";
      const vo = Avatar.create(avatar);

      expect(vo.isSuccess).toBe(false);
      expect(vo.isFailure).toBe(true);
      expect(() => vo.getValue()).toThrow();
      expect(vo.error).toBeDefined();
      expect(vo.errorValue).toBeDefined();
    });
  });
});
