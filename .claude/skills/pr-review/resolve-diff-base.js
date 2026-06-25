'use strict';

const { execFile } = require('child_process');
const { promisify } = require('util');

const execFileAsync = promisify(execFile);

/**
 * @template T
 * @typedef {{ result: T, error: null } | { result: null, error: Error }} Attempt
 */

/**
 * Awaits `promise` and returns a discriminated union so the caller can handle
 * the error path without a try/catch.
 *
 * @template T
 * @param {Promise<T>} promise
 * @returns {Promise<Attempt<T>>}
 */
async function attempt(promise) {
    try {
        return { result: await promise, error: null };
    } catch (error) {
        return { result: null, error: error instanceof Error ? error : new Error(String(error)) };
    }
}

/**
 * @typedef {{ body: string, submitted_at: string }} GitHubReview
 */

/**
 * @typedef {{ diffBase: string, forcePushDetected: boolean, lastReviewedSha: string | null }} DiffBaseResult
 */

/** Matches the reviewed-commit sentinel written by Step 8. Groups: sha1 (left), sha2 (right). */
const SENTINEL_RE = /\*\*Commits reviewed:\*\* `([0-9a-f]+)`\.\.`([0-9a-f]+)`/;

/**
 * Fetches the review list for a pull request via the GitHub CLI and returns it
 * as a parsed array. Returns `null` and logs a warning if the request fails.
 *
 * @param {string} repo
 * @param {string} prNumber
 * @returns {Promise<GitHubReview[] | null>}
 */
async function fetchReviews(repo, prNumber) {
    const { result, error } = await attempt(execFileAsync('gh', ['api', `repos/${repo}/pulls/${prNumber}/reviews`]));

    if (error) {
        console.warn(`Warning: could not fetch reviews: ${error.message}`);
        return null;
    }
    return JSON.parse(result.stdout);
}

/**
 * Scans `reviews` for the most recent one that contains the reviewed-commit
 * sentinel and returns the SHA that was HEAD at that review time (the
 * right-hand value in the `sha1..sha2` range). Returns `null` if no matching
 * review exists.
 *
 * @param {GitHubReview[]} reviews
 * @returns {string | null}
 */
function findLastReviewedSha(reviews) {
    const matched = reviews
        .filter((review) => SENTINEL_RE.test(review.body))
        .sort((curr, next) => new Date(next.submitted_at) - new Date(curr.submitted_at));

    if (matched.length === 0) return null;
    return matched[0].body.match(SENTINEL_RE)[2];
}

/**
 * Returns `true` if `sha` is reachable from HEAD and is a proper ancestor.
 * Both "not an ancestor" (exit 1) and "unknown object" (SHA orphaned after a
 * force push, never fetched) map to `false`.
 *
 * @param {string} sha
 * @returns {Promise<boolean>}
 */
async function isAncestor(sha) {
    const { error } = await attempt(execFileAsync('git', ['merge-base', '--is-ancestor', sha, 'HEAD']));
    return error === null;
}

/**
 * Resolves the SHA to use as the left boundary of the review diff.
 *
 * On the first review, or when reviews cannot be fetched, returns `baseSha`.
 * On subsequent reviews, returns the SHA recorded by the previous review's
 * sentinel. If the previous SHA is no longer an ancestor of HEAD (force push),
 * falls back to `baseSha` and sets `forcePushDetected`.
 *
 * @param {string} repo
 * @param {string} prNumber
 * @param {string} baseSha
 * @returns {Promise<DiffBaseResult>}
 */
async function resolveDiffBase(repo, prNumber, baseSha) {
    const reviews = await fetchReviews(repo, prNumber);

    if (!reviews) {
        return { diffBase: baseSha, forcePushDetected: false, lastReviewedSha: null };
    }
    const lastSha = findLastReviewedSha(reviews);

    if (!lastSha) {
        return { diffBase: baseSha, forcePushDetected: false, lastReviewedSha: null };
    }
    if (await isAncestor(lastSha)) {
        return { diffBase: lastSha, forcePushDetected: false, lastReviewedSha: null };
    }
    return { diffBase: baseSha, forcePushDetected: true, lastReviewedSha: lastSha };
}

/**
 * Entry point. Reads `REPO`, `PR_NUMBER`, and `BASE_SHA` from the environment,
 * resolves the diff base, and writes a JSON result to stdout:
 *
 *   { diffBase, forcePushDetected, lastReviewedSha }
 *
 * `diffBase` is the SHA to pass as the left boundary of `git diff`.
 * `forcePushDetected` is `true` when a force push was detected.
 * `lastReviewedSha` holds the old HEAD SHA when `forcePushDetected` is `true`.
 */
async function main() {
    if (process.argv.includes('--help')) {
        console.log(
            'Usage: node resolve-diff-base.js\n' +
                '\n' +
                'Resolves the left-boundary SHA for an incremental PR review diff and writes\n' +
                'a JSON result to stdout. On the first review, or after a force push, the\n' +
                'boundary is BASE_SHA. On subsequent reviews it is the SHA recorded by the\n' +
                "previous review's sentinel line.\n" +
                '\n' +
                'Environment:\n' +
                '  REPO       (required) GitHub repository in org/repo format\n' +
                '  PR_NUMBER  (required) Pull request number\n' +
                '  BASE_SHA   (required) Base branch commit SHA\n' +
                '\n' +
                'Output (JSON written to stdout):\n' +
                '  diffBase          SHA to use as the left boundary of git diff\n' +
                '  forcePushDetected true when the branch history was rewritten\n' +
                '  lastReviewedSha   previous HEAD SHA when forcePushDetected is true\n' +
                '\n' +
                'Exit codes:\n' +
                '  0  Success\n' +
                '  1  Missing required environment variable',
        );
        process.exit(0);
    }

    const repo = process.env['REPO'];
    const prNumber = process.env['PR_NUMBER'];
    const baseSha = process.env['BASE_SHA'];

    if (!repo || !prNumber || !baseSha) {
        console.error('Error: REPO, PR_NUMBER, and BASE_SHA environment variables are required');
        process.exit(1);
    }
    const result = await resolveDiffBase(repo, prNumber, baseSha);

    process.stdout.write(JSON.stringify(result) + '\n');
}

main().catch((error) => {
    console.error('Unexpected error:', error);
    process.exit(1);
});
