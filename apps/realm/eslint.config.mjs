import angularConfig from '@dnd-mapp/eslint-config/angular';

export default [
    { ignores: ['dist/', 'coverage/'] },
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
