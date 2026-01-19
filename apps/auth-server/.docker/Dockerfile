FROM --platform="$BUILDPLATFORM"  dhi.io/node:24.13.0-dev AS builder

RUN corepack enable

WORKDIR /dma-platform

COPY package.json pnpm-*.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

ENV NODE_ENV="production"

RUN pnpm exec nx build auth-server


FROM --platform="$BUILDPLATFORM"  dhi.io/node:24.13.0-dev AS packager

RUN corepack enable

WORKDIR /dma-platform

COPY --from=builder /dma-platform/dist/apps/auth-server .

RUN pnpm install --frozen-lockfile


FROM dhi.io/node:24.13.0

WORKDIR /dma-platform

COPY --from=packager /dma-platform .

ENV AUTH_SERVER_HOST="0.0.0.0" \
    AUTH_SERVER_PORT="4350"

EXPOSE 4350

CMD ["node", "/dma-platform/main.js"]
