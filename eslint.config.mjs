import eslint from '@eslint/js';
import nx from '@nx/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
    ...nx.configs['flat/base'],
    {
        ignores: ['**/dist', '**/out-tsc', '**/vitest.config.*.timestamp*'],
    },
    {
        files: ['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.ts', '**/*.cts', '**/*.mts'],
        extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    },
    {
        plugins: {
            '@typescript-eslint': tseslint.plugin,
        },
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        files: ['**/*.ts', '**/*.js'],
        rules: {
            '@nx/enforce-module-boundaries': [
                'error',
                {
                    enforceBuildableLibDependency: true,
                    allowCircularSelfDependency: true,
                    allow: ['^.*/eslint\\.config\\.mjs$'],
                    depConstraints: [
                        {
                            sourceTag: 'platform:angular',
                            onlyDependOnLibsWithTags: [],
                            allowedExternalImports: ['@angular/*', '@analogjs/*', 'rxjs'],
                        },
                    ],
                },
            ],
        },
    },
    {
        files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
    {
        files: ['**/*.ts', '**/*.cts', '**/*.mts'],
        rules: {},
    },
    {
        files: ['**/*.ts', '**/*.cts', '**/*.mts', '**/*.js', '**/*.cjs', '**/*.mjs'],
        rules: {},
    },
    eslintConfigPrettier,
);
