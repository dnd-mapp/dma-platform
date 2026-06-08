import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

/** A workspace package discovered under `apps/` or `packages/`. */
export interface WorkspacePackage {
    /** The `name` field from `package.json`, e.g. `"@dnd-mapp/sigil"`. */
    name: string;

    /** The `version` field from `package.json`, e.g. `"0.0.0"`. */
    version: string;

    /** Path relative to the monorepo root, e.g. `"packages/sigil"`. */
    path: string;
}

const WORKSPACE_DIRS = ['apps', 'packages'] as const;

/**
 * Scans `apps/` and `packages/` under `rootDir` for workspace packages.
 *
 * Subdirectories that contain a valid `package.json` with `name` and `version`
 * fields are included. Missing directories and malformed JSON are silently skipped.
 *
 * @param rootDir - Absolute path to the monorepo root (typically `process.cwd()`).
 * @returns Discovered packages sorted alphabetically by name.
 */
export async function discoverPackages(rootDir: string): Promise<WorkspacePackage[]> {
    // Read all workspace directories concurrently; settled so missing dirs are silently skipped
    const dirResults = await Promise.allSettled(
        WORKSPACE_DIRS.map(async (wsDir) => ({ wsDir: wsDir, entries: await readdir(join(rootDir, wsDir)) })),
    );

    const candidates = dirResults.flatMap((result) => {
        if (result.status === 'rejected') return [];
        const { wsDir, entries } = result.value;

        return entries.map((entry) => ({ wsDir: wsDir, entry: entry }));
    });

    // Read all package manifests concurrently; null means the entry should be skipped
    const packages = await Promise.all(
        candidates.map(async ({ wsDir, entry }) => {
            try {
                const manifest = JSON.parse(
                    await readFile(join(rootDir, wsDir, entry, 'package.json'), 'utf8'),
                ) as Record<string, unknown>;

                if (typeof manifest['name'] === 'string' && typeof manifest['version'] === 'string') {
                    return { name: manifest['name'], version: manifest['version'], path: `${wsDir}/${entry}` };
                }
            } catch {
                // skip missing or malformed package.json
            }
            return null;
        }),
    );

    return packages
        .filter((wsPackage): wsPackage is WorkspacePackage => wsPackage !== null)
        .sort((a, b) => a.name.localeCompare(b.name));
}
