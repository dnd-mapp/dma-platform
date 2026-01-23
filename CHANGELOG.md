# Changelog

All notable changes to the **D&D Mapp Platform** will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### ✨ Added

- **Library:** Created `shared-ui` library to centralize reusable Angular components and pages.
- **Library:** Implemented secondary entry points for lazy-loading (`@dnd-mapp/shared-ui/pages/*`).
- **Testing:** Added `@dnd-mapp/shared-ui/test` entry point for component harnesses and shared test utilities.
- **Application:** Created `auth-client` for centralized Identity and Access Management (IAM).
- **Infrastructure:** Containerized `auth-client` with Nginx and Docker.
- **Documentation:** Added `auth-client` to SSL/DNS setup and workspace architecture guides.
- **Application:** Created `auth-server` (NestJS) for centralized authentication and token management.
- **Documentation:** Added `auth-server` to Architecture and SSL/DNS guides.
- **Library:** Created `auth-ui` (@dnd-mapp/auth-ui) to centralize identity services and authentication components.
- **Infrastructure:** Added ESLint boundary rules to allow apps to consume `auth-ui` while maintaining isolation for `shared-ui`.
- **Library:** Created `shared-utils` (@dnd-mapp/shared-utils) for platform-agnostic TypeScript helpers.
- **Infrastructure:** Enforced "Leaf Dependency" status for `shared-utils` via ESLint to ensure zero circular dependencies.
- **Library:** Created `backend-utils` (@dnd-mapp/backend-utils) for server-side TypeScript utilities.
- **Infrastructure:** Configured ESLint boundaries to prevent `backend-utils` from being imported into Angular applications.
- **Library:** Created `auth-domain` (@dnd-mapp/auth-domain) to house shared DTOs and data models.
- **Infrastructure:** Integrated `class-validator` and `class-transformer` for cross-platform data validation.
- **CI/CD:** Enforced boundary rules allowing `auth-domain` to be shared between NestJS and Angular projects.

### ⚙️ Changed

- **SSL/DNS:** Updated local development requirements to include `localhost.auth.dndmapp.dev`.
- **Infrastructure:** Added `.gitattributes` to enforce consistent LF line endings across all platforms and optimize GitHub language statistics.

### ⚠️ Deprecated

- (Soon-to-be-removed features)

### 🗑️ Removed

- (Now-removed features)

### 🐛 Fixed

- (Any bug fixes)

### 🛡️ Security

- (Vulnerability fixes or security hardening)

---

## [1.0.0] - 2026-01-18

### ✨ Added

- **Core Platform:** Initialized Nx Monorepo with `pnpm` v10 and `node` v24.
- **Web App:** `dnd-mapp` Angular application with Tailwind CSS integration.
- **Dev Tooling:** Automated SSL certificate generation and local DNS mapping.
- **Testing:** Vitest bridge for Angular unit testing and Playwright for E2E.
- **Documentation:** Centralized `/docs` hub including ADRs (Architecture Decision Records).
- **Infrastructure:** Containerized the `dnd-mapp` application using Docker.

### ⚙️ Changed

- Reorganized project structure from a single-repo feel to a scalable Monorepo layout.

### 🛡️ Security

- Configured `mkcert` workflow for trusted local HTTPS development.

---
