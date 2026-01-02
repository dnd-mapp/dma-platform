# D&D Mapp

A distributed Dungeons & Dragons fifth Edition ecosystem for character management, campaign organization, and virtual tabletop play.

## 🏗 System Architecture

This project is a **Nx Workspace** containing multiple specialized applications and services, designed to be deployed via Docker/Kubernetes.

### Frontend Applications (Angular & AnalogJS)

- **`dnd-mapp`**: The primary web UI for players and DMs (VTT, Character Sheets, Notes).
- **`auth-client`**: Dedicated identity portal for registration, login, and profile management.
- **`admin-client`**: Internal dashboard for system administration, log inspection, and data management.

### Backend Services (NestJS)

- **`api-gateway`**: Centralized entry point for all client traffic.
- **`auth-server`**: Identity provider and credential management.
- **`resources-server`**: Authoritative source for game data (SRD, Spells, Monsters).
- **`player-server`**: Persistent storage for characters, user notes, and campaign states.

## 🚀 Tech Stack

- **Frontend:** Angular, AnalogJS (Meta-framework, used for testing only), Tailwind CSS.
- **Backend:** NestJS, Node.js.
- **Workspace:** Nx (Monorepo), Vitest/Jest (Unit/In-browser testing), Playwright/Jest (E2E).
- **Quality:** ESLint, Stylelint, Markdownlint, Prettier.
- **Deployment:** Docker, Kubernetes.

## 🛠 Development Workflow

### Installation

```bash
pnpm install
```

### Running Applications

You can serve any application or service using the Nx CLI:

```bash
# Frontend
pnpm exec nx serve dnd-mapp
pnpm exec nx serve auth-client

# Backend
pnpm exec nx serve auth-server
pnpm exec nx serve api-gateway
```

### Workspace-wide Operations

```bash
# Run tests for all affected projects
pnpm exec nx affected:test

# Check linting for the entire workspace
pnpm exec nx affected:lint

# Format all files
pnpm exec nx format:write
```

## 📦 Project Structure

```text
dnd-mapp/dma-platform
├── apps
│   ├── admin-client        # Angular
│   ├── auth-client         # Angular
│   ├── dnd-mapp            # Angular
│   ├── api-gateway         # NestJS
│   ├── auth-server         # NestJS
│   ├── player-server       # NestJS
│   └── resources-server    # NestJS
├── libs                    # Shared logic, DTOs, and UI components
└── ... workspace config
```

## 🐳 Deployment

Each application in the `apps/` directory is designed to be containerized. The system is architected for self-hosting in a Kubernetes environment, allowing for independent scaling of the resource and player servers.

## 📜 License

This project is **UNLICENSED**. All rights reserved. Proprietary software.
