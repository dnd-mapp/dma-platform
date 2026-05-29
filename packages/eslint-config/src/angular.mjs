import angular from 'angular-eslint';
import prettierConfig from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';
import base from './index.mjs';

export default defineConfig([
    ...base,
    {
        files: ['**/*.ts'],
        extends: [...angular.configs.tsRecommended],
        processor: angular.processInlineTemplates,
    },
    {
        files: ['**/*.html'],
        extends: [
            ...angular.configs.templateRecommended,
            ...angular.configs.templateAccessibility,
        ],
    },
    prettierConfig,
]);
