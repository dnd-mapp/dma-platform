# dnd-mapp (Main Web Application)

This is the primary user-facing Angular application for the D&D Mapp Platform. It serves as the main interface where players and DMs interact with character sheets, maps, and campaign tools.

## 🛠 Technical Overview

- **Framework:** [Angular](https://angular.dev)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Unit Testing:** [Vitest](https://vitest.dev/) (via [@analogjs/vitest-angular](https://analogjs.org/docs/packages/vitest-angular))
- **E2E Testing:** [Playwright](https://playwright.dev/)

### Why AnalogJS?

We use `@analogjs/vitest-angular` solely as a bridge to enable **Vitest** for unit testing. This allows us to move away from the deprecated Karma/Jasmine setup and provides a faster, modern testing experience with complete control over our Vite configuration. We do **not** use AnalogJS for SSR, routing, or file-based features.

---

## 🚀 Development

To run the application locally:

```bash
nx serve dnd-mapp
```

The application will be available at `https://localhost.www.dndmapp.dev:4200`. Ensure you have configured your local hosts file and SSL certificates as described in the [root documentation](../../README.md#-development-environment-setup).

---

## 🧪 Testing

### Unit Testing (Vitest)

Unit tests run via Vitest, providing a much faster feedback loop than JIT-compiled tests.

```bash
# Watch mode
nx test dnd-mapp -c development

# CI mode / single run
nx test dnd-mapp
```

### End-to-End Testing (Playwright)

Playwright handles browser-based automation.

```bash
# Run tests in headless mode
nx e2e dnd-mapp-e2e

# Run with UI mode for debugging
nx e2e dnd-mapp-e2e --ui
```

---

## 📁 Key Features in this App

- **Dashboard:** Entry point for user-specific campaigns and characters.
- **VTT Interface:** Interactive canvas for tactical battle simulation.
- **Character Builder:** Stepper-based wizard for 5e character creation.

---

## 🎨 Styling

This app uses **Tailwind CSS**. Configuration is local to this project but extends the shared workspace design system where applicable.

- Configuration: `apps/dnd-mapp/.postcssrc.json`
- Entry Point: `apps/dnd-mapp/src/styles.scss`
