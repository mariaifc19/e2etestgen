// eslint-disable-next-line no-undef
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globals: {
      'ts-jest': {
        isolatedModules: true, 
      },
    },
    testMatch: ['<rootDir>/tests/**/*.spec.ts'],
  };
  