# auth-domain

The `auth-domain` library contains the shared data models, DTOs (Data Transfer Objects), and interfaces for authentication and identity management across the D&D Mapp Platform.

## 🏗️ Architecture

This library acts as the contract between the `auth-server` (NestJS) and the various clients (`auth-client`, `dnd-mapp`).

### Shared Validation

Classes in this library use decorators from **`class-validator`** and **`class-transformer`**.

- **Backend:** NestJS uses these models with the `ValidationPipe` to automatically validate incoming request bodies and query parameters.
- **Frontend:** Angular applications can use these models to ensure data structure consistency and perform manual validation if required.
