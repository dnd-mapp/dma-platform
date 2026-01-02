import type { Config } from 'jest';

const config: Config = {
    collectCoverageFrom: ['<rootDir>/src/app/**/*.ts'],
    coverageDirectory: '../../reports/apps/auth-server',
    coveragePathIgnorePatterns: ['<rootDir>/src/**/index.ts'],
    displayName: 'auth-server',
    moduleNameMapper: {},
    moduleFileExtensions: ['ts', 'js', 'html'],
    preset: '../../jest.preset.js',
    rootDir: __dirname,
    transform: {
        '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
    },
};

module.exports = config;
