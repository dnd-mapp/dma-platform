# D&D Mapp Platform: auth-client

The official Identity and Access Management (IAM) frontend for the D&D Mapp Platform.

## 🚀 Overview

`auth-client` is a dedicated Angular application that handles all user authentication flows (Login, Registration, Password Recovery) for the D&D Mapp ecosystem.

*   **Runtime:** Nginx 1.29.4
*   **Port:** 4300
*   **Routing:** Optimized for Angular SPA routing.
*   **Security:** Environment-agnostic build designed for deployment behind a secure reverse proxy.

## 🛠 Usage

### Docker CLI

To pull and run the latest version:

```bash
docker run -d -p 4300:4300 --name dnd-mapp dndmapp/auth-client
```

### Docker Compose

```yaml
name: dnd-mapp
services:
    dnd-mapp:
        image: dndmapp/auth-client
        container_name: auth-client
        restart: unless-stopped
        ports:
            - '4300:4300'
```

## 🌐 Deployment Configuration

### Configuration

This image is designed to be completely environment-agnostic.

- **No Runtime Config:** There are no environment variables required to run this container.
- **No Build-time Baking:** The application does not contain environment-specific configurations baked in during the build process, allowing the same image to be promoted from Development to Staging and Production without modification.

### Reverse Proxy & SSL

The image serves HTTP traffic on port **4300**. It is intended to sit behind a reverse proxy (e.g., Nginx, Traefik, or Caddy) which handles:
- SSL/TLS Termination.
- Domain name mapping.
- Global routing rules.

## 🤝 Support & Feedback

If you encounter issues or have feature requests, please report them via our GitHub repository:

👉 [D&D Mapp Platform Issue Tracker](https://github.com/dnd-mapp/dma-platform/issues)

Detailed technical documentation and ADRs can be found in the [docs folder](https://github.com/dnd-mapp/dma-platform/tree/main/docs) of the main repository.

## 📝 License

**Proprietary and Private.** This image is unlicensed and not intended for public distribution or use. The author reserves all rights.
