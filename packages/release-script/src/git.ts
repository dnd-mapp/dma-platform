import { execSync } from 'child_process';
import { inc } from 'semver';

/** A parsed conventional commit record. */
export interface Commit {
    /** First line of the commit message. */
    subject: string;

    /** Everything after the blank separator line following the subject. May be empty. */
    body: string;
}

/**
 * Returns the most recent git tag matching `<packageName>@*` (sorted by version descending),
 * or `null` when no such tag exists.
 */
export function getLatestTag(packageName: string): string | null {
    try {
        const stdout = execSync(`git tag --list "${packageName}@*" --sort=-version:refname`, {
            encoding: 'utf8',
            stdio: ['ignore', 'pipe', 'pipe'],
        });
        const first = stdout.trim().split('\n')[0];
        return first || null;
    } catch {
        return null;
    }
}

/**
 * Returns commits reachable from HEAD since `tag`, filtered to `packagePath`.
 * When `tag` is `null`, all commits touching the path are returned.
 */
export function getCommitsSinceTag(tag: string | null, packagePath: string): Commit[] {
    const range = tag ? `${tag}..HEAD` : '';

    const stdout = execSync(`git log ${range} -z --format=%s%n%b -- "${packagePath}"`, {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
    });

    if (!stdout.trim()) return [];
    return stdout
        .split('\0')
        .filter(Boolean)
        .map((block) => {
            const [subject = '', ...bodyLines] = block.split('\n');
            return { subject: subject, body: bodyLines.join('\n') };
        });
}

/**
 * Derives the highest semver bump type implied by the given commits.
 * - Subject matches `type[scope]!:` or body contains `BREAKING CHANGE` → `'major'`
 * - Subject starts with `feat` → `'minor'`
 * - Otherwise (including empty array) → `'patch'`
 */
export function deriveBumpType(commits: Commit[]): 'major' | 'minor' | 'patch' {
    const isBreaking = (c: Commit) => /^[a-z]+(\([^)]*\))?!:/.test(c.subject) || c.body.includes('BREAKING CHANGE');

    if (commits.some(isBreaking)) return 'major';
    if (commits.some((c) => /^feat[(!:]/.test(c.subject))) return 'minor';
    return 'patch';
}

/** Increments the appropriate semver part of `current` and zeroes the lower parts. */
export function bumpVersion(current: string, bump: 'major' | 'minor' | 'patch'): string {
    const result = inc(current, bump);

    if (result === null) throw new Error(`Invalid semver: ${current}`);
    return result;
}

/**
 * Suggests the next version for a package.
 * Returns `'0.1.0'` when no prior tag exists; otherwise applies the bump derived from
 * conventional commits since the last tag.
 */
export function suggestVersion(packageName: string, packagePath: string): string {
    const tag = getLatestTag(packageName);

    if (tag === null) return '0.1.0';
    const currentVersion = tag.slice(packageName.length + 1);
    const commits = getCommitsSinceTag(tag, packagePath);

    return bumpVersion(currentVersion, deriveBumpType(commits));
}

/** Creates a new git branch and checks it out. */
export function createReleaseBranch(branchName: string): void {
    execSync(`git checkout -b ${branchName}`, { stdio: 'inherit' });
}

/** Stages the given file paths for commit. */
export function stageFiles(files: string[]): void {
    execSync(`git add ${files.join(' ')}`, { stdio: 'inherit' });
}

/** Creates a release commit using the conventional commit message format. */
export function commitRelease(shortName: string, version: string): void {
    // HUSKY=0 prevents hook scripts from running via a shell that may not be in PATH when
    // Node.js spawns the subprocess (common on Windows).
    execSync(`git commit -m "release(${shortName}): ${version}"`, {
        stdio: 'inherit',
        env: { ...process.env, HUSKY: '0' },
    });
}

/** Pushes the branch to origin and sets the upstream tracking reference. */
export function pushBranch(branchName: string): void {
    execSync(`git push -u origin ${branchName}`, {
        stdio: 'inherit',
        env: { ...process.env, HUSKY: '0' },
    });
}

/** Opens a pull request targeting main via the GitHub CLI. */
export function openReleasePR(shortName: string, version: string): void {
    execSync(`gh pr create --base main --title "release(${shortName}): ${version}" --body ""`, { stdio: 'inherit' });
}
