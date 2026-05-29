# dma-platform

[![Main](https://github.com/dnd-mapp/dma-platform/actions/workflows/push-main.yml/badge.svg)](https://github.com/dnd-mapp/dma-platform/actions/workflows/push-main.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![node: 24.16.0](https://img.shields.io/badge/node-24.16.0-339933?logo=nodedotjs&logoColor=white)](package.json)
[![pnpm: 10.34.1](https://img.shields.io/badge/pnpm-10.34.1-F69220?logo=pnpm&logoColor=white)](package.json)

Monorepo for the D&D Mapp platform — libraries and applications powering character management, campaign tools, and Virtual Tabletop sessions for D&D 5e.

## Prerequisites

- **[mise](https://mise.jdx.dev/getting-started.html)** — manages the Node.js and pnpm versions declared in `package.json`

## Getting started

1. Install mise by following the [official getting started guide](https://mise.jdx.dev/getting-started.html).

2. Activate the required toolchain versions:

    ```sh
    mise install
    ```

3. Install workspace dependencies:

    ```sh
    pnpm install
    ```

## Editor setup

### VS Code

1. Install the [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension.
2. Add the following to your workspace or user settings:

    ```json
    {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true
    }
    ```

### WebStorm

1. Open **Settings** → **Languages & Frameworks** → **Prettier**.
2. Set **Prettier package** to the project's local installation (`node_modules/prettier`).
3. Enable **Run on save**.
