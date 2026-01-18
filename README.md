# D&D Mapp Platform

An integrated digital ecosystem for Dungeons & Dragons 5th Edition, designed to streamline the experience for both Players and Dungeon Masters. This repository is a monorepo powered by **Nx** and **pnpm**.

## 🚀 Overview

`dma-platform` is a full-stack solution built to handle everything from character creation to real-time battle simulation. By centralizing game logic into shared TypeScript libraries, we ensure a consistent experience across the entire platform.

### Core Features

- **Character Management**: Create and manage D&D 5e Player Characters with automated calculations.
- **Virtual Tabletop (VTT)**: Simulate tactical combat with a digital battle map.
- **Campaign & Lore Organizer**: Tools for DMs to build worlds, write lore, and manage session notes.
- **Game Toolbox**: Integrated dice roller and a searchable database for spells, items, and mechanics.
- **Homebrew Creator**: Build and share custom monsters, items, and encounters.

---

## 🛠 Tech Stack

### Frontend & Backend

- **Frameworks:** Angular

### Infrastructure

- **Package Manager:** [pnpm](https://pnpm.io) (v10+)
- **Monorepo Tooling:** [Nx](https://nx.dev)
- **Version Management:** [mise](https://mise.jdx.dev/)

---

## 📁 Project Structure

```text
dma-platform/
└── apps/
    └── dnd-mapp/         # Main Angular Web Application
```

---

## ⚙️ Development Environment Setup

### 1. Prerequisites & Tools

Ensure you have the following installed on your system:

- **[mkcert](https://github.com/FiloSottile/mkcert):** For generating locally trusted development certificates.
- **[mise](https://mise.jdx.dev/):** (Optional but Recommended) To manage runtime versions via the `.tool-versions` file.

**Required Versions:**
- **Node.js**: v24+
- **pnpm**: v10+

### 2. DNS Configuration (Hosts File)

Individual applications within this platform may require custom local domains for development. You must map these domains to your local loopback address (`127.0.0.1`) in your system's `hosts` file.

**Current Required Mappings:**

| Application | Local Domain                |
|-------------|-----------------------------|
| `dnd-mapp`  | `localhost.www.dndmapp.dev` |

**File Locations:**
- **Windows:** `C:\Windows\System32\drivers\etc\hosts` (Run Notepad as Administrator)
- **macOS / Linux:** `/etc/hosts` (Use `sudo nano /etc/hosts`)

Add the following line to the file:

```text
127.0.0.1 localhost.www.dndmapp.dev
```

### 3. Environment Configuration

If using `mise`, run:

```bash
mise install
```

Otherwise, verify your versions manually:

```bash
node --version # Expected: v24.x.x
pnpm --version # Expected: v10.x.x
```

### 4. Local HTTPS Setup

To serve applications securely, generate the required SSL certificates using the built-in script:

1. **Install the local CA** (first time only):
   ```bash
   mkcert -install
   ```

2. **Generate Certificates:**
   ```bash
   pnpm gen:ssl-cert
   ```

> [!IMPORTANT]
> This command generates `ssl-key.pem` and `sll-cert.pem` in the root. Git ignores these. Do not commit these files.

---

## 🛠 Getting Started

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dnd-mapp/dma-platform.git
   cd dma-platform
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Serve the Application:**

   ```bash
   npx nx serve dnd-mapp
   ```

---

## 📝 License

This project is private and proprietary. It is **unlicensed** and not intended for public distribution or use. The author reserves all rights.
