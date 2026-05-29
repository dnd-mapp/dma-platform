import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config({
    files: ['src/**/*.mjs'],
    extends: [tseslint.configs.eslintRecommended, prettierConfig],
});
