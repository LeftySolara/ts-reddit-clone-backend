module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        isolatedModules: true,
      },
    ],
  },
  collectCoverageFrom: ["src/**/*.ts", "!**/node_modules/**"],
  coverageReporters: ["html", "text", "text-summary", "cobertura"],
  testMatch: ["**/*.test.ts"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "@utils(.*)$": "<rootDir>/src/utils$1",
  },
};
