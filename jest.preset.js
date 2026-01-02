const nxPreset = require('@nx/jest/preset').default;

const isCI = Boolean(process.env['CI']);

/** @type {import('jest').Config} */
module.exports = {
    ...nxPreset,
    clearMocks: true,
    collectCoverage: true,
    coverageReporters: ['text-summary', 'html'],
    passWithNoTests: true,
    randomize: true,
    reporters: [...(isCI ? ['github-actions'] : []), 'default'],
    testEnvironment: 'node',
};
