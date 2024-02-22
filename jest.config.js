/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  modulePathIgnorePatterns: ['e2e-test'],
  testTimeout: 20*1000
};
