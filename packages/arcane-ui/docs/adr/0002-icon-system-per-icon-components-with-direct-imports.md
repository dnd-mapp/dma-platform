# Icon system uses per-icon components with direct imports

Each icon in Arcane UI is a standalone Angular component with its SVG markup inlined in the component template. Consumers and internal Arcane UI components import icon components directly from `@dnd-mapp/arcane-ui/icons`. There is no icon registry, no `provideIcons()` call, and no runtime icon library dependency. SVG files are vendored into the repository.

## Considered options

A registry-based approach (modeled on Angular Material's `MatIconRegistry`) was considered: a single `DmaIconComponent` accepts a `name` string input and looks up the registered icon at runtime. Rejected for three reasons: it requires global state (a service), a registration step at app bootstrap, and is not tree-shakable by default — registered icons ship regardless of whether they are rendered. The current use cases (internal component loading states, explicit icon placements) do not require rendering icons by dynamic string name.

## Consequences

Only imported icon components land in the bundle — unused icons are eliminated by the bundler. Adding a new icon means adding a new component file and exporting it from the entry point. If a future use case requires rendering icons by dynamic string name at runtime (e.g. icon names from server data), a registry layer can be introduced as an opt-in without removing the direct import path.
