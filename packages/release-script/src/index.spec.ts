import { confirm, input, select } from '@inquirer/prompts';
import { execSync } from 'child_process';
import { readFile, readdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { main } from './index.js';

vi.mock('@inquirer/prompts');
vi.mock('child_process');
vi.mock('fs/promises');

const mockSelect = vi.mocked(select);
const mockInput = vi.mocked(input);
const mockConfirm = vi.mocked(confirm);
const mockReaddir = vi.mocked(readdir as unknown as (path: string) => Promise<string[]>);
const mockReadFile = vi.mocked(readFile as unknown as (path: string) => Promise<string>);
const mockWriteFile = vi.mocked(writeFile);
const mockExecSync = vi.mocked(execSync);

const fakePkgJson = '{"name":"@dnd-mapp/sigil","version":"0.1.0"}';
const fakeChangelog = '# Changelog\n\n## [Unreleased]\n\n### Added\n- Something new\n';

let exitSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
    exitSpy = vi.spyOn(process, 'exit').mockImplementation((code) => {
        throw new Error(`process.exit(${String(code)})`);
    });
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    mockReaddir.mockImplementation((path) => {
        if (path.endsWith('packages')) return Promise.resolve(['sigil']);
        return Promise.reject(Object.assign(new Error('ENOENT'), { code: 'ENOENT' }));
    });
    mockReadFile.mockImplementation((path) => {
        if (path.endsWith('CHANGELOG.md')) return Promise.resolve(fakeChangelog);
        return Promise.resolve(fakePkgJson);
    });
    mockWriteFile.mockResolvedValue(undefined);

    mockExecSync.mockImplementation((cmd: string) => {
        if (cmd.startsWith('git tag')) return '@dnd-mapp/sigil@0.1.0\n';
        if (cmd.startsWith('git log')) return 'feat: Add something\n\0';
        return '';
    });

    mockSelect.mockResolvedValue({
        name: '@dnd-mapp/sigil',
        version: '0.1.0',
        path: 'packages/sigil',
        suggestedVersion: '0.2.0',
    });
    mockInput.mockResolvedValue('0.2.0');
    mockConfirm.mockResolvedValue(true);
});

afterEach(() => {
    vi.restoreAllMocks();
});

describe('main — happy path', () => {
    it('presents discovered packages with calculated versions for selection', async () => {
        await main();
        expect(mockSelect).toHaveBeenCalledWith(
            expect.objectContaining({
                choices: [
                    expect.objectContaining({
                        name: '@dnd-mapp/sigil (0.1.0)',
                        value: expect.objectContaining({
                            name: '@dnd-mapp/sigil',
                            suggestedVersion: '0.2.0',
                        }) as object,
                    }),
                ],
            }),
        );
    });

    it('prompts for the version with the suggested version as default', async () => {
        await main();
        expect(mockInput).toHaveBeenCalledWith(
            expect.objectContaining({ message: 'Version to release:', default: '0.2.0' }),
        );
    });

    it('prompts for confirmation', async () => {
        await main();
        expect(mockConfirm).toHaveBeenCalledWith(expect.objectContaining({ message: 'Proceed with release?' }));
    });

    it('writes the bumped version to package.json', async () => {
        await main();
        expect(mockWriteFile).toHaveBeenCalledWith(
            join(process.cwd(), 'packages/sigil', 'package.json'),
            expect.stringContaining('"version": "0.2.0"'),
        );
    });

    it('promotes the changelog', async () => {
        await main();
        expect(mockWriteFile).toHaveBeenCalledWith(
            join(process.cwd(), 'packages/sigil', 'CHANGELOG.md'),
            expect.stringContaining('## [0.2.0]'),
        );
    });

    it('creates the release branch', async () => {
        await main();
        expect(mockExecSync).toHaveBeenCalledWith('git checkout -b release/sigil-0.2.0', expect.anything());
    });

    it('stages the changed files', async () => {
        await main();
        expect(mockExecSync).toHaveBeenCalledWith(
            'git add packages/sigil/package.json packages/sigil/CHANGELOG.md',
            expect.anything(),
        );
    });

    it('commits the release', async () => {
        await main();
        expect(mockExecSync).toHaveBeenCalledWith('git commit -m "release(sigil): 0.2.0"', expect.anything());
    });

    it('pushes the branch', async () => {
        await main();
        expect(mockExecSync).toHaveBeenCalledWith('git push -u origin release/sigil-0.2.0', expect.anything());
    });

    it('opens the pull request', async () => {
        await main();
        expect(mockExecSync).toHaveBeenCalledWith(
            'gh pr create --base main --title "release(sigil): 0.2.0" --body ""',
            expect.anything(),
        );
    });

    it('does not call process.exit', async () => {
        await main();
        expect(exitSpy).not.toHaveBeenCalled();
    });
});

describe('main — version input validation', () => {
    it('accepts a valid semver string', async () => {
        await main();
        const { validate } = mockInput.mock.calls[0][0] as { validate: (v: string) => true | string };
        expect(validate('2.0.0')).toBe(true);
    });

    it('rejects an invalid semver string', async () => {
        await main();
        const { validate } = mockInput.mock.calls[0][0] as { validate: (v: string) => true | string };
        expect(validate('not-a-version')).toBe('"not-a-version" is not a valid semver string');
    });
});

describe('main — version override', () => {
    beforeEach(() => {
        mockInput.mockResolvedValue('1.0.0');
    });

    it('uses the overridden version for the branch name', async () => {
        await main();
        expect(mockExecSync).toHaveBeenCalledWith('git checkout -b release/sigil-1.0.0', expect.anything());
    });

    it('commits with the overridden version', async () => {
        await main();
        expect(mockExecSync).toHaveBeenCalledWith('git commit -m "release(sigil): 1.0.0"', expect.anything());
    });

    it('pushes the branch with the overridden version', async () => {
        await main();
        expect(mockExecSync).toHaveBeenCalledWith('git push -u origin release/sigil-1.0.0', expect.anything());
    });

    it('opens the PR with the overridden version', async () => {
        await main();
        expect(mockExecSync).toHaveBeenCalledWith(
            'gh pr create --base main --title "release(sigil): 1.0.0" --body ""',
            expect.anything(),
        );
    });

    it('writes the overridden version to package.json', async () => {
        await main();
        expect(mockWriteFile).toHaveBeenCalledWith(
            expect.stringContaining('package.json'),
            expect.stringContaining('"version": "1.0.0"'),
        );
    });
});

describe('main — cancellation', () => {
    beforeEach(() => {
        mockConfirm.mockResolvedValue(false);
    });

    it('calls process.exit(0)', async () => {
        await expect(main()).rejects.toThrow('process.exit(0)');
        expect(exitSpy).toHaveBeenCalledWith(0);
    });

    it('does not write any files', async () => {
        await expect(main()).rejects.toThrow();
        expect(mockWriteFile).not.toHaveBeenCalled();
    });

    it('does not create a branch', async () => {
        await expect(main()).rejects.toThrow();
        expect(mockExecSync).not.toHaveBeenCalledWith(expect.stringContaining('git checkout'), expect.anything());
    });

    it('does not stage, commit, push, or open a PR', async () => {
        await expect(main()).rejects.toThrow();
        expect(mockExecSync).not.toHaveBeenCalledWith(expect.stringContaining('git add'), expect.anything());
        expect(mockExecSync).not.toHaveBeenCalledWith(expect.stringContaining('git commit'), expect.anything());
        expect(mockExecSync).not.toHaveBeenCalledWith(expect.stringContaining('git push'), expect.anything());
        expect(mockExecSync).not.toHaveBeenCalledWith(expect.stringContaining('gh pr'), expect.anything());
    });
});

describe('main — no packages found', () => {
    beforeEach(() => {
        mockReaddir.mockRejectedValue(Object.assign(new Error('ENOENT'), { code: 'ENOENT' }));
    });

    it('calls process.exit(1)', async () => {
        await expect(main()).rejects.toThrow('process.exit(1)');
        expect(exitSpy).toHaveBeenCalledWith(1);
    });

    it('does not show the package selection prompt', async () => {
        await expect(main()).rejects.toThrow();
        expect(mockSelect).not.toHaveBeenCalled();
    });
});
