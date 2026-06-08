# ── Scaffold stage ─────────────────────────────────────────────────────────────
FROM --platform="$BUILDPLATFORM" node:24.16.0-alpine3.23 AS scaffold

ENV MOON_TOOLCHAIN_FORCE_GLOBALS=true

WORKDIR /app

RUN npm install -g @moonrepo/cli@2.3.0

COPY . .

RUN moon docker scaffold realm


# ── Build stage ────────────────────────────────────────────────────────────────
FROM --platform="$BUILDPLATFORM" node:24.16.0-alpine3.23 AS build

ENV HUSKY="0" \
    CI="true" \
    MOON_TOOLCHAIN_FORCE_GLOBALS=true

WORKDIR /app

RUN npm install -g pnpm@10.34.1 @moonrepo/cli@2.3.0

# Dependency manifests only — this layer is cached until lockfiles change
COPY --from=scaffold /app/.moon/docker/workspace .

RUN moon docker setup

# Source files — copied after install so the above layer stays cached
COPY --from=scaffold /app/.moon/docker/sources .

# moon resolves arcane-ui:build → sigil:build → realm:build
RUN pnpm moon run realm:build


# ── Serve stage ────────────────────────────────────────────────────────────────
FROM nginx:1.31.1-alpine3.23 AS serve

COPY .docker/realm/nginx.conf        /etc/nginx/nginx.conf
COPY .docker/realm/default.conf      /etc/nginx/conf.d/default.conf

COPY --from=build /app/apps/realm/dist/browser /usr/share/nginx/html

RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chown -R nginx:nginx /var/cache/nginx \
    && chown -R nginx:nginx /var/log/nginx

USER nginx

EXPOSE 4000

CMD ["nginx", "-g", "daemon off;"]
