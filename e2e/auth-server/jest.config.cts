import type { Config } from 'jest';

const config: Config = {
    collectCoverage: false,
    displayName: 'auth-server-e2e',
    globalSetup: '<rootDir>/src/support/global-setup.ts',
    globalTeardown: '<rootDir>/src/support/global-teardown.ts',
    moduleFileExtensions: ['ts', 'js', 'html'],
    preset: '../../jest.preset.js',
    rootDir: __dirname,
    setupFiles: ['<rootDir>/src/support/test-setup.ts'],
    transform: {
        '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
    },
};

module.exports = config;
