import playwright from 'eslint-plugin-playwright';
import { defineConfig } from 'eslint/config';
import baseConfig from '../../eslint.config.mjs';

export default defineConfig(...baseConfig, playwright.configs['flat/recommended'], {
    files: ['**/*.ts', '**/*.js'],
    // Override or add rules here
    rules: {},
});
