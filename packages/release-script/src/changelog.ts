/** Base GitHub URL used when constructing release and compare reference links. */
const REPO_URL = 'https://github.com/dnd-mapp/dma-platform';

/** Matches a Keep a Changelog section heading. Group 1: version label; group 2: ISO date (versioned entries only). */
const SECTION_HEADING = /^## \[([^\]]+)](?:\s+-\s+(\d{4}-\d{2}-\d{2}))?/gm;

/** Matches a Markdown reference-link definition line. Group 1: label; group 2: URL. */
const LINK_LINE = /^\[([^\]]+)]:\s+(.+)$/;

/** A `## [Unreleased]` section that accumulates in-progress changes before a release. */
export interface UnreleasedEntry {
    version: 'Unreleased';

    /** Raw text from immediately after the heading line to the start of the next heading. Starts and ends with `\n`. */
    content: string;
}

/** A promoted, dated version section such as `## [0.1.0] - 2026-06-08`. */
export interface VersionedEntry {
    /** Semver string, e.g. `"0.1.0"`. */
    version: string;

    /** ISO 8601 date string, e.g. `"2026-06-08"`. */
    date: string;

    /** Raw text from immediately after the heading line to the start of the next heading. Starts and ends with `\n`. */
    content: string;
}

/** A single section in the changelog — either the accumulator or a promoted versioned entry. */
export type ChangelogEntry = UnreleasedEntry | VersionedEntry;

/** A Keep a Changelog reference-link definition that appears at the bottom of the file. */
export interface ChangelogLink {
    /** The bracketed label, e.g. `"Unreleased"` or `"0.1.0"`. */
    label: string;

    /** The full URL the label resolves to. */
    url: string;
}

/** Structured representation of a Keep a Changelog `CHANGELOG.md` file. */
export interface Changelog {
    /** Everything before the first `## [` heading, including the trailing blank line. */
    header: string;

    /** Sections in document order: `[Unreleased]` first, then versioned entries newest-first. */
    entries: ChangelogEntry[];

    /** Reference-link definitions from the bottom of the file, in document order. */
    links: ChangelogLink[];
}

/** Parameters for {@link promoteChangelog}. */
export interface PromoteChangelogParams {
    /** The parsed changelog to promote. */
    changelog: Changelog;

    /** Short package identifier used in tag and compare URLs, e.g. `"sigil"`. */
    packageName: string;

    /** Semver string for the new release, e.g. `"0.1.0"`. */
    version: string;

    /** ISO 8601 release date, e.g. `"2026-06-08"`. */
    date: string;
}

/** Intermediate result of stripping trailing reference links from raw file content. */
interface ExtractedLinks {
    /** File content with the reference-link block (and its preceding blank line) removed. */
    body: string;

    /** Reference links that were stripped in document order. */
    links: ChangelogLink[];
}

/**
 * Strips "Keep a Changelog" reference-link definitions from the end of `content`.
 *
 * When no links are present, the original `content` is returned unchanged so that
 * the file-terminating newline is preserved for round-trip serialization.
 */
function extractTrailingLinks(content: string): ExtractedLinks {
    const lines = content.split('\n');
    const links: ChangelogLink[] = [];
    let i = lines.length - 1;

    // Skip the one file-terminating empty string before scanning for links
    if (i >= 0 && lines[i] === '') i--;

    // Walk backwards collecting reference-link lines; stop at the first non-link line
    while (i >= 0) {
        const match = LINK_LINE.exec(lines[i]);

        if (match) {
            links.unshift({ label: match[1], url: match[2] });
            i--;
        } else {
            break;
        }
    }

    if (links.length === 0) {
        // Nothing was stripped — return content unchanged to preserve trailing newline
        return { body: content, links };
    }

    // The blank separator line before the links block (lines[i] === '') stays in the body
    // so that serialization can reconstruct the blank line via the body's trailing '\n'.
    const body = lines.slice(0, i + 1).join('\n');
    return { body: body, links: links };
}

/**
 * Parses the raw text of a `CHANGELOG.md` into a {@link Changelog}.
 *
 * @param content - Full text of the changelog file.
 * @returns Structured changelog with header, entries, and reference links.
 */
export function parseChangelog(content: string): Changelog {
    const { body, links } = extractTrailingLinks(content);

    const headingMatches = [...body.matchAll(SECTION_HEADING)];

    if (headingMatches.length === 0) {
        return { header: body, entries: [], links };
    }
    const header = body.slice(0, headingMatches[0].index);
    const entries: ChangelogEntry[] = [];

    for (let i = 0; i < headingMatches.length; i++) {
        const match = headingMatches[i];
        const contentStart = match.index + match[0].length;
        const contentEnd = i < headingMatches.length - 1 ? headingMatches[i + 1].index : body.length;
        const entryContent = body.slice(contentStart, contentEnd);

        if (match[1] === 'Unreleased') {
            entries.push({ version: 'Unreleased', content: entryContent });
        } else {
            entries.push({ version: match[1], date: match[2], content: entryContent });
        }
    }

    return { header: header, entries: entries, links: links };
}

/**
 * Promotes the `[Unreleased]` section to a dated versioned entry and rebuilds
 * the reference-link block per ADR 0019.
 *
 * The `[Unreleased]` link is always present in the result because at least one
 * versioned entry (the one just promoted) exists to use as a compare base.
 * The "no `[Unreleased]` link" state described in ADR 0019 applies only to the
 * initial file before any promotion has been performed.
 *
 * @param params - See {@link PromoteChangelogParams}.
 * @returns A new {@link Changelog} with a fresh empty `[Unreleased]` above the promoted entry.
 * @throws {Error} When no `[Unreleased]` section is present.
 */
export function promoteChangelog(params: PromoteChangelogParams): Changelog {
    const { changelog, packageName, version, date } = params;
    const unreleasedIndex = changelog.entries.findIndex((entry) => entry.version === 'Unreleased');

    if (unreleasedIndex === -1) {
        throw new Error('No [Unreleased] section found in changelog');
    }
    const unreleased = changelog.entries[unreleasedIndex];

    const newVersioned: VersionedEntry = { version: version, date: date, content: unreleased.content };
    const newUnreleased: UnreleasedEntry = { version: 'Unreleased', content: '\n\n' };

    const newEntries: ChangelogEntry[] = [
        ...changelog.entries.slice(0, unreleasedIndex),
        newUnreleased,
        newVersioned,
        ...changelog.entries.slice(unreleasedIndex + 1),
    ];

    const versionedEntries = newEntries.filter((entry): entry is VersionedEntry => entry.version !== 'Unreleased');

    // [Unreleased] link always present after any promotion — there is always at least
    // one versioned entry (the one just promoted) to use as a compare base.
    const links: ChangelogLink[] = [
        { label: 'Unreleased', url: `${REPO_URL}/compare/${packageName}@${version}...HEAD` },
        ...versionedEntries.map((entry) => ({
            label: entry.version,
            url: `${REPO_URL}/releases/tag/${packageName}@${entry.version}`,
        })),
    ];

    return { header: changelog.header, entries: newEntries, links: links };
}

/**
 * Serializes a {@link Changelog} back to a `CHANGELOG.md` string.
 *
 * The output always ends with a newline. When reference links are present, a
 * blank line is inserted between the last section and the link block.
 *
 * @param changelog - The structured changelog to serialize.
 * @returns The reconstructed Markdown string.
 */
export function serializeChangelog(changelog: Changelog): string {
    let out = changelog.header;

    for (const entry of changelog.entries) {
        if ('date' in entry) {
            out += `## [${entry.version}] - ${entry.date}` + entry.content;
        } else {
            out += '## [Unreleased]' + entry.content;
        }
    }

    if (changelog.links.length > 0) {
        out += '\n' + changelog.links.map((l) => `[${l.label}]: ${l.url}`).join('\n') + '\n';
    } else if (!out.endsWith('\n')) {
        out += '\n';
    }
    return out;
}
