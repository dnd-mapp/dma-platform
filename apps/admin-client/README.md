# admin-client

The administrative dashboard for the DMA Platform. This application provides a unified interface for system administrators to manage the platform's infrastructure, security, and game data.

## 🚀 Key Features

- **System Configuration:** Dynamic configuration of backend services (Auth, Resources, Players, and API Gateway).
- **Log Inspection:** Centralized view of system logs for monitoring and debugging.
- **Resource Management:** CRUD operations for core D&D 5e data (Races, Spells, Classes, Items, etc.).
- **User & Access Control:** Manage user accounts, roles, and granular permissions.
- **Security Operations:** Management and rotation of signing and encryption keys.

## 🛠 Tech Stack

- **Framework:** [Angular](https://angular.io)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Unit Testing:** [Vitest](https://vitest.dev) (In-browser testing enabled via @analogjs/vitest-angular)
- **E2E Testing:** [Playwright](https://playwright.dev)

## 💻 Development

### Run the App
To start the development server:

```bash
pnpm exec nx serve admin-client
```
The app will be available at `https://localhost.admin.dndmapp.dev:4400`.

### Runtime Configuration

Like the main platform, this app uses a runtime configuration strategy. The configuration is typically fetched from `assets/config/config.json` at startup.

## 🧪 Testing

### Unit & Integration Tests

```bash
pnpm exec nx test admin-client
```

### End-to-End Tests

```bash
pnpm exec nx e2e admin-client-e2e
```

## 🏗 Architecture Notes

- **Access Control:** This application is strictly for internal use. It interfaces heavily with the `auth-server` to enforce administrative role requirements.
- **Testing Strategy:** Uses @analogjs strictly for custom Vitest configuration to allow for browser-based unit testing.
- **Audit Logging:** Every administrative action performed through this client is designed to be logged via the backend for security auditing.

## 🐳 Containerization

To build the production bundle:

```bash
pnpm exec nx build admin-client
```

The output will be located in `dist/apps/admin-client`.
