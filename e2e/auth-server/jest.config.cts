import type { Config } from 'jest';

module.exports = {
    clearMocks: true,
    displayName: 'auth-server-e2e',
    globalSetup: '<rootDir>/src/support/global-setup.ts',
    globalTeardown: '<rootDir>/src/support/global-teardown.ts',
    moduleFileExtensions: ['ts', 'js', 'html'],
    moduleNameMapper: {},
    preset: '../../jest.preset.js',
    rootDir: __dirname,
    setupFiles: ['<rootDir>/src/support/test-setup.ts'],
    testEnvironment: 'node',
    testMatch: ['<rootDir>/**/*.spec.ts'],
    transform: {
        '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
    },
} satisfies Config;
