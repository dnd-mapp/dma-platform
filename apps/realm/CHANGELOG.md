# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Angular SPA scaffolded as the initial Realm application
- Runtime configuration loaded from `/config.json` at bootstrap; `RealmConfig` interface allows typed access to environment-specific values
- Sigil normalize and base styles applied as global CSS layers, establishing a consistent baseline and element defaults across the app
- Sigil design tokens and `provideTheme()` registered in the app config, enabling the shared theme system
- Development server configured on port 4000

### Fixed

- Root component test spec now correctly provides `provideZonelessChangeDetection()` and `provideRouter([])`, matching the production app configuration
