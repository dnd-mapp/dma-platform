# Issue Types

## Epic

**Hierarchy:** can contain Stories and Spikes

### Issue Type

Org-level issue type: `Epic` (node ID: `IT_kwDODFcis84CBKdR`)

### Fields

| Field       | Kind                  | Node ID                         | Type          | Values / format               |
|:------------|:----------------------|:--------------------------------|:--------------|:------------------------------|
| `priority`  | Org-level issue field | `IFSS_kgDOAopeGg`               | Single-select | P0 \| P1 \| P2 \| P3          |
| `iteration` | Project field         | `PVTIF_lADODFcis84BY-C4zhUBQBo` | Iteration     | Q2 2026 \| Q3 2026 \| Q4 2026 |

**Priority options** (org-level issue field `IFSS_kgDOAopeGg`):

> **GraphQL note:** Use the `IFSSO_` node IDs below with `singleSelectOptionId`. REST integer IDs do not work with the GraphQL `updateIssueFieldValue` mutation.

| Value | ID                 | Description                                                 |
|:------|:-------------------|:------------------------------------------------------------|
| `P0`  | `IFSSO_kgDOBHIfOQ` | Drop everything — blocking critical path or a live incident |
| `P1`  | `IFSSO_kgDOBHIfOg` | High priority — must be addressed this quarter              |
| `P2`  | `IFSSO_kgDOBHIfOw` | Normal priority — planned and scheduled                     |
| `P3`  | `IFSSO_kgDOBHIfPA` | Low priority — nice to have, no firm commitment             |

### Statuses

`Status` Project field (single-select, node ID: `PVTSSF_lADODFcis84BY-C4zhUADuc`):

| Status        | Option ID  |
|:--------------|:-----------|
| `backlog`     | `f75ad846` |
| `in-progress` | `0d8b05a3` |
| `done`        | `8f8e8157` |

### Body template

```md
## Goal

## Scope

## Out of scope
```

---

## Story

**Hierarchy:** child of Epic

### Issue Type

Org-level issue type: `Story` (node ID: `IT_kwDODFcis84CBKrx`)

### Fields

| Field        | Kind                   | Node ID                        | Type          | Values / format             |
|:-------------|:-----------------------|:-------------------------------|:--------------|:----------------------------|
| `priority`   | Org-level issue field  | `IFSS_kgDOAopeGg`              | Single-select | P0 \| P1 \| P2 \| P3        |
| `estimation` | Org-level issue field  | `IFN_kgDOAoptyA`               | Number        | 1 \| 2 \| 3 \| 5 \| 8 \| 13 |
| `parent`     | Project field (native) | `PVTF_lADODFcis84BY-C4zhUADu4` | Parent issue  | use `addSubIssue` mutation  |

**Priority options:** see Epic section above.

> **Note — parent field:** Set natively via `addSubIssue` mutation — do not
> include `Parent #<n>` in the issue body.
>
> **GraphQL note — Story Points:** Set via `updateIssueFieldValue` with `issueField: { fieldId: "IFN_kgDOAoptyA", numberValue: <n> }`. The argument is `numberValue` (Float), not `number`.

### Statuses

`Status` Project field (single-select, node ID: `PVTSSF_lADODFcis84BY-C4zhUADuc`):

| Status        | Option ID  |
|:--------------|:-----------|
| `backlog`     | `f75ad846` |
| `ready`       | `6479c4dc` |
| `in-progress` | `0d8b05a3` |
| `in-review`   | `441688e8` |
| `done`        | `8f8e8157` |

### Body template

```md
## User Story

As a [persona], I want [goal], so that [reason].

## Acceptance criteria

- [ ]
- [ ]
```

---

## Task

**Hierarchy:** child of Story

### Issue Type

Org-level issue type: `Task` (node ID: `IT_kwDODFcis84CBKxI`)

### Fields

| Field    | Kind                   | Node ID                        | Type         | Values / format |
|:---------|:-----------------------|:-------------------------------|:-------------|:----------------|
| `parent` | Project field (native) | `PVTF_lADODFcis84BY-C4zhUADu4` | Parent issue | `Parent #<n>`   |

### Statuses

`Status` Project field (single-select, node ID: `PVTSSF_lADODFcis84BY-C4zhUADuc`):

| Status        | Option ID  |
|:--------------|:-----------|
| `backlog`     | `f75ad846` |
| `in-progress` | `0d8b05a3` |
| `in-review`   | `441688e8` |
| `done`        | `8f8e8157` |

### Body template

```md
## Description
```

---

## Bug

**Hierarchy:** standalone

### Issue Type

Org-level issue type: `Bug` (node ID: `IT_kwDODFcis84CBK3a`)

### Fields

| Field      | Kind                  | Node ID           | Type          | Values / format      |
|:-----------|:----------------------|:------------------|:--------------|:---------------------|
| `priority` | Org-level issue field | `IFSS_kgDOAopeGg` | Single-select | P0 \| P1 \| P2 \| P3 |
| `severity` | Org-level issue field | `IFSS_kgDOAoplog` | Single-select | S0 \| S1 \| S2 \| S3 |

**Priority options:** see Epic section above.

**Severity options** (org-level issue field `IFSS_kgDOAoplog`):

| Value | ID                 | Description                                                           |
|:------|:-------------------|:----------------------------------------------------------------------|
| `S0`  | `IFSSO_kgDOBHIscA` | Data loss, corruption, or complete feature failure with no workaround |
| `S1`  | `IFSSO_kgDOBHIscQ` | Core flow broken; workaround exists but is painful                    |
| `S2`  | `IFSSO_kgDOBHIscg` | Degraded experience; reasonable workaround available                  |
| `S3`  | `IFSSO_kgDOBHIscw` | Cosmetic or minor issue; does not impact functionality                |

### Statuses

`Status` Project field (single-select, node ID: `PVTSSF_lADODFcis84BY-C4zhUADuc`):

| Status        | Option ID  |
|:--------------|:-----------|
| `backlog`     | `f75ad846` |
| `ready`       | `6479c4dc` |
| `in-progress` | `0d8b05a3` |
| `in-review`   | `441688e8` |
| `done`        | `8f8e8157` |

### Body template

```md
## Steps to reproduce

## Expected

## Actual

## Environment
```

---

## Spike

**Hierarchy:** standalone or child of Epic

### Issue Type

Org-level issue type: `Spike` (node ID: `IT_kwDODFcis84CBK-7`)

### Fields

| Field      | Kind                   | Node ID                        | Type          | Values / format                      |
|:-----------|:-----------------------|:-------------------------------|:--------------|:-------------------------------------|
| `priority` | Org-level issue field  | `IFSS_kgDOAopeGg`              | Single-select | P0 \| P1 \| P2 \| P3                 |
| `time-box` | Org-level issue field  | `IFT_kgDOAopn2A`               | Text          | Days allocated (e.g. `2d`, `1 week`) |
| `parent`   | Project field (native) | `PVTF_lADODFcis84BY-C4zhUADu4` | Parent issue  | `Parent #<n>`                        |

**Priority options:** see Epic section above.

### Statuses

`Status` Project field (single-select, node ID: `PVTSSF_lADODFcis84BY-C4zhUADuc`):

| Status        | Option ID  |
|:--------------|:-----------|
| `backlog`     | `f75ad846` |
| `ready`       | `6479c4dc` |
| `in-progress` | `0d8b05a3` |
| `done`        | `8f8e8157` |

### Body template

```md
## Goal

## Time box

## Findings
```
