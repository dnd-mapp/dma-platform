import { execSync } from 'child_process';
import {
    bumpVersion,
    commitRelease,
    createReleaseBranch,
    deriveBumpType,
    getCommitsSinceTag,
    getLatestTag,
    openReleasePR,
    pushBranch,
    stageFiles,
    suggestVersion,
} from './git.js';

vi.mock('child_process');

const mockExecSync = vi.mocked(execSync);

beforeEach(() => {
    mockExecSync.mockReset();
});

describe('getLatestTag', () => {
    it('returns the first (most recent) tag from sorted output', () => {
        mockExecSync.mockReturnValue('sigil@1.2.0\nsigil@1.1.0\nsigil@1.0.0\n');

        expect(getLatestTag('sigil')).toBe('sigil@1.2.0');
    });

    it('returns null when stdout is empty', () => {
        mockExecSync.mockReturnValue('\n');

        expect(getLatestTag('sigil')).toBeNull();
    });

    it('returns null when execSync throws', () => {
        mockExecSync.mockImplementation(() => {
            throw new Error('not a git repo');
        });

        expect(getLatestTag('sigil')).toBeNull();
    });

    it('passes the correct git command', () => {
        mockExecSync.mockReturnValue('');
        getLatestTag('arcane-ui');

        expect(mockExecSync).toHaveBeenCalledWith('git tag --list "arcane-ui@*" --sort=-version:refname', {
            encoding: 'utf8',
            stdio: ['ignore', 'pipe', 'pipe'],
        });
    });
});

describe('getCommitsSinceTag', () => {
    it('parses null-byte-separated blocks into Commit objects', () => {
        mockExecSync.mockReturnValue('feat: Add button\n\0fix: Correct typo\n\0');

        const commits = getCommitsSinceTag('sigil@0.1.0', 'packages/sigil');

        expect(commits).toHaveLength(2);
        expect(commits[0]).toEqual({ subject: 'feat: Add button', body: '' });
        expect(commits[1]).toEqual({ subject: 'fix: Correct typo', body: '' });
    });

    it('captures a multi-line body', () => {
        mockExecSync.mockReturnValue('feat!: Overhaul API\n\nBREAKING CHANGE: removed foo\n\0');

        const [commit] = getCommitsSinceTag('sigil@0.1.0', 'packages/sigil');

        expect(commit.subject).toBe('feat!: Overhaul API');
        expect(commit.body).toContain('BREAKING CHANGE: removed foo');
    });

    it('includes the tag range in the git command when a tag is provided', () => {
        mockExecSync.mockReturnValue('');
        getCommitsSinceTag('sigil@0.1.0', 'packages/sigil');

        expect(mockExecSync).toHaveBeenCalledWith(expect.stringContaining('sigil@0.1.0..HEAD'), expect.anything());
    });

    it('omits the range when tag is null', () => {
        mockExecSync.mockReturnValue('');
        getCommitsSinceTag(null, 'packages/sigil');

        const [cmd] = mockExecSync.mock.calls[0] as [string, ...unknown[]];
        expect(cmd).not.toContain('..HEAD');
    });

    it('returns an empty array when stdout is empty', () => {
        mockExecSync.mockReturnValue('');

        expect(getCommitsSinceTag('sigil@0.1.0', 'packages/sigil')).toEqual([]);
    });
});

describe('deriveBumpType', () => {
    it('returns major when any subject contains the breaking-change ! marker', () => {
        expect(deriveBumpType([{ subject: 'feat!: Drop old API', body: '' }])).toBe('major');
        expect(deriveBumpType([{ subject: 'fix(core)!: Remove deprecated param', body: '' }])).toBe('major');
    });

    it('returns major when any body contains BREAKING CHANGE', () => {
        expect(deriveBumpType([{ subject: 'feat: New option', body: 'BREAKING CHANGE: old option removed' }])).toBe(
            'major',
        );
    });

    it('returns minor for a feat commit with no breaking change', () => {
        expect(deriveBumpType([{ subject: 'feat: Add dark mode', body: '' }])).toBe('minor');
        expect(deriveBumpType([{ subject: 'feat(ui): Add tooltip', body: '' }])).toBe('minor');
    });

    it('returns patch for a fix commit', () => {
        expect(deriveBumpType([{ subject: 'fix: Correct colour token', body: '' }])).toBe('patch');
    });

    it('returns patch for other conventional types', () => {
        expect(deriveBumpType([{ subject: 'chore: Bump deps', body: '' }])).toBe('patch');
        expect(deriveBumpType([{ subject: 'docs: Update README', body: '' }])).toBe('patch');
    });

    it('returns patch for an empty commits array', () => {
        expect(deriveBumpType([])).toBe('patch');
    });

    it('major wins over minor when both are present', () => {
        expect(
            deriveBumpType([
                { subject: 'feat: Add thing', body: '' },
                { subject: 'fix!: Remove thing', body: '' },
            ]),
        ).toBe('major');
    });
});

describe('bumpVersion', () => {
    it('increments the major part and resets minor and patch', () => {
        expect(bumpVersion('1.2.3', 'major')).toBe('2.0.0');
    });

    it('increments the minor part and resets patch', () => {
        expect(bumpVersion('1.2.3', 'minor')).toBe('1.3.0');
    });

    it('increments the patch part', () => {
        expect(bumpVersion('1.2.3', 'patch')).toBe('1.2.4');
    });

    it('handles 0.1.0 correctly', () => {
        expect(bumpVersion('0.1.0', 'patch')).toBe('0.1.1');
        expect(bumpVersion('0.1.0', 'minor')).toBe('0.2.0');
        expect(bumpVersion('0.1.0', 'major')).toBe('1.0.0');
    });

    it('throws for an invalid semver string', () => {
        expect(() => bumpVersion('not-a-version', 'patch')).toThrow('Invalid semver: not-a-version');
    });
});

describe('suggestVersion', () => {
    it('returns 0.1.0 when no prior tag exists', () => {
        mockExecSync.mockReturnValue('');

        expect(suggestVersion('sigil', 'packages/sigil')).toBe('0.1.0');
    });

    it('suggests a minor bump for a feat commit', () => {
        mockExecSync.mockReturnValueOnce('sigil@0.1.0\n').mockReturnValueOnce('feat: Add dark mode\n\0');

        expect(suggestVersion('sigil', 'packages/sigil')).toBe('0.2.0');
    });

    it('suggests a major bump for a breaking commit', () => {
        mockExecSync.mockReturnValueOnce('sigil@0.1.0\n').mockReturnValueOnce('feat!: Overhaul tokens\n\0');

        expect(suggestVersion('sigil', 'packages/sigil')).toBe('1.0.0');
    });

    it('suggests a patch bump for a fix commit', () => {
        mockExecSync.mockReturnValueOnce('sigil@1.2.3\n').mockReturnValueOnce('fix: Correct shadow token\n\0');

        expect(suggestVersion('sigil', 'packages/sigil')).toBe('1.2.4');
    });
});

describe('createReleaseBranch', () => {
    it('runs the correct git checkout command', () => {
        createReleaseBranch('release/sigil-0.1.0');

        expect(mockExecSync).toHaveBeenCalledWith('git checkout -b release/sigil-0.1.0', { stdio: 'inherit' });
    });
});

describe('stageFiles', () => {
    it('passes all file paths to git add', () => {
        stageFiles(['packages/sigil/package.json', 'packages/sigil/CHANGELOG.md']);

        expect(mockExecSync).toHaveBeenCalledWith('git add packages/sigil/package.json packages/sigil/CHANGELOG.md', {
            stdio: 'inherit',
        });
    });
});

describe('commitRelease', () => {
    it('uses the conventional commit message format', () => {
        commitRelease('sigil', '0.1.0');

        expect(mockExecSync).toHaveBeenCalledWith('git commit -m "release(sigil): 0.1.0"', { stdio: 'inherit' });
    });
});

describe('pushBranch', () => {
    it('pushes to origin with upstream tracking', () => {
        pushBranch('release/sigil-0.1.0');

        expect(mockExecSync).toHaveBeenCalledWith('git push -u origin release/sigil-0.1.0', { stdio: 'inherit' });
    });
});

describe('openReleasePR', () => {
    it('calls gh pr create with the correct title and base branch', () => {
        openReleasePR('sigil', '0.1.0');

        expect(mockExecSync).toHaveBeenCalledWith(
            'gh pr create --base main --title "release(sigil): 0.1.0" --body ""',
            { stdio: 'inherit' },
        );
    });
});
