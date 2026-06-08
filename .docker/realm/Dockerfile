# ── Build stage ────────────────────────────────────────────────────────────────
FROM --platform="$BUILDPLATFORM" node:24.16.0-alpine3.23 AS build

ENV HUSKY="0" \
    CI="true"

WORKDIR /app

RUN npm i -g pnpm@10.34.1

# Dependency manifests first — this layer is cached until lockfiles change
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/realm/package.json                  ./apps/realm/
COPY e2e/realm/package.json                   ./e2e/realm/
COPY packages/arcane-ui/package.json          ./packages/arcane-ui/
COPY packages/eslint-config/package.json      ./packages/eslint-config/
COPY packages/release-script/package.json     ./packages/release-script/
COPY packages/sigil/package.json              ./packages/sigil/
COPY packages/stylelint-config/package.json   ./packages/stylelint-config/

RUN pnpm install

# Source — only after install so the above layer stays cached
COPY . .

# moon (installed via pnpm) resolves arcane-ui:build → sigil:build → realm:build
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
