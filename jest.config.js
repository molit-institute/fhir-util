module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!jest.config.js",
    "!.eslintrc.js",
    "!**/coverage/**",
    "!**/out/**",
    "!**/dist/**",
    "!**/jsdoc/**"
  ]
};
