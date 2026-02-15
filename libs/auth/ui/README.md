# auth-ui

The `auth-ui` library is the domain-specific home for Authentication and Authorization logic, components, and services within the D&D Mapp Platform.

## 🏗️ Architecture

This library provides the bridge between our Angular applications and the `auth-server`.

### Core Features

- **Auth Service:** Centralized logic for JWT management, login/logout, and session state.
- **Silent Refresh:** Logic to handle opaque refresh token rotation on page reload/initialization.
- **Identity Components:** Domain-specific UI like Login/Sign-up buttons and User Profile avatars.
- **Guards & Interceptors:** Angular Route Guards and HTTP Interceptors for automatic token injection.

## 📦 Usage

### Importing Components/Services

```typescript
import { AuthService, LogInButtonComponent } from '@dnd-mapp/auth-ui';
```

## 🎨 Styling

Like other libraries in this monorepo, `auth-ui` is not buildable. It relies on the consuming application's Tailwind configuration.
