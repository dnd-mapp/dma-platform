import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['apps/realm/**', 'e2e/**', 'packages/eslint-config/**', 'dist/**', 'coverage/**', 'reports/**', '.angular/**'],
    },
    {
        files: ['**/*.{js,mjs,cjs}'],
        extends: [tseslint.configs.eslintRecommended, prettierConfig],
    },
);
