[← Back to Docs](../README.md) | **Category:** Developer Hub

---

# 🏗 Architecture Overview

This document outlines the structural design of the D&D Mapp Platform and the reasoning behind our technical choices.

## 📂 Project Structure (Nx Monorepo)

We use **Nx** to manage our workspace. This allows us to share logic between the main web app and potential future applications (like a mobile app or a dedicated DM screen).

```text
dma-platform/
├── apps/
│   ├── auth-client/      # Angular (Identity & Account Management)
│   ├── auth-server/      # NestJS (Identity API)
│   └── dnd-mapp/         # Angular (Main Web Application)
├── docs/                 # Documentation hub
├── e2e/                  # Playwright End-to-End tests
│   ├── auth-client/      
│   ├── auth-server/      
│   └── dnd-mapp/
└── libs/
    ├── auth/
    │   └── ui/           # Auth components & services (@dnd-mapp/auth-ui)
    └── shared/
        └── ui/           # Generic UI components & Lazy Pages (@dnd-mapp/shared-ui)
```

## 🧩 Architectural Principles

### 1. Monorepo Logic Sharing

The goal of this repository is to centralize D&D 5e game logic. By placing game rules (e.g., modifier calculations, spell effects) in `libs/shared/logic`, we ensure that the logic is identical whether it's viewed on the player dashboard or the VTT.

### 2. Angular Component Design

We follow a **Container/Presenter** pattern:

-   **Containers:** Handle data fetching via services and manage state.
-   **Presenters:** Pure UI components that receive data via Input and Output signals.

### 3. Styling Strategy

We use **Tailwind CSS** for all styling.

-   **Scoped Styles:** Most styles should be utility-first in the HTML.
-   **Design System:** Global tokens (colors for D&D classes, etc.) are defined in the root Tailwind config to ensure brand consistency across apps.

## 🔄 Technical Decisions

### Why AnalogJS for Testing?

We use `@analogjs/vitest-angular` as a bridge to enable **Vitest**.

-   **Benefit:** Provides a 10x faster unit testing experience compared to Karma.
-   **Constraint:** We do not use other AnalogJS features (SSR/Routing) to keep the Angular footprint standard.

### Local Development Loopback

The use of `localhost.www.dndmapp.dev` via the `hosts` file allows us to simulate subdomains and handle SSL certificates in a way that mirrors our eventual production environment.

---
**See Also:**
* [Testing Strategy](./testing-guide.md)
* [SSL & DNS Setup](./ssl-dns-setup.md) 
