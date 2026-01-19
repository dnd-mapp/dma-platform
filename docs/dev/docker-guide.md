[← Back to Docs](../README.md) | **Category:** Developer Hub

---

# 🐳 Docker Configuration

The `dnd-mapp` application is containerized to ensure consistent deployments across remote development, staging, and production environments.

## 🏗️ Architecture

We use a **Multi-stage Build** to keep the production image lean:
 
1. **Builder Stage:** Uses `node:24.13.0`, enables `corepack` for `pnpm`, and uses `nx build` to generate the production bundles.
2.  **Runner Stage:** Uses `nginx:1.29.4` to serve the static assets. It includes a custom `nginx.conf` to support Angular's client-side routing.

## 📄 Nginx & Routing

Since Angular is a Single Page Application (SPA), Nginx is configured to redirect all 404 attempts back to `index.html`. This allows Angular's router to handle the deep links.

-   **Internal Port:** 4200
-   **Config Location:** `apps/dnd-mapp/.docker/nginx.conf`

## 🚀 Building and Running

### 1. Build the Image

Run this from the **repository root**:

```bash
docker build -t dndmapp/dnd-mapp -f apps/dnd-mapp/Dockerfile .
```

### 2. Run with Docker Compose

A `docker-compose.yaml` is provided for quick orchestration.

```yaml
name: dnd-mapp
services:
    dnd-mapp:
        image: dndmapp/dnd-mapp
        container_name: dnd-mapp
        restart: unless-stopped
        ports:
            - '4200:4200'
```

Launch the container:

```bash
docker compose up -d
```

## 🌐 Networking & SSL

**Note:** The Docker container itself does not handle SSL or custom DNS (`localhost.www.dndmapp.dev`).

-   **Local Development:** We recommend the [Native Setup](./ssl-dns-setup.md) for local development to utilize `mkcert` and local HMR (Hot Module Replacement).
-   **Remote/Staging/Prod:** The container is designed to sit behind a **Reverse Proxy** (e.g., Nginx, Traefik, or Caddy). The proxy is responsible for:
    -   Terminating SSL/TLS.
    -   Forwarding traffic to the container on port `4200`.
    -   Handling domain-level routing.

## 🛠 Troubleshooting

If the application loads but refreshing the page results in a 404, verify that the `nginx.conf` was correctly copied into `/etc/nginx/conf.d/default.conf` during the build stage.
