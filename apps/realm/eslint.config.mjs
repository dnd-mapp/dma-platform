import angularConfig from '@dnd-mapp/eslint-config/angular';

export default [
    { ignores: ['.angular/', 'dist/', 'coverage/', 'reports/'] },
    ...angularConfig,
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
