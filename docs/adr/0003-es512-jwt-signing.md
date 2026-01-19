# ADR 0003: Use ES512 for JWT Signing

-   **Status:** Accepted
-   **Date:** 2026-01-20
-   **Decider:** Oscar

## Context

We need a secure method for signing JWTs that supports a future roadmap of key rotation and per-client signing keys.

## Decision

Use **ES512** (ECDSA using P-521 and SHA-512).

## Consequences
-   **Good:** Higher security-to-key-size ratio than RSA.
-   **Good:** Provides a path for per-client asymmetric signing.
-   **Bad:** Requires an external bootstrap step to generate keys (openssl) before the app starts.
-   **Note:** Native `crypto` in Node.js handles ES512 efficiently.
