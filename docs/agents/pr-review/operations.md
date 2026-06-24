# Operations Checklist

Detailed checks for security, observability, deployment, config, dependencies, compatibility, and privacy.

---

## Security

Security issues should usually block merging.

- [ ] Authentication is enforced where required.
- [ ] Authorization checks are present and correct.
- [ ] Users cannot access or modify data they do not own.
- [ ] User input is validated and sanitized where needed.
- [ ] SQL injection risks are avoided.
- [ ] Command injection risks are avoided.
- [ ] Cross-site scripting risks are avoided.
- [ ] Cross-site request forgery risks are considered.
- [ ] Sensitive data is not exposed in responses or logs.
- [ ] Secrets are not committed.
- [ ] Tokens, passwords, and credentials are handled safely.
- [ ] Permissions are least-privilege.
- [ ] File uploads are validated.
- [ ] Redirects are safe and validated.
- [ ] Rate limiting is considered for abuse-prone endpoints.
- [ ] Dependencies do not introduce known vulnerabilities.
- [ ] Cryptography is not custom-built unless absolutely necessary.

### Red Flags

- Missing authorization checks.
- Trusting client-provided user IDs, roles, or permissions.
- Logging request headers that may contain credentials.
- Returning stack traces to clients.
- Hardcoded API keys or secrets.
- Building SQL strings manually with user input.
- Rendering unescaped user-generated content.

---

## Observability

- [ ] Important failures are logged with useful context.
- [ ] Logs avoid sensitive data.
- [ ] Log levels are appropriate.
- [ ] Metrics are added for important flows.
- [ ] Tracing is added for distributed workflows where relevant.
- [ ] Alerts are updated or added if needed.
- [ ] Existing dashboards remain valid.
- [ ] No excessive noisy logging is introduced.

### Questions to Ask

- If this breaks in production, how will we know?
- If this behaves incorrectly, how will we debug it?

---

## Deployment and Rollback

- [ ] Change is safe to deploy.
- [ ] Deployment order is clear.
- [ ] Rollback strategy is clear.
- [ ] Feature flag is used for risky behavior changes where appropriate.
- [ ] Database migrations are compatible with rollback.
- [ ] External service dependencies are ready.
- [ ] Background jobs or workers are compatible across versions.
- [ ] Old and new code can run simultaneously during rolling deploys.
- [ ] The change does not require downtime unless explicitly planned.

### Red Flags

- App code requires a schema change that may not exist yet.
- Migration cannot be rolled back and no recovery plan is provided.
- Rolling deployment would cause old and new versions to conflict.

---

## Configuration and Environment

- [ ] New environment variables are documented.
- [ ] Defaults are safe.
- [ ] Missing configuration fails clearly.
- [ ] Secrets are handled through secret management, not committed files.
- [ ] Development, staging, and production configs are considered.
- [ ] Config changes are backward-compatible.
- [ ] Local development setup still works.
- [ ] Example config files are updated if needed.

### Red Flags

- Hardcoded environment-specific values.
- Production credentials in code.
- Required env vars added without documentation.

---

## Dependencies

- [ ] New dependency is necessary.
- [ ] Existing dependency cannot reasonably solve the problem.
- [ ] Dependency is actively maintained.
- [ ] License is acceptable.
- [ ] Package size is reasonable, especially for frontend bundles.
- [ ] Security vulnerabilities are checked.
- [ ] Transitive dependencies are acceptable.
- [ ] Dependency version is pinned or constrained appropriately.
- [ ] Lockfile changes are expected.
- [ ] Dependency update does not include unrelated major upgrades.

---

## Compatibility

- [ ] Existing APIs remain compatible.
- [ ] Existing database records still work.
- [ ] Existing clients continue to function.
- [ ] Event/message formats remain compatible.
- [ ] Public interfaces are not broken unexpectedly.
- [ ] Deprecated behavior follows the proper deprecation process.
- [ ] Cross-service compatibility is considered.

### Red Flags

- Removing fields from an API response.
- Changing field meaning without versioning.
- Renaming event properties consumed by other services.
- Requiring all clients to update at once.

---

## Privacy and Compliance

- [ ] Personal data collection is necessary and minimized.
- [ ] Data retention expectations are respected.
- [ ] User consent is considered where required.
- [ ] Data access is restricted.
- [ ] Sensitive data is not exposed in logs, analytics, or errors.
- [ ] Exports include only allowed data.
- [ ] Deletion/anonymization requirements are respected.
- [ ] Third-party sharing is intentional and documented.
- [ ] Tracking or analytics changes are privacy-safe.

**Sensitive Data Examples:** passwords, API keys, access tokens, personal identifiers, email addresses, phone numbers, addresses, payment information, health information, location data, private messages, authentication/session data.
