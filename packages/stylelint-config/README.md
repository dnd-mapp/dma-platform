# @dnd-mapp/stylelint-config

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)
[![node: >=24.0.0](https://img.shields.io/badge/node-%3E%3D24.0.0-339933?logo=nodedotjs&logoColor=white)](package.json)
[![stylelint peer: >=17.0.0](https://img.shields.io/badge/stylelint%20peer-%3E%3D17.0.0-263238?logo=stylelint&logoColor=white)](package.json)

Shared [Stylelint](https://stylelint.io) configuration for SCSS and Angular projects in the D&D Mapp platform.

## Peer dependencies

| Package                          | Required |
|:---------------------------------|:--------:|
| `stylelint`                      |   yes    |
| `stylelint-config-standard-scss` |   yes    |
| `stylelint-config-clean-order`   |   yes    |
| `stylelint-order`                |   yes    |

## Usage

```json
// .stylelintrc.json
{
    "extends": ["@dnd-mapp/stylelint-config"],
    "ignoreFiles": ["dist/**"]
}
```

**Includes:**

- `stylelint-config-standard-scss` — standard rules for SCSS, with modern `@use`/`@forward` enforcement
- `stylelint-config-clean-order` — consistent CSS property ordering via `stylelint-order`
- `:host` and `:host-context` pseudo-classes allowed for Angular component encapsulation
