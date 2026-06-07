# dndmapp/realm

[![Docker Pulls](https://img.shields.io/docker/pulls/dndmapp/realm)](https://hub.docker.com/r/dndmapp/realm)
[![CI](https://img.shields.io/github/actions/workflow/status/dnd-mapp/dma-platform/push-main.yml?label=CI)](https://github.com/dnd-mapp/dma-platform/actions/workflows/push-main.yml)
[![License: MIT](https://img.shields.io/github/license/dnd-mapp/dma-platform)](https://github.com/dnd-mapp/dma-platform/blob/main/LICENSE)

Angular SPA for D&D Mapp, served by nginx on port 4000. Part of the D&D Mapp stack — authentication and API calls require Gatekeeper and other companion services to function.

**Source:** [dnd-mapp/dma-platform](https://github.com/dnd-mapp/dma-platform)

## Tags

| Tag          | Description                                                                |
|:-------------|:---------------------------------------------------------------------------|
| `next`       | Latest build from `main` — use this for deployments                        |
| `pr-{N}`     | Ephemeral build for PR #N — CI-only, do not use in production              |
| `buildcache` | Internal BuildKit cache layer, not a runnable image — do not pull directly |

## Configuration

Runtime configuration is supplied by mounting a `config.json` file into the container:

```text
/usr/share/nginx/html/config.json
```

### Schema

| Key | Type | Required | Description                                                                            |
|:----|:-----|:---------|:---------------------------------------------------------------------------------------|
| —   | —    | —        | No configuration keys yet — this table will grow as backend services are containerised |

Minimal example:

```json
{}
```

## Quick start

> [!NOTE]
> Realm requires Gatekeeper and other companion services to function. A minimal `{}` config is enough to serve the SPA, but authentication and API calls will fail without them.

**docker run:**

```sh
docker run -p 4000:4000 \
  --name realm \
  --restart unless-stopped \
  -v ./config.json:/usr/share/nginx/html/config.json:ro \
  dndmapp/realm:next
```

**Compose snippet (Realm only):**

```yaml
services:
  realm:
    image: dndmapp/realm:next
    container_name: realm
    restart: unless-stopped
    ports:
      - "4000:4000"
    volumes:
      - ./config.json:/usr/share/nginx/html/config.json:ro
```

## Building from source

See [Building the Docker image](https://github.com/dnd-mapp/dma-platform/blob/main/apps/realm/README.md#building-the-docker-image) in the source repository.
