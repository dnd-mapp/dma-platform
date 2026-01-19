# ADR 0001: Use Vitest via AnalogJS for Unit Testing

-   **Status:** Accepted
-   **Date:** 2026-01-18
-   **Decider:** Oscar

## Context and Problem Statement

The default Angular testing stack (Karma/Jasmine) is increasingly legacy. Karma is deprecated and runs tests in a real browser, which is slow and resource-heavy. We want a modern, Vite-based testing experience that is fast, supports ESM, and fits into a high-performance monorepo workflow.

## Decision Drivers

-   **Speed:** Unit tests must have a near-instant feedback loop.
-   **DX:** We want to move away from the "headful" browser requirement of Karma.
-   **Nx Compatibility:** Must work seamlessly with the Nx task runner.

## Considered Options

1.  **Karma/Jasmine:** The default, but slow and deprecated.
2.  **Jest:** Popular, but JSDOM setup for Angular 18+ can be brittle and requires heavy configuration.
3.  **Vitest via @analogjs/vitest-angular:** A lightweight bridge that enables Vitest for Angular components.

## Decision Outcome

Chosen option: **Option 3 (AnalogJS Vitest Bridge)**.

### Pros and Cons of the Chosen Option

-   **Good:** Massive performance gain; tests run in seconds.
-   **Good:** Vite-native, allowing us to leverage the same build engine for testing.
-   **Bad:** Adds a dependency on AnalogJS (though limited to a testing utility).
-   **Bad:** Requires a specific Vite configuration for Angular that differs from the standard CLI.

## Validation

Successfully migrated the `dnd-mapp` app to use `nx test` with the command executor, achieving sub-second execution for initial test suites.
