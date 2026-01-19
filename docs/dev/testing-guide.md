[← Back to Docs](../README.md) | **Category:** Developer Hub

---

# 🧪 Testing Strategy

The D&D Mapp Platform prioritizes fast feedback loops via Vitest and robust browser automation via Playwright.

## ⚡ Unit Testing (Vitest)

We use `@analogjs/vitest-angular` as a bridge to enable **Vitest**. This replaces the standard Karma/Jasmine setup for significantly faster execution.

*Note: We do **not** use AnalogJS for SSR or Routing; it is strictly a testing utility.*

```bash
# Watch mode (Development)
nx test dnd-mapp -c development

# Single run (CI mode)
nx test dnd-mapp
```

## 🎭 E2E Testing (Playwright)

Playwright handles browser-based automation for critical user paths (e.g., Character Creation).

```bash
# Run tests in headless mode
nx e2e dnd-mapp-e2e

# Run with UI mode for debugging
nx e2e dnd-mapp-e2e --ui
```
