# backend-core

The `backend-core` library houses the reusable **NestJS-specific** building blocks for the D&D Mapp Platform's server-side architecture.

## 🏗️ Architecture

This library contains components that are tightly coupled with the NestJS framework and its Dependency Injection (DI) system.

### Content

- **Modules:** Shared feature modules (e.g., DatabaseModule).
- **Services:** Reusable providers that utilize `@Injectable()`.
- **Repositories:** Base classes for data access using Prisma.
- **Decorators/Guards:** Custom NestJS-specific logic for request handling.

## 📦 Usage

Since this library utilizes NestJS decorators, it must only be imported by other NestJS applications or libraries. It is **not** compatible with pure TypeScript scripts (like Prisma seeds) that do not have the NestJS runtime context.

```typescript
import { DatabaseService } from '@dnd-mapp/backend-core';
```

## 🧪 Testing

Unit tests are powered by Vitest using the standard platform bridge.

- **Command:** `nx test backend-core`
