import { dirname, join, resolve } from 'path';
import sharp from 'sharp';

const sizes = [16, 32, 57, 60, 72, 76, 96, 114, 120, 144, 152, 180, 192];

const inputFilePath = resolve('apps/admin-client/public/images/favicon-512.png');
const outputFolderPath = dirname(inputFilePath);

async function generateFavIcon(size: number) {
    const outputFilePath = join(outputFolderPath, `favicon-${size}.png`);

    await sharp(inputFilePath).resize(size, size).png({ compressionLevel: 9 }).toFile(outputFilePath);

    console.log(`Generated "${outputFilePath}"`);
}

async function generateIcons() {
    console.log('Generating icons...');

    await Promise.all(sizes.map((size) => generateFavIcon(size)));

    console.log('Done');
}

generateIcons().catch((error) => console.error(error));
