import { copyFile, mkdir } from 'fs/promises';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const pkgDir = fileURLToPath(new URL('..', import.meta.url));
const distDir = resolve(pkgDir, '../../dist/packages/sigil');

async function postBuild() {
    await mkdir(distDir, { recursive: true });

    await Promise.all([
        copyFile(resolve(pkgDir, 'package.json'), resolve(distDir, 'package.json')),
        copyFile(resolve(pkgDir, 'README.md'), resolve(distDir, 'README.md')),
    ]);
}

postBuild().catch((error) => {
    console.error(error);
    process.exit(1);
});
