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

| Package                                                   | Description                                                                    |
|:----------------------------------------------------------|:-------------------------------------------------------------------------------|
| [arcane-ui](packages/arcane-ui/README.md)                 | Shared Angular component library built on sigil design tokens                  |
| [eslint-config](packages/eslint-config/README.md)         | Shared ESLint flat config for TS and Angular                                   |
| [release-script](packages/release-script/README.md)       | Interactive release script — bumps versions, promotes changelogs, opens PRs    |
| [sigil](packages/sigil/README.md)                         | Design token library — colors, typography, and spacing as SCSS and CSS         |
| [stylelint-config](packages/stylelint-config/README.md)   | Shared Stylelint config for SCSS and Angular                                   |

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

4. Set up the Husky init script so that git hooks can find the correct Node and
   pnpm versions. On Windows, Husky runs in Git Bash, so use POSIX-formatted
   mise shim paths instead of evaluating the native Windows
   `mise activate bash` output:

    ```sh
    mkdir -p ~/.config/husky
    ```

    Add the following to `~/.config/husky/init.sh`:

    ```sh
    case "$(uname -s)" in
        MINGW*|MSYS*|CYGWIN*)
            mise_data_dir="${MISE_DATA_DIR:-"$HOME/AppData/Local/mise"}"
            case "$mise_data_dir" in
                [A-Za-z]:\\*) mise_data_dir="$(cygpath -u "$mise_data_dir")" ;;
            esac

            if mise_command="$(command -v mise 2>/dev/null)"; then
                mise_bin_dir="$(dirname "$mise_command")"
            else
                scoop_dir="${SCOOP:-"$HOME/scoop"}"
                case "$scoop_dir" in
                    [A-Za-z]:\\*) scoop_dir="$(cygpath -u "$scoop_dir")" ;;
                esac
                mise_bin_dir="$scoop_dir/apps/mise/current/bin"
            fi

            export PATH="$mise_data_dir/shims:$mise_bin_dir:$PATH"
            unset mise_data_dir mise_command mise_bin_dir scoop_dir
            ;;
        *)
            eval "$(mise activate bash)"
            ;;
    esac
    ```

5. **(Windows only)** Enable git long-path support. Storybook's content-hashed cache filenames exceed Windows' 260-character `MAX_PATH` limit and cause git to fail without this setting:

    ```sh
    git config --local core.longpaths true
    ```

### Local HTTPS setup

The dev server for `apps/realm` serves exclusively over HTTPS at `https://localhost.www.dndmapp.dev:4000`. The following one-time steps are required before running `ng serve realm`. Steps 1–3 require administrator privileges.

1. Install [mkcert](https://github.com/FiloSottile/mkcert):

    ```sh
    winget install mkcert
    ```

2. Trust the mkcert local CA in your system certificate store:

    ```sh
    mkcert -install
    ```

3. Add the local hostnames to your `hosts` file (`C:\Windows\System32\drivers\etc\hosts`):

    ```text
    127.0.0.1 localhost.www.dndmapp.dev localhost.auth.dndmapp.dev
    ```

4. Generate the development certificate:

    ```sh
    pnpm certs:generate
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
