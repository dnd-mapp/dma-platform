# shared-ui

The `shared-ui` library is the central design system for the D&D Mapp Platform. It provides a suite of generic, reusable Angular components, utility functions, and complete pages used across the ecosystem.

## 🏗️ Architecture

To keep the library performant and tree-shakable, we use **Secondary Entry Points**.

### Entry Points

- **`@dnd-mapp/shared-ui`**: Core exports (Interfaces, Constants, Components).
- **`@dnd-mapp/shared-ui/pages/*`**: Lazily loadable pages.
- **`@dnd-mapp/shared-ui/test`**: Testing utilities, including Component Harnesses and mock providers.

## 🎨 Styling

This library uses **Tailwind CSS**. Since the library is not buildable/publishable on its own, it relies on the **consuming application's** Tailwind configuration to process its styles.

## 🧪 Testing

The library uses the platform-standard **Vitest + AnalogJS** bridge.

- **Unit Tests:** `nx test shared-ui`
- **Harnesses:** We use the [Component Test Harness](https://material.angular.io/cdk/test-harnesses/overview) pattern. Consuming apps can import these via `@dnd-mapp/shared-ui/test` to write robust integration tests without reaching into private component internals.

---

> [!Note]
> Pages are kept private within their secondary entry points and are not exported from the main library index to ensure strict lazy-loading boundaries.
