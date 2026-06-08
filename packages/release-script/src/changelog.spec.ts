import { describe, expect, it } from 'vitest';
import type { Changelog } from './changelog.js';
import { parseChangelog, promoteChangelog, serializeChangelog } from './changelog.js';

// Mirrors the real sigil CHANGELOG format — header + [Unreleased] with content, no prior releases.
const FIXTURE_INITIAL = `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial feature

### Changed

- Some change
`;

const FIXTURE_WITH_VERSIONS = `# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- New feature

## [0.1.0] - 2026-01-01

### Added

- Initial release

[Unreleased]: https://github.com/dnd-mapp/dma-platform/compare/sigil@0.1.0...HEAD
[0.1.0]: https://github.com/dnd-mapp/dma-platform/releases/tag/sigil@0.1.0
`;

describe('parseChangelog', () => {
    it('parses a minimal file with only an empty [Unreleased] section', () => {
        const input = `# Changelog\n\n## [Unreleased]\n`;
        const result = parseChangelog(input);

        expect(result.header).toBe('# Changelog\n\n');
        expect(result.entries).toHaveLength(1);
        expect(result.entries[0]).toEqual({ version: 'Unreleased', content: '\n' });
        expect(result.links).toEqual([]);
    });

    it('parses an [Unreleased] section with content', () => {
        const result = parseChangelog(FIXTURE_INITIAL);

        expect(result.header).toContain('# Changelog');
        expect(result.entries).toHaveLength(1);

        const entry = result.entries[0];

        expect(entry.version).toBe('Unreleased');
        expect(entry.content).toContain('### Added');
        expect(entry.content).toContain('### Changed');
        expect(result.links).toEqual([]);
    });

    it('parses versioned entries and reference links', () => {
        const result = parseChangelog(FIXTURE_WITH_VERSIONS);

        expect(result.entries).toHaveLength(2);
        expect(result.entries[0].version).toBe('Unreleased');

        const versioned = result.entries[1];
        expect(versioned.version).toBe('0.1.0');

        if (versioned.version !== 'Unreleased' && 'date' in versioned) {
            expect(versioned.date).toBe('2026-01-01');
        }
        expect(result.links).toHaveLength(2);
        expect(result.links[0]).toEqual({
            label: 'Unreleased',
            url: 'https://github.com/dnd-mapp/dma-platform/compare/sigil@0.1.0...HEAD',
        });
        expect(result.links[1]).toEqual({
            label: '0.1.0',
            url: 'https://github.com/dnd-mapp/dma-platform/releases/tag/sigil@0.1.0',
        });
    });

    it('round-trips: parse → serialize produces the original string', () => {
        for (const fixture of [FIXTURE_INITIAL, FIXTURE_WITH_VERSIONS]) {
            expect(serializeChangelog(parseChangelog(fixture))).toBe(fixture);
        }
    });
});

describe('promoteChangelog', () => {
    it('promotes [Unreleased] content to the versioned entry', () => {
        const changelog = parseChangelog(FIXTURE_INITIAL);
        const result = promoteChangelog({ changelog, packageName: 'sigil', version: '0.1.0', date: '2026-06-08' });

        const versioned = result.entries.find((entry) => entry.version === '0.1.0');
        expect(versioned).toBeDefined();
        if (versioned === undefined) return;
        expect(versioned.content).toContain('### Added');
        expect(versioned.content).toContain('Initial feature');
    });

    it('inserts a fresh empty [Unreleased] section above the promoted entry', () => {
        const changelog = parseChangelog(FIXTURE_INITIAL);
        const result = promoteChangelog({ changelog, packageName: 'sigil', version: '0.1.0', date: '2026-06-08' });

        expect(result.entries[0].version).toBe('Unreleased');
        expect(result.entries[0].content).toBe('\n\n');
        expect(result.entries[1].version).toBe('0.1.0');
    });

    it('produces an [Unreleased] link and one versioned link on the first release', () => {
        const changelog = parseChangelog(FIXTURE_INITIAL);
        const result = promoteChangelog({ changelog, packageName: 'sigil', version: '0.1.0', date: '2026-06-08' });

        expect(result.links).toHaveLength(2);
        expect(result.links[0]).toEqual({
            label: 'Unreleased',
            url: 'https://github.com/dnd-mapp/dma-platform/compare/sigil@0.1.0...HEAD',
        });
        expect(result.links[1]).toEqual({
            label: '0.1.0',
            url: 'https://github.com/dnd-mapp/dma-platform/releases/tag/sigil@0.1.0',
        });
    });

    it('uses the newest version as the [Unreleased] compare base on subsequent releases', () => {
        const first = promoteChangelog({
            changelog: parseChangelog(FIXTURE_INITIAL),
            packageName: 'sigil',
            version: '0.1.0',
            date: '2026-01-01',
        });
        const second = promoteChangelog({
            changelog: first,
            packageName: 'sigil',
            version: '0.2.0',
            date: '2026-06-08',
        });

        expect(second.links).toHaveLength(3);
        expect(second.links[0]).toEqual({
            label: 'Unreleased',
            url: 'https://github.com/dnd-mapp/dma-platform/compare/sigil@0.2.0...HEAD',
        });
        expect(second.links[1]).toEqual({
            label: '0.2.0',
            url: 'https://github.com/dnd-mapp/dma-platform/releases/tag/sigil@0.2.0',
        });
        expect(second.links[2]).toEqual({
            label: '0.1.0',
            url: 'https://github.com/dnd-mapp/dma-platform/releases/tag/sigil@0.1.0',
        });
    });

    it('throws when no [Unreleased] section is present', () => {
        const changelog: Changelog = { header: '# Changelog\n\n', entries: [], links: [] };
        expect(() =>
            promoteChangelog({ changelog, packageName: 'sigil', version: '0.1.0', date: '2026-06-08' }),
        ).toThrow('No [Unreleased] section found');
    });
});

describe('serializeChangelog', () => {
    it('produces a versioned heading with date and blank-line-separated links', () => {
        const changelog = parseChangelog(FIXTURE_INITIAL);
        const result = serializeChangelog(
            promoteChangelog({ changelog, packageName: 'sigil', version: '0.1.0', date: '2026-06-08' }),
        );

        expect(result).toContain('## [Unreleased]\n\n## [0.1.0] - 2026-06-08\n');
        expect(result).toContain(
            '\n[Unreleased]: https://github.com/dnd-mapp/dma-platform/compare/sigil@0.1.0...HEAD\n',
        );
        expect(result).toContain('[0.1.0]: https://github.com/dnd-mapp/dma-platform/releases/tag/sigil@0.1.0\n');
    });

    it('places [Unreleased] link before versioned links', () => {
        const changelog = parseChangelog(FIXTURE_INITIAL);
        const result = serializeChangelog(
            promoteChangelog({ changelog, packageName: 'sigil', version: '0.1.0', date: '2026-06-08' }),
        );
        const unreleasedPos = result.indexOf('[Unreleased]:');
        const versionedPos = result.indexOf('[0.1.0]:');

        expect(unreleasedPos).toBeGreaterThan(-1);
        expect(versionedPos).toBeGreaterThan(unreleasedPos);
    });
});
