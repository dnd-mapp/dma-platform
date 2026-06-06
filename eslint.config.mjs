import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['apps/**', 'e2e/**', 'packages/**', 'dist/**', 'coverage/**', 'reports/**', '.angular/**'],
    },
    {
        files: ['**/*.{js,mjs,cjs}'],
        extends: [tseslint.configs.eslintRecommended, prettierConfig],
    },
);
