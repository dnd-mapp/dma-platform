import type { Config } from 'jest';

module.exports = {
    clearMocks: true,
    collectCoverageFrom: ['src/app/**/*.ts'],
    coverageDirectory: '../../reports/apps/auth-server/coverage',
    coverageReporters: [['html', { subdir: '.' }], 'text-summary'],
    displayName: 'auth-server',
    preset: '../../jest.preset.js',
    moduleFileExtensions: ['ts', 'js', 'html'],
    moduleNameMapper: {},
    rootDir: __dirname,
    setupFilesAfterEnv: ['<rootDir>/test/test-setup.ts'],
    testEnvironment: 'node',
    testMatch: ['<rootDir>/**/*.spec.ts'],
    transform: {
        '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
    },
} satisfies Config;
