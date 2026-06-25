---
name: pr-review
description: >
    Reviews a GitHub pull request and posts a formal GitHub Review with inline
    comments. Reads the diff (BASE_SHA..HEAD_SHA), loads relevant CONTEXT.md
    files, ADRs, and checklists from docs/agents/pr-review/, then posts a single
    COMMENT-event review via the GitHub API. Use this skill when running in the
    pull-request GitHub Actions workflow with PR_NUMBER, REPO, BASE_SHA, and
    HEAD_SHA set as environment variables.
allowed-tools:
    - Bash
    - Read
    - Write
---

# PR Review

You are an automated PR reviewer running in a GitHub Actions workflow. Work through the steps below in order. Track your progress using the checklist:

```text
Progress:
- [ ] Step 1: PR metadata and linked issues gathered
- [ ] Step 2: Diff obtained and line count measured
- [ ] Step 3: Review documentation loaded
- [ ] Step 4: CONTEXT.md files loaded
- [ ] Step 5: Relevant ADRs loaded
- [ ] Step 6: Review complete, findings recorded
- [ ] Step 7: Review body written
- [ ] Step 8: Inline comment files written
- [ ] Step 9: Payload built and review posted
```

## Environment

The following environment variables are set:

- `PR_NUMBER` — pull request number
- `REPO` — GitHub repository (e.g. `org/repo`)
- `BASE_SHA` — base commit SHA
- `HEAD_SHA` — head commit SHA

## Gotchas

- `.review/comments/` already exists via a `.gitkeep` file — do not create it.
- When reading comment files, filter for `.md` only — `.gitkeep` must be ignored.
- Always exclude `pnpm-lock.yaml` and `**/CHANGELOG.md` from the diff — these carry no review signal.
- Post exactly **one** review. Do not call the reviews API more than once.
- Check the build script's exit code and output before posting. If it exits non-zero, do not proceed.

---

## Step 1 — Gather PR metadata and linked issues

```bash
gh pr view $PR_NUMBER --repo $REPO --json title,body,author
```

Parse the PR body for issue references matching `Closes #N`, `Fixes #N`, or `Resolves #N` (case-insensitive). For each N:

```bash
gh issue view N --repo $REPO
```

Note the PR title, author, description, and all linked issue details for use throughout the review.

---

## Step 2 — Get and measure the diff

Run both commands:

```bash
git diff $BASE_SHA $HEAD_SHA -- ':!pnpm-lock.yaml' ':!**/CHANGELOG.md'
```

```bash
git diff --name-only $BASE_SHA $HEAD_SHA -- ':!pnpm-lock.yaml' ':!**/CHANGELOG.md'
```

Count total lines changed (added and removed). If the count exceeds 1000, note this in the review body but continue reviewing.

---

## Step 3 — Load review documentation

Always read:

- `docs/agents/pull-request-review.md`
- `CONTEXT-MAP.md`
- `docs/agents/pr-review/quality.md`
- `docs/agents/pr-review/process.md`

Based on the changed file paths from Step 2, conditionally read:

- Any frontend paths (Angular components, CSS, Storybook, `arcane-ui`, Realm UI code) → `docs/agents/pr-review/frontend.md`
- Any backend/API paths (NestJS controllers, services, database, `gatekeeper`, Realm server code) → `docs/agents/pr-review/backend.md`
- Any CI/CD, Docker, config, or deployment paths (`.github/`, `.docker/`, `.moon/`, config files) → `docs/agents/pr-review/operations.md`

---

## Step 4 — Load CONTEXT.md files

Based on the changed paths, read:

- Any file under `apps/realm/` → `apps/realm/CONTEXT.md`
- Any file under `apps/gatekeeper/` → `apps/gatekeeper/CONTEXT.md`
- Any file under `packages/sigil/` → `packages/sigil/CONTEXT.md`
- Any file under `packages/arcane-ui/` → `packages/arcane-ui/CONTEXT.md`

If any of the above apply, also read the root `CONTEXT.md`.

---

## Step 5 — Load relevant ADRs

List `docs/adr/` and read only the ADRs relevant to what the diff touches:

| What the diff touches                                 | ADRs to read     |
|:------------------------------------------------------|:-----------------|
| Moon task files (`.moon/`, `moon.yml`, `**/moon.yml`) | 0008, 0022, 0023 |
| Docker or containerisation                            | 0023, 0025       |
| GitHub Actions workflows                              | 0005, 0024, 0028 |
| Package additions or changes                          | 0013, 0018       |
| Release or versioning                                 | 0019, 0020       |
| Design tokens                                         | 0007             |
| Component split patterns                              | 0027             |
| `.claude/skills/pr-review/` changes                   | 0028             |

---

## Step 6 — Review

Apply the quick checklist from `pull-request-review.md` universally. Apply the specialist checklists you loaded selectively based on what changed.

For each finding, record:

- **path**: relative file path from repo root
- **line**: line number in the **new** version of the file
- **side**: `RIGHT` for added/context lines, `LEFT` for removed lines
- **body**: comment body prefixed with the appropriate label — `Blocking:`, `Suggestion:`, `Question:`, `Nit:`, or `Praise:`

Non-line-specific findings go in the main review body.

---

## Step 7 — Write the review body

Write the review body to `.review/body.md` as plain Markdown. Include:

1. A brief summary of the change based on the PR metadata and diff
2. Any non-line-specific findings
3. If the diff exceeded 1000 lines: `> **Warning:** This diff exceeded 1000 lines. Findings may be incomplete.`
4. A final line in exactly this format (substitute the actual SHA values from the environment):

```text
**Commits reviewed:** `<BASE_SHA>`..`<HEAD_SHA>`
```

---

## Step 8 — Write inline comments

Write each inline comment as a separate file in `.review/comments/<slug>.md`.

Each file has YAML frontmatter followed by the comment body:

```markdown
---
path: relative/path/to/file.ts
line: 42
side: RIGHT
---

Blocking: this endpoint allows any authenticated user to update this record.
Can we add an ownership or role check before performing the update?
```

Use a short descriptive slug for each filename (e.g. `auth-ownership-check.md`). Write one file per comment. If there are no inline comments, skip this step.

---

## Step 9 — Build payload and post

Run the build script:

```bash
node .claude/skills/pr-review/build-review.js
```

Expected output on success:

```text
Written payload to .review/payload.json (N inline comment(s))
```

If the script exits with a non-zero code, do not proceed — check that `.review/body.md` exists and `HEAD_SHA` is set.

Post the review:

```bash
gh api repos/$REPO/pulls/$PR_NUMBER/reviews --method POST --input .review/payload.json
```

Post exactly one review. Done.
