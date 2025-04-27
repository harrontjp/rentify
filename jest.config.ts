import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest", // 👈 Use the ESM preset
  testEnvironment: "jsdom",
  moduleNameMapper: {
    // 👇 Jest expects CommonJS, but jose is ESM-only, so we mock it
    "^jose/(.*)$": "<rootDir>/__mocks__/joseMock.ts",
    "^jose$": "<rootDir>/__mocks__/joseMock.ts",
    "^@/(.*)$": "<rootDir>/src/$1", // 👈 THIS LINE maps @/ to src/
    "\\.module\\.css$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default config;
