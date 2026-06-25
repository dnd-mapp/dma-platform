# Process Checklist

Detailed checks for PR description, scope, git hygiene, CI/CD, manual testing, and code style.

---

## PR Description and Context

- [ ] PR has a clear title.
- [ ] PR description explains what changed and why.
- [ ] Related issue, ticket, or design document is linked.
- [ ] Acceptance criteria are included or referenced.
- [ ] Screenshots, recordings, or examples are included when useful.
- [ ] Breaking changes are called out explicitly.
- [ ] Deployment or rollback steps are mentioned if needed.
- [ ] Testing performed by the author is described.

### Questions to Ask

- Is the description enough for someone outside the immediate context?
- Are there hidden assumptions that should be documented?

---

## Scope and Size

- [ ] PR has a single clear purpose.
- [ ] Unrelated changes are not included.
- [ ] Formatting-only changes are not mixed with logic changes.
- [ ] Large refactors are separated from behavior changes where practical.
- [ ] Generated files are included only when expected.
- [ ] Feature work, refactoring, dependency updates, and cleanup are not unnecessarily bundled.

### Red Flags

- A small bug fix changes many unrelated files.
- A new feature includes broad refactoring without explanation.
- The PR contains drive-by changes.
- The PR is too large to review effectively.

---

## Code Style and Consistency

- [ ] Code follows project formatting rules.
- [ ] Linting passes.
- [ ] Naming conventions are followed.
- [ ] File structure matches existing conventions.
- [ ] Imports are organized consistently.
- [ ] Error handling style matches the codebase.
- [ ] Testing style matches the codebase.

Prefer automated tools for formatting and linting. Human review time is better spent on correctness, design, security, and maintainability.

---

## Git Hygiene

- [ ] Branch is up to date enough to avoid conflicts.
- [ ] Commit messages are meaningful.
- [ ] No accidental files are committed.
- [ ] No secrets, environment files, or debug artifacts are committed.
- [ ] Lockfile changes are intentional.
- [ ] Generated files are expected.
- [ ] Merge conflicts are resolved correctly.

**Common Accidental Files:** `.env`, `.DS_Store`, local IDE configs, debug logs, temporary scripts, build outputs, credentials, local database files.

---

## CI/CD Checks

- [ ] CI passes.
- [ ] Unit, integration, and end-to-end tests pass.
- [ ] Linting, type checking, and formatting checks pass.
- [ ] Build succeeds.
- [ ] Security and dependency scans pass.
- [ ] Failed checks are understood and fixed, not ignored.

### Red Flags

- Tests are skipped without explanation.
- Snapshot updates are accepted without review.
- Security warnings are dismissed without justification.

---

## Manual Testing

- [ ] Author described manual test steps.
- [ ] Important user flows are tested.
- [ ] Edge cases are manually checked where relevant.
- [ ] UI changes include screenshots or recordings.
- [ ] Different roles or permissions are tested where relevant.
- [ ] Different browsers/devices are tested if relevant.
- [ ] Feature flags are tested both on and off if relevant.

### Example

```text
Manual testing performed:

1. Logged in as an admin user.
2. Created a new project.
3. Verified the project appears in the dashboard.
4. Logged in as a non-admin user.
5. Confirmed the user cannot access the admin-only project settings.
6. Verified error message appears when submitting invalid input.
```
