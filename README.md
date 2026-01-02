# D&D Mapp

A distributed Dungeons & Dragons fifth Edition ecosystem for character management, campaign organization, and virtual tabletop play.

## 🏗 System Architecture

This project is a **Nx Workspace** containing multiple specialized applications and services, designed to be deployed via Docker/Kubernetes.

### Frontend Applications

- **`dnd-mapp`**: The primary web UI for players and DMs (VTT, Character Sheets, Notes).
- **`auth-client`**: Dedicated identity portal for registration, login, and profile management.
- **`admin-client`**: Internal dashboard for system administration, log inspection, and data management.

### Backend Services

- **`api-gateway`**: Centralized entry point for all client traffic.
- **`auth-server`**: Identity provider and credential management.
- **`resources-server`**: Authoritative source for game data (SRD, Spells, Monsters).
- **`player-server`**: Persistent storage for characters, user notes, and campaign states.

---

## 🛠 Getting Started

### 1. Prerequisites

The following tools are required to develop in this workspace:

- **Node.js 24**
- **pnpm v10**
- **[mkcert](https://github.com/FiloSottile/mkcert)** (for local HTTPS)
- **mise** (Optional, but recommended for managing tool versions)

If you use [mise](https://mise.jdx.dev/), the required versions of Node and pnpm will be installed automatically when you enter the directory or activate the tools by running the following command in the workspace root folder:

```bash
mise install
```

### 2. Local DNS Setup

To resolve local development domains, add the following entry to your `/etc/hosts` (macOS/Linux) or `C:\Windows\System32\drivers\etc\hosts` (Windows) file:

```text
127.0.0.1  localhost.www.dndmapp.dev
127.0.0.1  localhost.auth.dndmapp.dev
127.0.0.1  localhost.api.dndmapp.dev
127.0.0.1  localhost.admin.dndmapp.dev
127.0.0.1  localhost.resources.dndmapp.dev
127.0.0.1  localhost.players.dndmapp.dev
```

### 3. SSL Certificates & Trust

The development environment requires HTTPS. To avoid browser "Not Secure" warnings, you must generate local certificates and trust the `mkcert` Root CA.

#### Step A: Install and Trust the Root CA

Run this command once on your machine to add the `mkcert` local CA to your system trust store:

```bash
mkcert -install
```

*Note: You may be prompted for your system password or a security confirmation dialog.*

#### Step B: Generate Certificates

Use the built-in script to generate the certificates for all local domains:

```bash
pnpm run gen:ssl-certificates
```

*Alternatively, run the command manually:*

```bash
mkcert -cert-file cert.pem -key-file cert-key.pem localhost.www.dndmapp.dev localhost.auth.dndmapp.dev localhost.api.dndmapp.dev localhost.admin.dndmapp.dev localhost.resources.dndmapp.dev localhost.players.dndmapp.dev localhost 127.0.0.1
```

#### Step C: Browser Specifics

- **Chrome/Edge/Safari:** These browsers use the system trust store. After running `mkcert -install` and restarting the browser, the warnings will disappear.
- **Firefox:** Firefox uses its own certificate store. If you see a warning, go to `Settings` -> `Privacy & Security` -> `Certificates` -> `View Certificates` -> `Authorities` and verify that the "mkcert development CA" is imported, or simply run `mkcert -install` again as it attempts to update Firefox automatically.

### 4. Installation

```bash
pnpm install
```

---

## 🚀 Development Workflow

### Running Applications

Use the Nx CLI to serve specific apps or services:

```bash
# Start the main platform
pnpm nx serve dnd-mapp

# Start backend services
pnpm nx serve auth-server
pnpm nx serve api-gateway
```

### Quality Control

```bash
# Run tests for all projects
pnpm nx run-many -t test

# Lint the workspace
pnpm nx affected -t lint

# Format code
pnpm nx format:write
```

---

## 🚀 Tech Stack

- **Frontend:** Angular, Tailwind CSS.
- **Backend:** NestJS (Node.js).
- **Workspace:** Nx (Monorepo), Vitest/Jest (Unit/In-browser testing), Playwright/Jest (E2E).
- **Quality:** ESLint, Stylelint, Markdownlint, Prettier.
- **Deployment:** Docker, Kubernetes (Self-hosted).

## 📦 Project Structure

```text
dnd-mapp/dma-platform
├── apps
│   ├── admin-client        # Angular (Internal Admin)
│   ├── auth-client         # Angular (Identity UI)
│   ├── dnd-mapp            # Angular (Main App)
│   ├── api-gateway         # NestJS
│   ├── auth-server         # NestJS
│   ├── player-server       # NestJS
│   └── resources-server    # NestJS
├── libs                    # Shared logic, DTOs, and UI components
└── ... configuration files
```

## 🐳 Deployment

Each application in the `apps/` directory is designed to be containerized. The system is architected for self-hosting in a Kubernetes environment, allowing for independent scaling of the resource and player servers.

## 📜 License

This project is **UNLICENSED**. All rights reserved. Proprietary software.
