# ADR 0002: Tailwind CSS for Platform-wide Styling

-   **Status:** Accepted
-   **Date:** 2026-01-18
-   **Decider:** Oscar

## Context and Problem Statement

The platform requires a consistent design language across multiple applications (e.g., the web app and future tools). We need a styling solution that is highly maintainable, prevents "CSS bloat," and allows for rapid UI prototyping.

## Decision Drivers

-   **Scalability:** Must avoid the "global CSS" mess where changes in one place break another.
-   **Theming:** Must be easy to implement D&D-specific themes (e.g., "Dark Mode," class-based color schemes).
-   **Bundle Size:** We want to minimize the amount of CSS shipped to the client.

## Considered Options

1.  **SCSS Modules:** Great for encapsulation, but requires a lot of "boilerplate" CSS files and naming conventions.
2.  **Angular Material:** Robust, but opinionated and difficult to customize for a unique "D&D" aesthetic.
3.  **Tailwind CSS:** Utility-first framework that compiles down to only the CSS actually used.

## Decision Outcome

Chosen option: **Option 3 (Tailwind CSS)**.

### Pros and Cons of the Chosen Option

-   **Good:** High velocity; no need to switch between HTML and CSS files.
-   **Good:** "Dead code" elimination is handled automatically via the Tailwind compiler.
-   **Good:** Easy to centralize the design system in a shared `tailwind.config.js` for the Nx monorepo.
-   **Bad:** Initial learning curve for the utility classes.
-   **Bad:** HTML can become "noisy" with many class names.

## Implementation Strategy

We will use a root Tailwind configuration that apps and libs can extend. PostCSS will be used to handle the processing within the Nx build pipeline.
