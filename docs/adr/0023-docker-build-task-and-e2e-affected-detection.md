# ADR 0023: docker-build moon task and E2E affected detection via Docker inputs

- **Status:** Accepted
- **Date:** 2026-06-08
- **Partially supersedes:** [ADR 0022](0022-moon-task-inheritance-file-groups-and-ci-target-selection.md) (docker job gate condition)

ADR 0022 gates the docker CI job on `realm:build` being affected. This misses two cases: changes to `.docker/realm/` config files (nginx config, Dockerfile) that change the image without touching Angular source, and changes to `e2e/realm/` test files that should run against a freshly-built image. This ADR fixes both gaps.

## Decision

**`realm:docker-build` moon task.** A `docker-build` task is added to `apps/realm/moon.yml` with `/.docker/realm/**` and `/.docker/bake.hcl` as inputs and `realm:build` as a dep. The command runs `docker buildx bake` locally (same bake file, single-platform `--load`). This makes it a real, runnable task rather than a phantom stub — it can be used locally for image validation and does not exist purely for CI metadata. The CI docker job is re-gated on `realm:docker-build` being affected instead of `realm:build`. Because `realm:build` is a dep, app source changes still propagate correctly.

**E2E affected detection.** `realm-e2e:e2e-ci` gains `/.docker/realm/**` in its inputs. This ensures moon marks the task affected whenever Docker config changes, so `moon ci :e2e-ci` in the E2E job runs the tests after a Docker config-only rebuild. `moon run` was considered as a simpler fix but rejected: it runs all projects with an `e2e-ci` task unconditionally, which would cause all future apps' E2E suites to run on every docker job regardless of which image changed. Each future containerised app's E2E project should include its own `/.docker/<app>/**` in inputs and follow the same pattern.

**Dockerfile multi-stage scaffold.** The Dockerfile gains a dedicated `scaffold` stage that installs `@moonrepo/cli` globally and runs `moon docker scaffold realm`, generating `.moon/docker/workspace` (manifests only) and `.moon/docker/sources`. The `build` stage copies from those outputs instead of manually enumerating every `package.json`. This is O(1) as packages are added to the monorepo. A pre-CI-step alternative (running scaffold outside Docker before `docker buildx bake`) was rejected because it requires the `.moon/docker/` output to be present in the build context and adds a CI step that breaks local `docker buildx bake` invocations. Alpine requires `MOON_TOOLCHAIN_FORCE_GLOBALS=true` in the build stage since moon's integrated toolchain does not ship Alpine-compatible binaries.
