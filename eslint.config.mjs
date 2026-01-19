import nx from '@nx/eslint-plugin';

export default [
    ...nx.configs['flat/base'],
    ...nx.configs['flat/typescript'],
    ...nx.configs['flat/javascript'],
    {
        ignores: ['.angular', '.nx', '**/dist', '**/node_modules', '**/reports'],
    },
    {
        files: ['**/*.ts', '**/*.cts', '**/*.mts', '**/*.js', '**/*.cjs', '**/*.mjs'],
        rules: {
            '@nx/enforce-module-boundaries': [
                'error',
                {
                    enforceBuildableLibDependency: true,
                    allowCircularSelfDependency: true,
                    checkDynamicDependenciesExceptions: ['@dnd-mapp/shared-ui'],
                    allow: ['^.*/eslint\\.config\\.mjs$'],
                    depConstraints: [
                        {
                            sourceTag: 'scope:dnd-mapp',
                            onlyDependOnLibsWithTags: ['scope:dnd-mapp', 'scope:shared'],
                        },
                        {
                            sourceTag: 'scope:auth-client',
                            onlyDependOnLibsWithTags: ['scope:auth-client', 'scope:shared'],
                        },
                        {
                            sourceTag: 'scope:auth-server',
                            onlyDependOnLibsWithTags: ['scope:auth-server', 'scope:shared'],
                        },
                        {
                            sourceTag: 'scope:shared',
                            onlyDependOnLibsWithTags: ['scope:shared'],
                        },
                        {
                            sourceTag: 'platform:web',
                            allowedExternalImports: ['@analogjs/*', '@angular/*', '@nx/*', '@vitest/*', 'rxjs', 'vite'],
                        },
                        {
                            sourceTag: 'platform:server',
                            allowedExternalImports: ['@nestjs/*', 'fastify', 'jest', 'rxjs'],
                        },
                    ],
                },
            ],
        },
    },
    {
        files: ['**/*.ts', '**/*.cts', '**/*.mts', '**/*.js', '**/*.cjs', '**/*.mjs'],
        // Override or add rules here
        rules: {},
    },
];
