# dndmapp/realm

Angular SPA for D&D Mapp, served by nginx on port 4000.

## Tags

| Tag          | Description                                                   |
|--------------|---------------------------------------------------------------|
| `next`       | Latest build from `main` — use this for deployments           |
| `pr-{N}`     | Ephemeral build for PR #N — CI-only, do not use in production |
| `buildcache` | Internal BuildKit cache layer — do not pull                   |

## Configuration

Runtime configuration is supplied by mounting a `config.json` file into the container:

```text
/usr/share/nginx/html/config.json
```

### Schema

| Key | Type | Required | Description                                                                            |
|-----|------|----------|----------------------------------------------------------------------------------------|
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

Prerequisites: Docker with BuildKit enabled, repository cloned.

```sh
docker buildx bake -f .docker/bake.hcl realm
```

The bake target builds for `linux/amd64` and `linux/arm64` by default. To restrict to a single platform for local development:

```sh
docker buildx bake -f .docker/bake.hcl realm --set realm.platforms=linux/amd64
```
