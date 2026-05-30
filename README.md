# dma-platform

[![Main](https://github.com/dnd-mapp/dma-platform/actions/workflows/push-main.yml/badge.svg)](https://github.com/dnd-mapp/dma-platform/actions/workflows/push-main.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![node: 24.16.0](https://img.shields.io/badge/node-24.16.0-339933?logo=nodedotjs&logoColor=white)](package.json)
[![pnpm: 10.34.1](https://img.shields.io/badge/pnpm-10.34.1-F69220?logo=pnpm&logoColor=white)](package.json)

Monorepo for the D&D Mapp platform — libraries and applications powering character management, campaign tools, and Virtual Tabletop sessions for D&D 5e.

## Projects

### Applications

| App                            | Description                                                                    |
|:-------------------------------|:-------------------------------------------------------------------------------|
| [realm](apps/realm/README.md)  | Main frontend client — character management, campaign tools, and VTT sessions  |

### Packages

| Package                                                   | Description                                  |
|:----------------------------------------------------------|:---------------------------------------------|
| [eslint-config](packages/eslint-config/README.md)         | Shared ESLint flat config for TS and Angular |
| [stylelint-config](packages/stylelint-config/README.md)   | Shared Stylelint config for SCSS and Angular |

### End-to-end tests

| Project                           | Target app                     |
|:----------------------------------|:-------------------------------|
| [realm-e2e](e2e/realm/README.md)  | [realm](apps/realm/README.md)  |

## Getting started

### Prerequisites

- **[mise](https://mise.jdx.dev/getting-started.html)** — manages the Node.js and pnpm versions declared in `package.json`

1. Install mise by following the [official getting started guide](https://mise.jdx.dev/getting-started.html).

2. Activate the required toolchain versions:

    ```sh
    mise install
    ```

3. Install workspace dependencies:

    ```sh
    pnpm install
    ```

4. Set up the Husky init script so that git hooks can find the correct Node and pnpm versions:

    ```sh
    mkdir -p ~/.config/husky && echo 'eval "$(mise activate bash)"' >> ~/.config/husky/init.sh
    ```

## Editor setup

### VS Code

1. Install the recommended extensions when prompted, or install them manually:

    - [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) — template type-checking and autocompletion in HTML files
    - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) — inline lint diagnostics
    - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) — formatting
    - [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) — run and debug e2e tests
    - [Vitest](https://marketplace.visualstudio.com/items?itemName=vitest.explorer) — run and debug unit tests
    - [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) — Markdown linting
    - [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) — inline SCSS lint diagnostics
    - [Conventional Commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits) — commit message builder that enforces the project's commit format

The workspace settings in `.vscode/settings.json` are pre-configured:

- Prettier formats on save; a ruler is shown at column 120 to match `printWidth`
- ESLint runs in flat config mode and applies auto-fixable fixes on save
- Stylelint validates CSS and SCSS files and applies auto-fixable fixes on save
- The project TypeScript installation (`node_modules/typescript`) is used instead of VS Code's bundled version
- Build artifacts (`dist`, `coverage`, `.angular`) are hidden from the file explorer and excluded from search

### WebStorm

**Prettier:**

1. Open **Settings** → **Languages & Frameworks** → **Prettier**.
2. Set **Prettier package** to the project's local installation (`node_modules/prettier`).
3. Enable **Run on save**.

**ESLint:**

1. Open **Settings** → **Languages & Frameworks** → **JavaScript** → **Code Quality Tools** → **ESLint**.
2. Select **Automatic ESLint configuration**.
3. Enable **Run eslint --fix on save**.

**Stylelint:**

1. Open **Settings** → **Languages & Frameworks** → **Style Sheets** → **Stylelint**.
2. Enable **Stylelint**.
3. Set **Stylelint package** to the project's local installation (`node_modules/stylelint`).

**Playwright:**

1. Open **Run** → **Edit Configurations** → **+** → **Playwright**.
2. Point the configuration to `e2e/realm/playwright.config.ts`.

**Vitest:**

WebStorm detects Vitest automatically. Tests appear in the **Services** panel. If not picked up, open `apps/realm/vitest.config.mts` and run a test file once to register the configuration.
