# ADR 0002: Use Vitest browser mode for Realm unit and integration tests

- **Status:** Accepted
- **Date:** 2026-05-29

## Context

`apps/realm` needs a unit and integration testing strategy. The Angular community default is Jest with `jest-preset-angular`, which runs tests in a simulated DOM (jsdom). Two alternatives were considered:

- **Jest + jsdom** — mature, widely documented for Angular, but jsdom diverges from real browser behavior and requires transform configuration to handle Angular's ESM output.
- **Vitest + Playwright browser mode** — runs tests inside a real Chromium browser via Playwright; native ESM support; shares the Playwright toolchain already used for E2E tests.

`@angular/cdk` `ComponentHarness` is used for interaction testing, which benefits from a real browser DOM to ensure harness queries reflect actual rendered output.

## Decision

Use **Vitest with Playwright browser mode** for all unit and integration tests in `apps/realm`. Use `@angular/cdk` `ComponentHarness` implementations for testing user interactions.

## Consequences

- Tests run in real Chromium, eliminating jsdom divergence issues — particularly relevant for Angular CDK harnesses and DOM-dependent behavior.
- Vitest's native ESM support avoids the transform overhead required by Jest for Angular.
- The Playwright dependency is shared with the E2E suite, keeping the toolchain consolidated.
- Vitest browser mode is less battle-tested in the Angular ecosystem than Jest; some community tooling and examples assume Jest.
- Test execution requires a browser process, which is heavier than a pure Node runner — offset by Vitest's parallelism.
