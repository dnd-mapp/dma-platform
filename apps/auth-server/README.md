# Auth Server

The **Auth Server** is a NestJS-based microservice responsible for identity management, authentication, and authorization across the D&D Mapp ecosystem.

## 🔑 Responsibilities

- **Identity Management:** User registration, profile updates, and account lifecycle.
- **Authentication:** Issuing and validating JWTs (Access & Refresh tokens).
- **Security:** Password hashing (Argon2/Bcrypt) and multifactor authentication logic.
- **Permissions:** Managing user roles (Player, Dungeon Master, Admin) to be consumed by other services.

## 🛠 Tech Stack

- **Framework:** [NestJS](https://nestjs.com/)
- **Language:** TypeScript
- **Validation:** `class-validator` and `class-transformer`.
- **Testing:** Jest for unit/integration tests.

## 🚀 Getting Started

### Prerequisites

Ensure the root workspace has been configured with SSL certificates, as this server is designed to communicate over HTTPS.

### Running the Server

From the workspace root, run:

```bash
pnpm nx serve auth-server
```

### Environment Variables

Create a `.env` file (or update your workspace-wide environment configuration) with the following:
- `JWT_SECRET`: Secret key for signing tokens.
- `DATABASE_URL`: Connection string for the identity database.
- `AUTH_PORT`: Local port (defaults to your gateway's expected upstream port).

## 📡 API Endpoints (Summary)

| Method  | Endpoint         | Description                                       |
|:--------|:-----------------|:--------------------------------------------------|
| `POST`  | `/auth/register` | Create a new user account.                        |
| `POST`  | `/auth/login`    | Authenticate and receive tokens.                  |
| `POST`  | `/auth/refresh`  | Exchange a refresh token for a new access token.  |
| `GET`   | `/auth/profile`  | Retrieve the currently authenticated user's data. |
| `PATCH` | `/auth/password` | Update account credentials.                       |

## 🔗 Internal Dependencies

This service relies on shared libraries within the monorepo:
- `libs/api-interfaces`: For shared DTOs used by both the `auth-server` and `auth-client`.
- `libs/shared/utils`: For common hashing or logging utilities.

## 🐳 Deployment

This service is containerized via a Dockerfile and is intended to be deployed as a pod within the Kubernetes cluster. It is usually shielded by the `api-gateway` in production environments.

## 🧪 Testing

```bash
# Unit tests
pnpm nx test auth-server

# Integration tests
pnpm nx e2e auth-server-e2e
```
