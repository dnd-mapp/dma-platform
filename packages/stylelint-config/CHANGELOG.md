# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Shared Stylelint configuration extending `stylelint-config-standard-scss` and `stylelint-config-clean-order`, providing standard SCSS rules and clean property ordering out of the box
- Angular `:host` and `:host-context` pseudo-class support via custom rule overrides, allowing linting of Angular component stylesheets without false positives on Angular-specific selectors

[Unreleased]: https://github.com/dnd-mapp/dma-platform/compare/stylelint-config@0.0.0...HEAD
