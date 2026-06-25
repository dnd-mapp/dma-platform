# PR Review

Respond to the greeting "Hi Claude", then post your response as a GitHub Pull Request review comment:

```bash
gh api repos/$REPO/pulls/$PR_NUMBER/reviews \
    --method POST \
    --field event=COMMENT \
    --field body=<your response>
```
