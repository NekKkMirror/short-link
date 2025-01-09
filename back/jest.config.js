module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['<rootDir>/jest.setup.ts'],
  testTimeout: 30000,
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/__tests__/integration/common/',
    '<rootDir>/src/__tests__/integration/shortened-link/constants/',
    '<rootDir>/src/__tests__/integration/analytics/constants/',
  ],
};
