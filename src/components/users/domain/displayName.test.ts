import { describe, it, expect } from "vitest";
import { DisplayName } from "./displayName";

describe("The DisplayName value object", () => {
  describe("when being created", () => {
    it("should return a successful result with a DisplayName object", () => {
      const displayName = "example";
      const vo = DisplayName.create(displayName);

      expect(vo.isSuccess).toBe(true);
      expect(vo.isFailure).toBe(false);
      expect(vo.getValue()).toBeInstanceOf(DisplayName);
      expect(vo.getValue().value).toBe(displayName);
    });

    it("should return a failed result if the given string is shorter than 3 characters", () => {
      const displayName = "12";
      const vo = DisplayName.create(displayName);

      expect(vo.isSuccess).toBe(false);
      expect(vo.isFailure).toBe(true);
      expect(() => vo.getValue()).toThrow();
      expect(vo.error).toBeDefined();
      expect(vo.errorValue).toBeDefined();
    });

    it("should return a failed result if the given string is longer than 48 characters", () => {
      const displayName = (() => {
        let result = "";
        const characters = "abcde";
        let counter = 0;
        while (counter <= 48) {
          result += characters.charAt(
            Math.floor(Math.random() * characters.length),
          );
          counter += 1;
        }
        return result;
      })();

      const vo = DisplayName.create(displayName);

      expect(vo.isSuccess).toBe(false);
      expect(vo.isFailure).toBe(true);
      expect(() => vo.getValue()).toThrow();
      expect(vo.error).toBeDefined();
      expect(vo.errorValue).toBeDefined();
    });
  });
});
