module.exports = {
  verbose: true,
  roots: ["test"],
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  setupFilesAfterEnv: ["<rootDir>/test/setupTests.js"],
  resetModules: false,
  testPathIgnorePatterns: ["dist/"],
  testEnvironment: "node",
  restoreMocks: false,
  moduleFileExtensions: ["js"],
  collectCoverage: true
}
