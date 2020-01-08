module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  verbose: true,
  globalSetup: '<rootDir>/node_modules/@databases/pg-test/jest/globalSetup',
  globalTeardown: '<rootDir>/node_modules/@databases/pg-test/jest/globalTeardown',
};
