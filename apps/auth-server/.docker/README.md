# D&D Mapp Platform: auth-server

The backend Identity and Access Management (IAM) service for the D&D Mapp Platform.

## 🚀 Overview

A high-performance NestJS API providing secure authentication, token rotation, and user management.

*   **Runtime:** Node.js 24 (distroless/dev-base)
*   **Port:** 4350
*   **Database:** MariaDB (via Prisma)

## 🛠 Usage

```bash
docker run -d -p 4350:4350 \
  -e DATABASE_URL="mysql://..." \
  --name auth-server dndmapp/auth-server
```

## 🌐 Deployment

This container serves the API over HTTP (port 4350). In production, it must be deployed behind a reverse proxy for SSL termination and secure header management.
