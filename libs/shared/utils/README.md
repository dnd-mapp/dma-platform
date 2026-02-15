# shared-utils

The `shared-utils` library is a collection of pure, platform-agnostic TypeScript helper functions and utilities used across the entire D&D Mapp Platform.

## 🏗️ Principles

- **Zero Dependencies:** This library should not depend on any framework (Angular/NestJS) or other internal libraries.
- **Pure Functions:** Functions should be deterministic and free of side-effects.
- **Portable:** Since it contains pure TypeScript, it is compatible with both Browser and Node.js runtimes.

## 📦 Usage

### Example

```typescript
import { tryCatchSync } from '@dnd-mapp/shared-utils';

const { data, error } = tryCatchSync(() => someFunctionThatMightThrowErrors());
```

## 📁 Categorization

Common utilities are included here:

- **Formatting:** String manipulation, pluralization helpers.
- **Validation:** Generic data validation (non-domain specific).
- **Collections:** Array and Object transformation helpers.