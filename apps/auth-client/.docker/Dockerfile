FROM --platform="$BUILDPLATFORM" dhi.io/node:24.13.0-dev AS builder

RUN corepack enable

WORKDIR /dma-platform

COPY package.json pnpm-*.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm exec nx build auth-client


FROM dhi.io/nginx:1.29.4

WORKDIR /usr/share/nginx/html

COPY --from=builder /dma-platform/dist/apps/auth-client/browser .

COPY apps/auth-client/.docker/nginx.conf /etc/nginx/conf.d/default.conf

USER nginx

EXPOSE 4300

CMD ["-g", "daemon off;"]
