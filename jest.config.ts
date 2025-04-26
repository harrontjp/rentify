import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm", // 👈 Use the ESM preset
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }], // 👈 Tell ts-jest to compile TypeScript with ESM
  },
  moduleNameMapper: {
    // 👇 Jest expects CommonJS, but jose is ESM-only, so we mock it
    "^jose/(.*)$": "<rootDir>/__mocks__/joseMock.ts",
    "^jose$": "<rootDir>/__mocks__/joseMock.ts",
    "^@/(.*)$": "<rootDir>/src/$1", // 👈 THIS LINE maps @/ to src/
    "\\.module\\.css$": "identity-obj-proxy",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"], // 👈 Tell Jest these are ESM
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
