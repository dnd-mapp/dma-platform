# ADR 0024: GitHub API bot signing for release tags

- **Status:** Accepted
- **Date:** 2026-06-08

## Context

Release tags created by the `release-merge` workflow (ADR 0020) need to be signed to prevent supply-chain impersonation and provide tamper-evidence.

Three approaches were considered:

- **Long-lived GPG/SSH key stored as a GitHub Actions secret** — classical, verifiable with plain `git verify-tag`, but requires key generation, storage, rotation, and revocation management.

- **Sigstore/Gitsign (keyless)** — ephemeral certificate via GitHub's OIDC token; signatures logged in the Rekor transparency log; independent audit trail. Requires installing the `gitsign` binary and using `gitsign verify-tag` for verification.

- **GitHub API bot signing** — create the tag object via the GitHub Git Tags API authenticated as `github-actions[bot]`; GitHub marks the tag as **Verified** server-side per its bot signature verification policy. No external tooling, no key management, no additional permissions.

## Decision

Use the GitHub API to create release tags authenticated as `github-actions[bot]` (`GITHUB_TOKEN`). Two API calls replace `git tag` + `git push`: one to create the annotated tag object, one to create the ref. GitHub signs the object and marks it as **Verified** in the UI.

Sigstore/Gitsign was ruled out because an independent external audit trail is not required; GitHub's own verification record satisfies the supply-chain and integrity goals.

Tags carry a human-readable message: `Release <name> <version>` (e.g. `Release sigil 1.2.0`).

## Consequences

- No key management or external tooling required.
- The **Verified** badge is visible on the tag in the GitHub UI and via the GitHub API (`/repos/{owner}/{repo}/git/tags/{sha}`).
- Verification is GitHub-internal; there is no independently verifiable cryptographic proof outside of GitHub's infrastructure.
- The workflow requires no permissions beyond the existing `contents: write`.
