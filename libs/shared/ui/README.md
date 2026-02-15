# shared-ui

The `shared-ui` library is the central design system for the D&D Mapp Platform. It provides a suite of generic, reusable Angular components, utility functions, and complete pages used across the ecosystem.

## 🏗️ Architecture

To keep the library performant and tree-shakable, we use **Secondary Entry Points**.

### Entry Points

- **`@dnd-mapp/shared-ui`**: Core exports (Interfaces, Constants, Components).
- **`@dnd-mapp/shared-ui/pages/*`**: Lazily loadable pages.

## 🎨 Styling

This library uses **Tailwind CSS**. Since the library is not buildable/publishable on its own, it relies on the **consuming application's** Tailwind configuration to process its styles.

---

> [!Note]
> Pages are kept private within their secondary entry points and are not exported from the main library index to ensure strict lazy-loading boundaries.
