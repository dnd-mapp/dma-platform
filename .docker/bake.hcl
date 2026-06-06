# docker/metadata-action populates this at CI time via its bake-file fragment.
# It injects dynamic OCI labels (created, revision, version) and extra tags.
target "docker-metadata-action" {}

# Shared settings inherited by every image target.
target "_common" {
  platforms  = ["linux/amd64", "linux/arm64"]
  provenance = true
  sbom       = true
}

target "realm" {
  inherits   = ["_common", "docker-metadata-action"]
  dockerfile = ".docker/realm/Dockerfile"
  context    = "."
  cache-from = ["type=registry,ref=dndmapp/realm:buildcache"]
  cache-to   = ["type=registry,ref=dndmapp/realm:buildcache,mode=max"]
  labels     = {
    "org.opencontainers.image.title"       = "Realm"
    "org.opencontainers.image.description" = "Angular SPA for D&D Mapp, served by nginx"
    "org.opencontainers.image.url"         = "https://hub.docker.com/r/dndmapp/realm"
    "org.opencontainers.image.source"      = "https://github.com/dnd-mapp/dma-platform"
    "org.opencontainers.image.licenses"    = "MIT"
  }
}
