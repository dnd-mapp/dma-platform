import { cp, mkdir, readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const pkgDir = fileURLToPath(new URL('..', import.meta.url));
const fontsDir = resolve(pkgDir, 'assets/fonts');
const nodeModules = resolve(pkgDir, '../../node_modules');

const files = [
    {
        src: resolve(nodeModules, '@fontsource/metamorphous/files/metamorphous-latin-400-normal.woff2'),
        dest: resolve(fontsDir, 'Metamorphous-Regular.woff2'),
    },
    {
        src: resolve(nodeModules, '@fontsource-variable/lora/files/lora-latin-wght-normal.woff2'),
        dest: resolve(fontsDir, 'Lora-Variable.woff2'),
    },
    {
        src: resolve(nodeModules, '@fontsource-variable/lora/files/lora-latin-wght-italic.woff2'),
        dest: resolve(fontsDir, 'Lora-Variable-Italic.woff2'),
    },
    {
        src: resolve(nodeModules, '@fontsource-variable/inconsolata/files/inconsolata-latin-wght-normal.woff2'),
        dest: resolve(fontsDir, 'Inconsolata-Variable.woff2'),
    },
];

async function downloadFonts() {
    await mkdir(fontsDir, { recursive: true });

    await Promise.all(files.map(({ src, dest }) => cp(src, dest)));

    const license = await readFile(resolve(nodeModules, '@fontsource/metamorphous/LICENSE'), 'utf8');
    await writeFile(resolve(fontsDir, 'LICENSE.txt'), license);

    console.log(`Copied ${files.length} font files to assets/fonts/`);
}

downloadFonts().catch((error) => {
    console.error(error);
    process.exit(1);
});
