const nxPreset = require('@nx/jest/preset').default;

/** @type {import('jest').Config} */
module.exports = {
    ...nxPreset,
    collectCoverage: true,
    coverageProvider: 'v8',
    randomize: true,
    showSeed: true,
};
