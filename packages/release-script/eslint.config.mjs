import nodeConfig from '@dnd-mapp/eslint-config/node';

export default [
    { ignores: ['coverage/', 'reports/', 'node_modules/'] },
    ...nodeConfig,
    {
        files: ['**/*.ts'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
];
