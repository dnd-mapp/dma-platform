# @dnd-mapp/arcane-ui

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)
[![node: 24.16.0](https://img.shields.io/badge/node-24.16.0-339933?logo=nodedotjs&logoColor=white)](../../package.json)
[![Angular: ~21.2.14](https://img.shields.io/badge/Angular-~21.2.14-DD0031?logo=angular&logoColor=white)](../../package.json)

`@dnd-mapp/arcane-ui` is D&D Mapp's shared Angular library. It provides reusable components built on top of [`@dnd-mapp/sigil`](../sigil/README.md) design tokens, alongside shared services and injection tokens — all shared across the platform's frontend applications.

## Usage

Import components from `@dnd-mapp/arcane-ui` in your Angular application:

```ts
import { SomeComponent } from '@dnd-mapp/arcane-ui';
```

> [!NOTE]
> Components are added incrementally. Refer to each component's own documentation as the library grows.

## Development

```bash
# Build the library
pnpm build

# Build in watch mode
pnpm build-dev

# Run unit tests
pnpm test-ci

# Run unit tests in watch mode
pnpm test-dev

# Lint TypeScript
pnpm lint-ts

# Lint SCSS
pnpm lint-css
```

The library is built to `dist/packages/arcane-ui/` at the workspace root.
