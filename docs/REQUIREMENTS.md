# Requirements

## Users

### Creating

- [x] When creating a new User account with a username that belongs to an account which has a value set for the `deletedAt` column, the account creation should be blocked with a 409 Conflict.
- [x] When creating a new User account with a username and email that belongs to an account which has a value set for the `deletedAt` column, the account should be marked as reactivated. The system should not create a new account.
- [x] When creating a new User account, the password should be hashed using Argon2.
- [x] When creating a new User account with a username that belongs to another account, the system should return a 409 Conflict error response.
- [x] When creating a new user account, the password should be at least 12 characters long.
- [x] When creating a new user account, the username must be at least three characters long.
- [x] When creating a new user account, the email must be a valid email address.

### Reading

- [x] When retrieving all Users (`GET /users`), accounts where the `deletedAt` column is set should be excluded from the result set.
- [x] When retrieving a single User (`GET /users/:userId`), accounts where the `deletedAt` column is set should return a 404 Not Found error response.
- [x] When retrieving a single User, the system should return a `ETag` response header containing the `version` column value.

### Updating

- [x] When updating a User account where the `deletedAt` column is set to a timestamp, the system should return a 404 Not Found error response.
- [x] When updating a User account which doesn't exist, the system should return a 404 Not Found error response.
- [x] When updating a User account to have a username that belongs to another User, the system should return a 409 Conflict error response.
- [ ] When updating a User account, the request should have a `If-Match` header containing the `version` of the User.
- [ ] When updating a User account and the `version` of the User account in the `If-Match` doesn't match the `version` of the user account stored in the database the system should return a 412 Precondition Failed error reponse.
- [x] When updating a User account the `version` column should increase by one.
- [x] When updating a User account, the username must be at least three characters long.

### Deleting

- [x] When a request is made to remove a user account which already has a value set for the `deletedAt` column, the system should not modify the `deletedAt` column and instead simply return a 204 No Content response.
- [x] When a User is removed, instead of actually removing the account, the `deletedAt` column should be set to the timestamp of the moment the request as made and return a 204 No Content response.
- [ ] Users may only remove their own account.
- [ ] Users with the `Admin` role mark any account as removed.
- [ ] When a user account has had a value set for the `deletedAt` column for longer than 30 days, the account will be removed permanetely. Any link to the user account will be set to `NULL`.

## Auth

### Change email

- [ ] When updating a user account, the email must be a valid email address.

### Change password

