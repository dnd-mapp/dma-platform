# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Angular library scaffolded with secondary entry points for `components`, `config`, `http`, `storage`, `theming`, and `testing`
- Storybook configured for component development; base path set via `viteFinal` for sub-path deployments; `STORYBOOK_BASE_URL` environment variable controls the base path at runtime
- `StorageService` — typed injectable that wraps any `Storage` implementation (e.g. `localStorage`), exposing `get<T>`, `set<T>`, and `remove` methods; returns `null` for missing keys or malformed JSON. The `STORAGE` injection token and `provideStorage()` factory are exported from the `common` entry point. `MockStorage` in-memory test double is available from `storage/testing`
- `ConfigService<T>` in the `config` entry point that fetches a JSON config file at bootstrap and exposes it as a typed singleton; wired via `provideConfig<T>(url)`. The `CONFIG_URL` injection token is exported from the `common` entry point
- `RequestService` in the `http` entry point — a typed wrapper around Angular's `HttpClient` exposing `get`, `post`, `put`, `patch`, and `delete` methods that return `Observable<T>`
- `ThemeService`, `ThemeMode` type alias, and `ThemeModes` constant in the `theming` entry point. The service exposes a read-only `mode` signal and `setTheme()`, which writes or removes `[data-theme]` on `<html>` — `'dark'`/`'light'` set it explicitly; `'system'` removes it, deferring to `prefers-color-scheme`
- `provideTheme()` that bundles `ThemeService` with `StorageService`, persisting the user's theme preference to `localStorage` across page reloads; selecting `'system'` clears the stored key
- `setupTestEnvironment` helper in the `testing` entry point — configures a `TestBed` with zoneless change detection; accepts `imports`, `testComponent`, and `harness` parameters; returns `fixture`, `harnessLoader`, and `harness` when a component is provided

### Changed

- `ConfigService.load()` now delegates HTTP to `RequestService.get()` via Angular's `HttpClient` instead of using native `fetch()`

### Fixed

- Cross-entry-point imports in the `config` entry point corrected to use the full package name so `ng-packagr` resolves entry-point boundaries correctly
- `viteFinal` in the Storybook configuration typed via `StorybookConfigVite` to restore TypeScript narrowing after the Storybook 9 migration
