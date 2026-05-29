# @dnd-mapp/eslint-config

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)
[![node: >=24.0.0](https://img.shields.io/badge/node-%3E%3D24.0.0-339933?logo=nodedotjs&logoColor=white)](package.json)
[![eslint peer: >=10.0.0](https://img.shields.io/badge/eslint%20peer-%3E%3D10.0.0-4B32C3?logo=eslint&logoColor=white)](package.json)
[![typescript-eslint peer: >=8.0.0](https://img.shields.io/badge/typescript--eslint%20peer-%3E%3D8.0.0-3178C6?logo=typescript&logoColor=white)](package.json)

Shared [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files) for TypeScript and Angular projects in the D&D Mapp platform.

## Entry points

| Import                            | Use for                                |
|:----------------------------------|:---------------------------------------|
| `@dnd-mapp/eslint-config`         | Plain TypeScript / JavaScript projects |
| `@dnd-mapp/eslint-config/angular` | Angular apps and libraries             |

## Peer dependencies

| Package                  | Required | When                   |
|:-------------------------|:--------:|:-----------------------|
| `eslint`                 |   yes    | always                 |
| `typescript-eslint`      |   yes    | always                 |
| `eslint-config-prettier` |   yes    | always                 |
| `angular-eslint`         |    no    | `./angular` entry only |

## Usage

### Plain TypeScript / JavaScript

```js
// eslint.config.mjs
import baseConfig from '@dnd-mapp/eslint-config';

export default [
    { ignores: ['dist/'] },
    ...baseConfig,
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
```

**Includes:**

- `eslintRecommended` for JavaScript files (`*.js`, `*.mjs`, `*.cjs`)

### Angular

```js
// eslint.config.mjs
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
```

**Includes:**

- Everything from the base config
- `angular.configs.tsRecommended` for TypeScript files, with inline template extraction via `processInlineTemplates`
- `angular.configs.templateRecommended` + `angular.configs.templateAccessibility` for HTML templates
- `eslint-config-prettier` last, to disable formatting rules that conflict with Prettier

> `projectService: true` requires a `tsconfig.json` reachable from `tsconfigRootDir`. Type-aware rules will not run without it.

## `ng lint` integration

Angular projects can run linting through the Angular CLI using `@angular-eslint/builder`:

```json
// angular.json
{
    "lint": {
        "builder": "@angular-eslint/builder:lint",
        "options": {
            "eslintConfig": "apps/my-app/eslint.config.mjs",
            "lintFilePatterns": ["apps/my-app/**/*.ts", "apps/my-app/**/*.html"]
        }
    }
}
```
