'use strict';

const { readFile, readdir, writeFile } = require('fs/promises');
const { join } = require('path');

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
 * Reads and returns the trimmed contents of `.review/body.md`. Exits with an
 * error if the file does not exist.
 *
 * @param {string} reviewDir
 * @returns {Promise<string>}
 */
async function readBody(reviewDir) {
    const { result, error } = await attempt(readFile(join(reviewDir, 'body.md'), { encoding: 'utf8' }));

    if (error) {
        console.error('Error: .review/body.md not found');
        process.exit(1);
    }
    return result.trim();
}

/**
 * @typedef {{ frontmatter: Record<string, string>, body: string }} ParsedFrontmatter
 */

/**
 * Splits a Markdown file into its YAML frontmatter key-value pairs and the
 * body that follows the closing `---` delimiter. Returns `null` if the file
 * does not start with a valid frontmatter block.
 *
 * @param {string} content
 * @returns {ParsedFrontmatter | null}
 */
function parseFrontmatter(content) {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

    if (!match) return null;
    const frontmatter = {};

    for (const line of match[1].split(/\r?\n/)) {
        const colonIndex = line.indexOf(':');

        if (colonIndex === -1) continue;
        frontmatter[line.slice(0, colonIndex).trim()] = line.slice(colonIndex + 1).trim();
    }
    return { frontmatter: frontmatter, body: match[2].trim() };
}

/**
 * @typedef {{ path: string, line: number, side: string, body: string }} ReviewComment
 */

/**
 * Parses a single comment file into a `ReviewComment`. Returns `null` and
 * logs a warning if the frontmatter is malformed or missing required fields.
 *
 * @param {string} file
 * @param {string} content
 * @returns {ReviewComment | null}
 */
function parseComment(file, content) {
    const parsed = parseFrontmatter(content);

    if (!parsed) {
        console.warn(`Warning: could not parse frontmatter in ${file}, skipping`);
        return null;
    }
    const { frontmatter, body } = parsed;

    if (!frontmatter.path || !frontmatter.line || !frontmatter.side) {
        console.warn(`Warning: missing required fields (path, line, side) in ${file}, skipping`);
        return null;
    }
    return {
        path: frontmatter.path,
        line: parseInt(frontmatter.line, 10),
        side: frontmatter.side,
        body: body,
    };
}

/**
 * Reads all `.md` files from `commentsDir` in alphabetical order, parses each
 * one, and returns the successfully parsed comments. Files that fail to parse
 * are skipped with a warning.
 *
 * @param {string} commentsDir
 * @returns {Promise<ReviewComment[]>}
 */
async function readComments(commentsDir) {
    const files = (await readdir(commentsDir)).filter((file) => file.endsWith('.md')).sort();

    const comments = await Promise.all(
        files.map(async (file) => parseComment(file, await readFile(join(commentsDir, file), { encoding: 'utf8' }))),
    );

    return comments.filter(Boolean);
}

/**
 * @typedef {{ commit_id: string, body: string, event: 'COMMENT', comments: ReviewComment[] }} ReviewPayload
 */

/**
 * Assembles the GitHub PR Reviews API payload from its constituent parts.
 * The event is always `COMMENT` — the bot never approves or requests changes.
 *
 * @param {string} headSha
 * @param {string} body
 * @param {ReviewComment[]} comments
 * @returns {ReviewPayload}
 */
function buildPayload(headSha, body, comments) {
    return { commit_id: headSha, body: body, event: 'COMMENT', comments: comments };
}

/**
 * Serializes `payload` to `.review/payload.json` and logs the output path and
 * inline comment count.
 *
 * @param {string} reviewDir
 * @param {ReviewPayload} payload
 * @returns {Promise<void>}
 */
async function writePayload(reviewDir, payload) {
    const outputPath = join(reviewDir, 'payload.json');
    await writeFile(outputPath, JSON.stringify(payload, null, 2), { encoding: 'utf8' });

    console.log(`Written payload to ${outputPath} (${payload.comments.length} inline comment(s))`);
}

/**
 * Entry point. Reads `HEAD_SHA` from the environment, loads the review body
 * and inline comments from `.review/`, builds the payload, and writes it to
 * `.review/payload.json`.
 */
async function main() {
    if (process.argv.includes('--help')) {
        console.log(
            'Usage: node build-review.js\n' +
                '\n' +
                'Reads .review/body.md and .review/comments/*.md, then writes\n' +
                '.review/payload.json for posting as a GitHub PR review via:\n' +
                '  gh api repos/$REPO/pulls/$PR_NUMBER/reviews --method POST --input .review/payload.json\n' +
                '\n' +
                'Environment:\n' +
                '  HEAD_SHA  (required) Head commit SHA included in the review payload\n' +
                '\n' +
                'Exit codes:\n' +
                '  0  Success — payload written\n' +
                '  1  HEAD_SHA not set, .review/body.md not found, or unexpected error',
        );
        process.exit(0);
    }

    const headSha = process.env['HEAD_SHA'];

    if (!headSha) {
        console.error('Error: HEAD_SHA environment variable is not set');
        process.exit(1);
    }
    const reviewDir = join(process.cwd(), '.review');
    const body = await readBody(reviewDir);

    const comments = await readComments(join(reviewDir, 'comments'));

    const payload = buildPayload(headSha, body, comments);

    await writePayload(reviewDir, payload);
}

main().catch((error) => {
    console.error('Unexpected error:', error);
    process.exit(1);
});
