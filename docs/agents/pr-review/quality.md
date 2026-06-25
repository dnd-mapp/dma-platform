# Quality Checklist

Detailed checks for correctness, architecture, code quality, tests, error handling, concurrency, and data integrity.

---

## Correctness

- [ ] Code does what the PR says it does.
- [ ] Happy path is handled.
- [ ] Edge cases are handled.
- [ ] Failure cases are handled.
- [ ] Invalid input is handled.
- [ ] Empty states are handled.
- [ ] Null or undefined values are handled where relevant.
- [ ] Boundary values are handled.
- [ ] Existing behavior is preserved unless intentionally changed.
- [ ] No obvious regressions are introduced.
- [ ] Business rules are implemented correctly.
- [ ] Calculations are correct.
- [ ] Date, time, timezone, and locale handling is correct.
- [ ] Sorting, filtering, and pagination logic is correct.
- [ ] The code behaves correctly with realistic data volumes.
- [ ] Error conditions do not leave the system in an invalid state.

### Questions to Ask

- What happens if the input is missing, empty, malformed, or unexpected?
- What happens if a dependency fails?
- What happens if this code is called multiple times?
- What happens if two users perform this action at the same time?
- Does this behave correctly across environments?

---

## Architecture and Design

- [ ] The solution fits existing architecture.
- [ ] The change follows established patterns in the codebase.
- [ ] Responsibilities are placed in the right layer.
- [ ] Business logic is not placed in the wrong abstraction.
- [ ] The implementation is not over- or under-engineered.
- [ ] New abstractions are justified.
- [ ] Existing abstractions are reused where appropriate.
- [ ] Coupling is minimized.
- [ ] Module boundaries are respected.
- [ ] Domain concepts are represented clearly.

### Red Flags

- Business logic in UI components.
- Database-specific logic leaking throughout the app.
- New abstraction created for only one trivial use case.
- Copy-pasted logic instead of shared behavior.
- Circular dependencies or tight coupling between unrelated modules.

---

## Code Quality and Maintainability

- [ ] Names are clear and descriptive.
- [ ] Functions are reasonably small and focused.
- [ ] Files are organized logically.
- [ ] Control flow is easy to follow.
- [ ] Complex logic is broken into understandable pieces.
- [ ] Duplicate logic is avoided.
- [ ] Comments explain why, not obvious what.
- [ ] Dead code is removed.
- [ ] Debug code is removed.
- [ ] TODO comments include enough context or a tracking issue.
- [ ] Code avoids unnecessary cleverness and excessive nesting.
- [ ] Types are used effectively where applicable.
- [ ] Public APIs are clear and stable.

---

## Tests

- [ ] New behavior has automated tests.
- [ ] Bug fixes include regression tests.
- [ ] Edge cases are tested.
- [ ] Error cases are tested.
- [ ] Existing tests are updated where behavior changed.
- [ ] Tests are meaningful and not overly coupled to implementation details.
- [ ] Tests are deterministic and avoid unnecessary sleeps/timeouts.
- [ ] Tests do not rely on external services unless intentionally integration tests.
- [ ] Mocks and stubs are used appropriately.
- [ ] Tests would fail if the implementation were broken.
- [ ] Test names clearly describe the behavior.
- [ ] Test data is realistic enough to catch common issues.
- [ ] Snapshot tests are used carefully.
- [ ] Flaky test patterns are avoided.
- [ ] Manual test steps are documented when automation is not practical.

### Questions to Ask

- If this code broke later, would the tests catch it?
- Are tests checking behavior or implementation details?
- Is the test coverage proportional to the risk of the change?

---

## Error Handling

- [ ] Expected errors are handled explicitly.
- [ ] Unexpected errors are safely propagated or logged.
- [ ] Error messages are useful without exposing internals.
- [ ] Retriable and non-retriable errors are distinguished.
- [ ] Partial failures are handled.
- [ ] Cleanup happens after failures.
- [ ] Error states are tested.
- [ ] Errors do not leave data in an inconsistent state.
- [ ] Error handling is consistent with existing patterns.

---

## Concurrency and Async Behavior

- [ ] Race conditions are considered.
- [ ] Duplicate submissions are handled.
- [ ] Retried requests are safe.
- [ ] Long-running operations have timeouts.
- [ ] Async tasks are awaited or intentionally fire-and-forget.
- [ ] Fire-and-forget tasks handle errors.
- [ ] Shared state is protected.
- [ ] Locks or transactions are used where necessary.
- [ ] UI handles stale responses.
- [ ] Cancellation is handled where appropriate.
- [ ] Background jobs are idempotent.
- [ ] Message processing handles duplicates.

### Red Flags

- Updating state from stale async responses.
- Unbounded retries.
- Missing transaction around related database writes.
- Background job can create duplicates if retried.
- Promise or task errors are ignored.

---

## Data Integrity

- [ ] Data validation is enforced at appropriate layers.
- [ ] Invariants are preserved.
- [ ] Related records are updated consistently.
- [ ] Transactions are used for multi-step writes where needed.
- [ ] Duplicate data is avoided or synchronized correctly.
- [ ] Deletes are safe.
- [ ] Soft-delete behavior is respected if used.
- [ ] Audit fields are updated correctly.
- [ ] Timestamps are handled consistently.
- [ ] Data backfills are accurate.

### Questions to Ask

- Could this create orphaned records?
- Could this overwrite newer data?
- Could this create duplicates?
- Could this lose user data?
