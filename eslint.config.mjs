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
                            onlyDependOnLibsWithTags: [
                                'scope:dnd-mapp',
                                'scope:shared-ui',
                                'scope:auth-domain',
                                'scope:auth-ui',
                                'scope:shared-utils',
                            ],
                        },
                        {
                            sourceTag: 'scope:auth-client',
                            onlyDependOnLibsWithTags: [
                                'scope:auth-client',
                                'scope:shared-ui',
                                'scope:auth-domain',
                                'scope:auth-ui',
                                'scope:shared-utils',
                            ],
                        },
                        {
                            sourceTag: 'scope:auth-server',
                            onlyDependOnLibsWithTags: [
                                'scope:auth-server',
                                'scope:auth-domain',
                                'scope:backend-utils',
                                'scope:shared-utils',
                            ],
                        },
                        {
                            sourceTag: 'scope:auth-ui',
                            onlyDependOnLibsWithTags: ['scope:shared-ui', 'scope:shared-utils'],
                        },
                        {
                            sourceTag: 'scope:shared-ui',
                            onlyDependOnLibsWithTags: ['scope:shared-utils'],
                        },
                        {
                            sourceTag: 'scope:backend-utils',
                            onlyDependOnLibsWithTags: ['scope:shared-utils'],
                        },
                        {
                            sourceTag: 'scope:auth-domain',
                            onlyDependOnLibsWithTags: ['scope:shared-utils'],
                        },
                        {
                            sourceTag: 'scope:shared-utils',
                            onlyDependOnLibsWithTags: [],
                        },
                        {
                            sourceTag: 'platform:web',
                            allowedExternalImports: [
                                '@analogjs/*',
                                '@angular/*',
                                '@nx/*',
                                '@vitest/*',
                                'nanoid',
                                'rxjs',
                                'vite',
                            ],
                        },
                        {
                            sourceTag: 'platform:server',
                            allowedExternalImports: [
                                '@dotenvx/*',
                                '@nestjs/*',
                                '@nx/*',
                                '@prisma/*',
                                'class-transformer',
                                'class-validator',
                                'fastify',
                                'nanoid',
                                'prisma/*',
                                'rxjs',
                                'vite',
                            ],
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
