---
name: pr-review
description: >
    Posts an automated review comment on a GitHub pull request. Use when
    running in a GitHub Actions pull request workflow to review changes between
    BASE_SHA and HEAD_SHA.
allowed-tools:
    - Bash
---

# PR Review

Run exactly this command. Do not modify the command, change the body, read the diff, or do anything else:

```bash
gh api repos/$REPO/pulls/$PR_NUMBER/reviews \
    --method POST \
    --field event=COMMENT \
    --field body='Hi! I am Claude, the automated PR reviewer. This is a test post to verify the review plumbing works correctly.'
```
