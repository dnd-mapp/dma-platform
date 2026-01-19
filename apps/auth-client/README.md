# 🔐 auth-client (Identity Management)

This is the primary authentication and authorization application for the D&D Mapp Platform. It manages the entire user lifecycle, including registration, authentication, and account self-service.

## 🎯 Purpose

By isolating authentication into a dedicated application, we ensure:

- **Centralized Security:** A single, hardened codebase for handling sensitive user data.
- **SSO Foundation:** Shared session management across the `dma-platform` ecosystem.
- **UI Consistency:** Reusable account management views without duplicating logic in feature apps.

---

## 🚀 Local Development

To serve the authentication client locally:

```bash
npx nx serve auth-client
```

### Required Configuration

Ensure your [Local SSL & DNS](../../docs/dev/ssl-dns-setup.md) is configured to include the mapping for this application.

| Application   | Local Domain                 |
|---------------|------------------------------|
| `auth-client` | `localhost.auth.dndmapp.dev` |

---

## 🏗️ Technical Overview

- **Framework:** Angular (v21+)
- **Shared Components:** Consumes `@dnd-mapp/shared-ui` for layout and forms.
- **Testing:**
    - Unit: `nx test auth-client` (Vitest)
    - E2E: `nx e2e auth-client-e2e` (Playwright)

---

## 📁 Key Features

- **Authentication:** Sign-up, Log-in, Multi-factor Authentication.
- **Recovery:** Password reset and account recovery flows.
- **Profile:** User profile management and account settings.
