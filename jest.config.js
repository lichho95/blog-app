export default {
  preset: 'ts-jest',
  transform: { '^.+\\.ts?$': 'ts-jest' },
  clearMocks: true,
  collectCoverage: true,
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
