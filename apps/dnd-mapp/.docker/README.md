# D&D Mapp Platform: dnd-mapp

The official container image for the `dnd-mapp` web application. This image serves as the primary Angular frontend for the D&D Mapp ecosystem.

## 🚀 Overview

This image provides a lightweight, Nginx-backed production build of the Angular application. It is designed to be environment-agnostic and is suitable for deployment in Development, Staging, and Production environments.

*   **Runtime:** Nginx 1.29.4
*   **Default Port:** 4200
*   **Routing:** Pre-configured for Angular SPA (Single Page Application) routing.
*   **Optimization:** Multi-stage build based on Node 24, resulting in a minimal footprint without debugging tools.

## 🛠 Usage

### Docker CLI

To pull and run the latest version:

```bash
docker run -d -p 4200:4200 --name dnd-mapp dndmapp/dnd-mapp
```

### Docker Compose

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

## 🌐 Deployment Configuration

### Configuration

This image is designed to be completely environment-agnostic.

- **No Runtime Config:** There are no environment variables required to run this container.
- **No Build-time Baking:** The application does not contain environment-specific configurations baked in during the build process, allowing the same image to be promoted from Development to Staging and Production without modification.

### Reverse Proxy & SSL

The image serves HTTP traffic on port **4200**. It is intended to sit behind a reverse proxy (e.g., Nginx, Traefik, or Caddy) which handles:
- SSL/TLS Termination.
- Domain name mapping.
- Global routing rules.

## 🤝 Support & Feedback

If you encounter issues or have feature requests, please report them via our GitHub repository:

👉 [D&D Mapp Platform Issue Tracker](https://github.com/dnd-mapp/dma-platform/issues)

Detailed technical documentation and ADRs can be found in the [docs folder](https://github.com/dnd-mapp/dma-platform/tree/main/docs) of the main repository.

## 📝 License

**Proprietary and Private.** This image is unlicensed and not intended for public distribution or use. The author reserves all rights.
