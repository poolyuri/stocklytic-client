module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@env/(.*)$': '<rootDir>/src/environments/$1',
    '^@core/(.*)$': '<rootDir>/src/app/core/$1',
    '^@core$': '<rootDir>/src/app/core',
    '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
    '^@shared$': '<rootDir>/src/app/shared',
    '^@features/(.*)$': '<rootDir>/src/app/features/$1',
  },
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
};