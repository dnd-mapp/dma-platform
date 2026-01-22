# backend-utils

The `backend-utils` library provides pure TypeScript functions, interfaces, and utilities specifically designed to run in a **Node.js environment**.

## 🏗️ Principles

- **Environment-Specific:** Unlike `shared-utils`, this library *can* use Node.js built-ins (e.g., `crypto`, `fs`, `path`) and server-side dependencies.
- **Backend Only:** This library must **never** be imported by Angular applications.
- **Portability:** Functions here are shared across all NestJS applications and Node-based tools in the monorepo.

## 📦 Usage

### Example (Security/Crypto)

```typescript
import { hashPassword } from '@dnd-mapp/backend-utils';

const hash = await hashPassword('my-secure-password', pepper);
```

## 🧪 Testing

Unit tests are powered by Vitest in a Node environment.

- **Command:** `nx test backend-utils`

## 📁 Categorization

Common utilities are included here:

- **Security:** Argon2/Bcrypt wrappers, ES512 key loading logic.
- **Filesystem:** Log rotation helpers, configuration loaders.
- **Database:** Prisma-specific transformers and pagination helpers.
- **Middleware:** Shared NestJS-compatible utility logic.