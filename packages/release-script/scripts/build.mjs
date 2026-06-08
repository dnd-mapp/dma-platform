import { build } from 'esbuild';
import { rm } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../..', import.meta.url));
const outDir = join(root, 'scripts/release');

async function main() {
    await rm(outDir, { recursive: true, force: true });

    await build({
        entryPoints: ['src/index.ts'],
        bundle: true,
        format: 'cjs',
        platform: 'node',
        target: 'node24',
        outfile: join(outDir, 'index.js'),
    });

    process.exit(0);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
