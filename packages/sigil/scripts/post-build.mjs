import { cp, mkdir, readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const pkgDir = fileURLToPath(new URL('..', import.meta.url));
const distDir = resolve(pkgDir, '../../dist/packages/sigil');

async function postBuild() {
    await mkdir(distDir, { recursive: true });

    const pkg = JSON.parse(await readFile(resolve(pkgDir, 'package.json'), 'utf8'));
    delete pkg.scripts;

    await Promise.all([
        writeFile(resolve(distDir, 'package.json'), JSON.stringify(pkg, null, 2) + '\n'),
        cp(resolve(pkgDir, 'README.md'), resolve(distDir, 'README.md')),
        cp(resolve(pkgDir, 'src/primitives'), resolve(distDir, 'primitives'), { recursive: true }),
        cp(resolve(pkgDir, 'src/tokens'), resolve(distDir, 'tokens'), { recursive: true }),
        cp(resolve(pkgDir, 'assets'), resolve(distDir, 'assets'), { recursive: true }),
    ]);
}

postBuild().catch((error) => {
    console.error(error);
    process.exit(1);
});
