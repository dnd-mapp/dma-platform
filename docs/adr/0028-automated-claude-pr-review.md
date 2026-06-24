# ADR 0028: Automated Claude PR review

- **Status:** Accepted
- **Date:** 2026-06-24

## Context

PR review today is entirely manual. Every PR waits for a human reviewer to catch bugs, flag convention violations, and check scope. An automated first-pass review running on every PR reduces reviewer load and catches issues earlier — before a human even opens the diff.

Three implementation approaches were considered:

- **Third-party GitHub App** (e.g., CodeRabbit, Ellipsis) — zero infrastructure, but opaque prompts, no control over what gets reviewed or how findings are framed.
- **Direct Anthropic API calls in a workflow script** — full control, but requires manually constructing the diff payload, managing inline comment positions, and wiring all context by hand.
- **Claude Code CLI via OAuth token** — Claude Code runs non-interactively in the workflow with file-reading and Bash tools available. It fetches the diff, reads the codebase, calls `gh api` to post the review. No bespoke API scaffolding needed.

## Decision

Automated PR review runs as a GitHub Actions workflow that invokes Claude Code with a long-lived OAuth token (`CLAUDE_CODE_OAUTH_TOKEN` secret). Claude Code drives the entire review: reading the diff, loading context, applying the relevant checklists from `docs/agents/pull-request-review.md` and `docs/agents/pr-review/`, and posting a formal GitHub Review via `gh api`.

### Trigger and exclusions

The workflow triggers on `pull_request` events (`opened`, `synchronize`, `reopened`). Two categories of PRs are skipped:

- **Bot PRs** — any PR where `github.actor` matches a known bot (e.g. `dependabot[bot]`). Bot-created PRs contain no authored code to review.
- **Release PRs** — branches matching `release/**` (ADR 0020). These contain only a version bump and CHANGELOG promotion; there is no logic to review.

### Cancellation

The workflow uses `concurrency: cancel-in-progress: true` scoped to the PR ref. If new commits are pushed while a review is running, the in-flight job is cancelled and a fresh job starts, ensuring Claude only ever reviews against the latest state.

### Incremental reviews

On the initial review of a PR, Claude reviews the full diff from the base branch to `HEAD`. On subsequent pushes, Claude reads its own most recent review body to extract the previously-reviewed commit SHA and reviews only the commits from that SHA to the new `HEAD`.

The last-reviewed SHA is recorded visibly in the main review body — not a hidden marker. Contributors and the PR author can see exactly which commits have been reviewed and which have not. The review body is updated on every run.

### Review format

Claude posts a **formal GitHub Review** using the GitHub Reviews API. The verdict is always `COMMENT` — never `APPROVE` or `REQUEST_CHANGES`. This keeps the review purely advisory: it never blocks merge and never requires dismissal.

Findings appear as **inline line comments** on the specific lines they refer to. The main review body contains a summary and the reviewed-commit-range marker.

`COMMENT` is chosen over `REQUEST_CHANGES` deliberately. A bot blocking a merge on a false positive creates friction that erodes trust in the tool. Human reviewers remain the gate.

### Review focus

Claude applies the checklists in `docs/agents/pull-request-review.md`. It uses the quick checklist for all PRs and selects specialist checklists from `docs/agents/pr-review/` based on which paths are changed. Comment labels (`Blocking:`, `Suggestion:`, `Question:`, `Nit:`, `Praise:`) follow the conventions in `pull-request-review.md`.

### Model and effort

Claude Code runs with `--model claude-sonnet-4-6` and extended thinking enabled at high budget. Sonnet 4.6 is the right balance of depth and cost for routine review. Extended thinking is enabled because PR review benefits from multi-step reasoning over the diff and its surrounding context — catching subtle logic errors requires more than a surface scan.

### Context provided to Claude

Claude receives:

- **Full repo checkout** — it reads any file it needs to understand context around changed lines.
- **Diff** — only the commits not yet reviewed (new commits since the last-reviewed SHA, or the full base-to-HEAD diff on first review), excluding `pnpm-lock.yaml` and `**/CHANGELOG.md`.
- **Domain context** — `CONTEXT-MAP.md` and the relevant `CONTEXT.md` file(s) for the paths touched, so Claude uses correct domain language when commenting.
- **ADRs** — Claude selects relevant ADRs based on what the diff touches (e.g. if the diff changes a moon task, it reads the moon ADRs). It does not receive all ADRs unconditionally.
- **PR metadata** — title, description, and linked issue content (fetched via `gh issue view`). This lets Claude evaluate whether the change actually solves the stated problem and flag scope drift.

`pnpm-lock.yaml` and `**/CHANGELOG.md` are excluded from the diff unconditionally. Lock file changes carry no review signal. CHANGELOG entries are auto-managed by the release script (ADR 0020).

### Large diffs

There is no hard size gate. If the diff is unusually large (heuristically, more than 1000 lines changed), Claude notes this in the review body and indicates that findings may be incomplete. A hard cap would skip review on exactly the PRs most likely to benefit from it.

### Posting identity

The review is posted by the organisation's GitHub App, authenticated via an installation token minted with `actions/create-github-app-token`. The App requires the `pull-requests: write` permission. Using a named App identity — rather than `github-actions[bot]` — makes it unambiguous when querying existing reviews to find the last-reviewed SHA, and gives the review a recognisable presence in the PR timeline.

## Consequences

- Every non-bot, non-release PR receives an automated first-pass review before a human looks at it.
- The `COMMENT`-only verdict means the bot never blocks a merge. Human reviewers remain the final gate.
- The incremental model means contributors get feedback on new commits without re-reviewing what was already covered. The visible SHA marker makes coverage transparent.
- Extended thinking on Sonnet 4.6 adds per-review cost. For very large PRs this is non-trivial, but the warn-and-continue approach keeps the workflow from silently skipping large changes.
- The org GitHub App needs `pull-requests: write` granted — a one-time configuration step.
- The `CLAUDE_CODE_OAUTH_TOKEN` secret must be rotated when the underlying token expires. A dedicated service account or App-based token is preferable long-term.
