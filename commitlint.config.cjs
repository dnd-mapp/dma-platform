/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
    extends: ['@commitlint/config-conventional'],
    plugins: [
        {
            rules: {
                'subject-first-char-case': ({ subject }) => [
                    !subject || /^[A-Z]/.test(subject),
                    'subject must start with an uppercase letter',
                ],
            },
        },
    ],
    rules: {
        'subject-case': [2, 'never', ['pascal-case', 'upper-case']],
        'subject-first-char-case': [2, 'always'],
        'header-max-length': [2, 'always', 72],
    },
};
