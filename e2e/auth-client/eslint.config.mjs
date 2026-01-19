import playwright from 'eslint-plugin-playwright';
import baseConfig from '../../eslint.config.mjs';

export default [
    playwright.configs['flat/recommended'],
    ...baseConfig,
    {
        files: ['**/*.ts'],
        // Override or add rules here
        rules: {},
    },
];
