import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        extends: [tseslint.configs.eslintRecommended],
    },
]);
