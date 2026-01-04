import type { Config } from 'jest';

const config: Config = {
    collectCoverageFrom: ['<rootDir>/src/app/**/*.ts', '!<rootDir>/**/index.ts'],
    coverageDirectory: '../../reports/apps/auth-server',
    displayName: 'auth-server',
    moduleNameMapper: {},
    moduleFileExtensions: ['ts', 'js', 'html'],
    setupFilesAfterEnv: ['<rootDir>/test/test-setup.ts'],
    preset: '../../jest.preset.js',
    rootDir: __dirname,
    transform: {
        '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
    },
};

module.exports = config;
