# Backend Checklist

Detailed checks for backend, API, database, and performance.

---

## Backend-Specific Checks

- [ ] Request validation is complete.
- [ ] Authorization is enforced.
- [ ] Business logic is in the appropriate layer.
- [ ] External service failures are handled.
- [ ] Timeouts are configured where needed.
- [ ] Retries are safe and bounded.
- [ ] Idempotency is considered for retryable operations.
- [ ] Background jobs are safe to retry.
- [ ] Transactions are used where necessary.
- [ ] Partial failures are handled.
- [ ] API responses are consistent.
- [ ] Error responses are safe and useful.
- [ ] Logs include enough context.
- [ ] Sensitive fields are excluded from logs and responses.
- [ ] Resource cleanup is handled.
- [ ] Rate limits or abuse protections are considered.

### Questions to Ask

- What happens if the database is temporarily unavailable?
- What happens if an external API times out?
- Can this operation be retried safely?
- Could this create duplicate records or inconsistent state?

---

## API Checks

- [ ] Endpoint behavior is clear.
- [ ] Request schema is validated.
- [ ] Response schema is correct.
- [ ] Error response format is consistent.
- [ ] HTTP status codes are appropriate.
- [ ] Existing clients remain compatible.
- [ ] Breaking changes are versioned or clearly coordinated.
- [ ] Required and optional fields are documented.
- [ ] Pagination is handled correctly.
- [ ] Sorting and filtering are validated.
- [ ] Idempotency is considered for writes.
- [ ] API documentation is updated.
- [ ] Contract tests are updated where applicable.
- [ ] OpenAPI/Swagger schema is updated if used.

### Status Code Checks

- [ ] `200 OK` for successful reads or updates.
- [ ] `201 Created` for successful creation.
- [ ] `204 No Content` for operations without response body.
- [ ] `400 Bad Request` for invalid input.
- [ ] `401 Unauthorized` for unauthenticated requests.
- [ ] `403 Forbidden` for authenticated but unauthorized requests.
- [ ] `404 Not Found` for missing resources.
- [ ] `409 Conflict` for conflicting state.
- [ ] `422 Unprocessable Entity` where validation semantics require it.
- [ ] `500 Internal Server Error` is not used for expected user errors.

---

## Database and Migration Checks

Database changes require careful review — they can be challenging to roll back.

- [ ] Migration is safe to run in production.
- [ ] Migration is backward-compatible with existing application code.
- [ ] Migration can be rolled back or has a clear recovery strategy.
- [ ] Large table migrations avoid long locks.
- [ ] Data backfills are safe and batched if needed.
- [ ] Indexes are added for new query patterns.
- [ ] Unique constraints are correct.
- [ ] Foreign keys are correct.
- [ ] Nullability is appropriate.
- [ ] Default values are safe.
- [ ] Existing data is considered.
- [ ] Migration order is correct.
- [ ] Schema changes and application changes are deployment-safe.
- [ ] Destructive changes are avoided or staged carefully.
- [ ] Data type choices are appropriate.

### Staged Migration Pattern

For risky schema changes:

1. Add new nullable column or table.
2. Deploy code that writes both old and new data if needed.
3. Backfill existing data.
4. Switch reads to new data.
5. Enforce constraints.
6. Remove old column in a later PR.

### Red Flags

- Dropping columns used by currently deployed code.
- Adding non-null columns without defaults to large existing tables.
- Creating indexes that lock large tables.
- Running unbounded backfills in a normal migration.

---

## Performance

- [ ] No unnecessary repeated work.
- [ ] No obvious N+1 queries.
- [ ] Database queries are efficient.
- [ ] New queries use indexes where needed.
- [ ] Large data sets are paginated or streamed.
- [ ] Expensive computations are not repeated unnecessarily.
- [ ] Caching is used where appropriate and cache invalidation is correct.
- [ ] Render paths avoid unnecessary heavy work.
- [ ] Network calls are minimized where practical.
- [ ] Bundle size impact is considered.
- [ ] Memory usage is reasonable.
- [ ] Long-running tasks do not block request handling.

### Questions to Ask

- Does this scale with expected data size?
- Does this add work to a hot path?
- Could this create excessive database, network, or memory usage?
