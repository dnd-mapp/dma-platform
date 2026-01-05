# Entity Relationship Diagrams

```mermaid
---
title: User
---
erDiagram
    User {
        string id       PK
        string username UK
        string email
        string password
        
        int version

        timestamp createdAt
        timestamp updatedAt
        timestamp deletedAt
    }
```
