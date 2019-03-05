module.exports = {
  verbose: true,
  roots: ["test"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "\\.spec\\.ts",
  setupFilesAfterEnv: ["<rootDir>/test/setupTests.ts"],
  resetModules: false,
  testPathIgnorePatterns: ["dist/"],
  testEnvironment: "node",
  restoreMocks: false,
  moduleFileExtensions: ["js", "ts", "tsx", "jsx", "json", "node"],
  collectCoverage: true,
  preset: "ts-jest"
}
