const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleFileExtensions: ["js", "ts", "tsx", "json"],
  // If you're using [Module Path Aliases](https://nextjs.org/docs/advanced-features/module-path-aliases),
  // you will have to add the moduleNameMapper in order for jest to resolve your absolute paths.
  // The paths have to be matching with the paths option within the compilerOptions in the tsconfig.json
  moduleNameMapper: {
    "^.+\\.(svg)$": "<rootDir>/views/__mocks__/svg.js",
    // "^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp)$/i": `<rootDir>/src/__mocks__/fileMock.js`,
    "^@/views/components/(.*)$": "<rootDir>/views/components/$1",
    "^@/pages/(.*)$": "<rootDir>/pages/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
