import angularEslint from 'angular-eslint';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import baseConfig from '../../eslint.config.mjs';

export default defineConfig(
    ...baseConfig,
    {
        files: ['**/*.ts'],
        extends: [angularEslint.configs.tsRecommended],
        plugins: {
            '@angular-eslint': angularEslint.tsPlugin,
        },
        processor: angularEslint.processInlineTemplates,
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2026,
                ...globals.node,
            },
        },
        rules: {
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'app',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'app',
                    style: 'kebab-case',
                },
            ],
        },
    },
    {
        files: ['**/*.html'],
        extends: [...angularEslint.configs.templateRecommended, ...angularEslint.configs.templateAccessibility],
        rules: {},
    },
);
