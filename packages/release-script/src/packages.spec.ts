import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { discoverPackages } from './packages.js';

vi.mock('fs/promises');

const mockReaddir = vi.mocked(readdir);
const mockReadFile = vi.mocked(readFile);

const ROOT = '/repo';

function pkgJson(name: string, version: string): string {
    return JSON.stringify({ name, version });
}

beforeEach(() => {
    mockReaddir.mockReset();
    mockReadFile.mockReset();
});

describe('discoverPackages', () => {
    it('returns an empty array when both workspace directories are missing', async () => {
        mockReaddir.mockRejectedValue(new Error('ENOENT'));

        expect(await discoverPackages(ROOT)).toEqual([]);
    });

    it('returns an empty array when all entries lack a package.json', async () => {
        mockReaddir.mockImplementation((dirPath) => {
            if (dirPath === join(ROOT, 'apps'))
                return Promise.resolve(['realm'] as unknown as Awaited<ReturnType<typeof readdir>>);
            return Promise.reject(new Error('ENOENT'));
        });
        mockReadFile.mockRejectedValue(new Error('ENOENT'));

        expect(await discoverPackages(ROOT)).toEqual([]);
    });

    it('discovers packages from apps/ and packages/', async () => {
        mockReaddir.mockImplementation((dirPath) => {
            if (dirPath === join(ROOT, 'apps'))
                return Promise.resolve(['realm'] as unknown as Awaited<ReturnType<typeof readdir>>);
            if (dirPath === join(ROOT, 'packages'))
                return Promise.resolve(['sigil'] as unknown as Awaited<ReturnType<typeof readdir>>);
            return Promise.reject(new Error('ENOENT'));
        });
        mockReadFile.mockImplementation((filePath) => {
            if (filePath === join(ROOT, 'apps', 'realm', 'package.json'))
                return Promise.resolve(pkgJson('@dnd-mapp/realm', '0.0.0'));
            if (filePath === join(ROOT, 'packages', 'sigil', 'package.json'))
                return Promise.resolve(pkgJson('@dnd-mapp/sigil', '1.2.0'));
            return Promise.reject(new Error('ENOENT'));
        });

        const result = await discoverPackages(ROOT);

        expect(result).toHaveLength(2);
        expect(result.map((p) => p.name)).toEqual(['@dnd-mapp/realm', '@dnd-mapp/sigil']);
    });

    it('sorts results alphabetically by name', async () => {
        mockReaddir.mockImplementation((dirPath) => {
            if (dirPath === join(ROOT, 'apps'))
                return Promise.resolve(['realm'] as unknown as Awaited<ReturnType<typeof readdir>>);
            if (dirPath === join(ROOT, 'packages'))
                return Promise.resolve(['sigil', 'arcane-ui'] as unknown as Awaited<ReturnType<typeof readdir>>);
            return Promise.reject(new Error('ENOENT'));
        });
        mockReadFile.mockImplementation((filePath) => {
            if (filePath === join(ROOT, 'apps', 'realm', 'package.json'))
                return Promise.resolve(pkgJson('@dnd-mapp/realm', '0.0.0'));
            if (filePath === join(ROOT, 'packages', 'sigil', 'package.json'))
                return Promise.resolve(pkgJson('@dnd-mapp/sigil', '0.0.0'));
            if (filePath === join(ROOT, 'packages', 'arcane-ui', 'package.json'))
                return Promise.resolve(pkgJson('@dnd-mapp/arcane-ui', '0.0.0'));
            return Promise.reject(new Error('ENOENT'));
        });

        const result = await discoverPackages(ROOT);

        expect(result[0].name).toBe('@dnd-mapp/arcane-ui');
        expect(result[1].name).toBe('@dnd-mapp/realm');
        expect(result[2].name).toBe('@dnd-mapp/sigil');
    });

    it('skips entries with malformed JSON', async () => {
        mockReaddir.mockImplementation((dirPath) => {
            if (dirPath === join(ROOT, 'packages'))
                return Promise.resolve(['bad', 'sigil'] as unknown as Awaited<ReturnType<typeof readdir>>);
            return Promise.reject(new Error('ENOENT'));
        });
        mockReadFile.mockImplementation((filePath) => {
            if (filePath === join(ROOT, 'packages', 'bad', 'package.json')) return Promise.resolve('not valid json');
            if (filePath === join(ROOT, 'packages', 'sigil', 'package.json'))
                return Promise.resolve(pkgJson('@dnd-mapp/sigil', '0.0.0'));
            return Promise.reject(new Error('ENOENT'));
        });

        const result = await discoverPackages(ROOT);

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('@dnd-mapp/sigil');
    });

    it('skips entries missing the name field', async () => {
        mockReaddir.mockImplementation((dirPath) => {
            if (dirPath === join(ROOT, 'packages'))
                return Promise.resolve(['sigil'] as unknown as Awaited<ReturnType<typeof readdir>>);
            return Promise.reject(new Error('ENOENT'));
        });
        mockReadFile.mockResolvedValue(JSON.stringify({ version: '1.0.0' }));

        expect(await discoverPackages(ROOT)).toEqual([]);
    });

    it('skips entries missing the version field', async () => {
        mockReaddir.mockImplementation((dirPath) => {
            if (dirPath === join(ROOT, 'packages'))
                return Promise.resolve(['sigil'] as unknown as Awaited<ReturnType<typeof readdir>>);
            return Promise.reject(new Error('ENOENT'));
        });
        mockReadFile.mockResolvedValue(JSON.stringify({ name: '@dnd-mapp/sigil' }));

        expect(await discoverPackages(ROOT)).toEqual([]);
    });

    it('stores the path relative to the root with forward slashes', async () => {
        mockReaddir.mockImplementation((dirPath) => {
            if (dirPath === join(ROOT, 'packages'))
                return Promise.resolve(['sigil'] as unknown as Awaited<ReturnType<typeof readdir>>);
            return Promise.reject(new Error('ENOENT'));
        });
        mockReadFile.mockResolvedValue(pkgJson('@dnd-mapp/sigil', '0.0.0'));

        const result = await discoverPackages(ROOT);

        expect(result[0].path).toBe('packages/sigil');
    });
});
