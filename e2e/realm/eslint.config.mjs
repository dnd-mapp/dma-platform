import baseConfig from '@dnd-mapp/eslint-config';
import tseslint from 'typescript-eslint';

export default [
    ...baseConfig,
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
];
