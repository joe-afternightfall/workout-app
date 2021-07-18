// jest.config.ts
import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.ts',
    '**/*.tsx'
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/coverage/',
    '<rootDir>/cypress/',
    '<rootDir>/src/configs',
    '<rootDir>/src/App.tsx',
    '<rootDir>/src/index.tsx',
    '<rootDir>/node_modules/',
    '<rootDir>/src/react-app-env.d.ts'
  ],
  globals: {
    "globalSetup": "jest-chance"
  },
  setupFilesAfterEnv: [
    "jest-extended",
    "<rootDir>/src/configs/test-utils/setup-tests.ts"
  ],
  moduleFileExtensions: ['ts', 'tsx', 'json'],
  rootDir: '.',
  testEnvironment: 'jsdom',
  testMatch: [
    '**/*.test.tsx',
    '**/*.test.ts'
  ],
  transform: {
    '\\.ts$': 'ts-jest',
    '\\.tsx$': 'ts-jest',
    '^.+\\.svg$': 'jest-svg-transformer'
  },
  verbose: true,
};

export default config;
