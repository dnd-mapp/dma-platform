# Pull Request Review

## Review Goals

A PR review should answer:

- Does this change solve the intended problem?
- Is the implementation correct?
- Is the code understandable and maintainable?
- Is the change safe to release?
- Are edge cases handled?
- Are tests sufficient?
- Does this introduce security, performance, or operational risks?
- Is the PR focused and easy to reason about?

A review should improve quality without becoming a personal preference exercise.

---

## Quick Checklist

Use this for small or low-risk PRs.

- [ ] Is the intent clear?
- [ ] Is the scope focused?
- [ ] Is the code correct?
- [ ] Are edge cases handled?
- [ ] Are errors handled?
- [ ] Are tests included or updated?
- [ ] Does CI pass?
- [ ] Is the code readable and maintainable?
- [ ] Does it follow existing patterns?
- [ ] Are security concerns addressed?
- [ ] Are performance concerns addressed?
- [ ] Is it backward-compatible?
- [ ] Are docs updated if needed?
- [ ] Is it safe to deploy and roll back?

---

## Specialist Checklists

For detailed checks, consult the relevant files based on what the PR touches:

| Area                                                                                        | File                                               |
|:--------------------------------------------------------------------------------------------|:---------------------------------------------------|
| Correctness, Architecture, Code Quality, Tests, Error Handling, Concurrency, Data Integrity | [pr-review/quality.md](pr-review/quality.md)       |
| Frontend, Accessibility, Internationalization                                               | [pr-review/frontend.md](pr-review/frontend.md)     |
| Backend, API, Database, Performance                                                         | [pr-review/backend.md](pr-review/backend.md)       |
| Security, Observability, Deployment, Config, Dependencies, Compatibility, Privacy           | [pr-review/operations.md](pr-review/operations.md) |
| PR Description, Scope, Git Hygiene, CI/CD, Manual Testing, Code Style                       | [pr-review/process.md](pr-review/process.md)       |

---

## Approval Checklist

### General

- [ ] I understand what this PR does.
- [ ] The PR solves the intended problem.
- [ ] The scope is appropriate.
- [ ] The code is correct.
- [ ] The code is maintainable.
- [ ] The implementation fits the existing architecture.
- [ ] Edge cases are handled.
- [ ] Error cases are handled.
- [ ] Tests are sufficient.
- [ ] CI passes.
- [ ] Documentation is updated where needed.

### Risk

- [ ] Security risks have been considered.
- [ ] Performance risks have been considered.
- [ ] Compatibility risks have been considered.
- [ ] Deployment risks have been considered.
- [ ] Rollback path is clear if needed.
- [ ] Observability is sufficient.

Approve only if you are comfortable with the change being merged and released. If there are unresolved blocking concerns, request changes. If the PR is mostly good but has small non-blocking suggestions, make that clear.

---

## Review Comment Guidelines

### Comment Labels

- `Blocking:` — Must be fixed before merge.
- `Suggestion:` — Improvement, not required.
- `Question:` — Clarification needed.
- `Nit:` — Minor issue.
- `Praise:` — Positive feedback worth calling out.

### Examples

```text
Blocking: this endpoint allows any authenticated user to update this record.
Can we add an ownership or role check before performing the update?
```

```text
Suggestion: this validation logic appears in two places now. Would it make
sense to extract a shared helper?
```

```text
Question: is this expected to handle archived records as well, or only active
ones?
```

```text
Nit: typo in the variable name: `recieve` -> `receive`.
```

```text
Praise: nice improvement to the error handling here. The new message is much
clearer for users.
```

---

## Reviewer Mindset

- Curious, not adversarial.
- Clear, not vague.
- Helpful, not performative.
- Focused on risk, not personal style.
- Willing to ask questions.
- Willing to approve when the change is good enough.

The goal is not to prove that code is imperfect. The goal is to help the team ship reliable, maintainable software.
