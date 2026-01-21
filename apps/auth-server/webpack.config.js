const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

const isProduction = process.env['NODE_ENV'] === 'production';

module.exports = {
    output: {
        path: join(__dirname, '../../dist/apps/auth-server'),
        clean: true,
        ...(isProduction ? {} : { devtoolModuleFilenameTemplate: '[absolute-resource-path]' }),
    },
    plugins: [
        new NxAppWebpackPlugin({
            // assets: ['./src/assets'],
            compiler: 'tsc',
            externalDependencies: 'all',
            extractLicenses: isProduction,
            generatePackageJson: isProduction,
            main: './src/main.ts',
            optimization: isProduction,
            outputHashing: 'none',
            sourceMap: !isProduction,
            target: 'node',
            tsConfig: './tsconfig.app.json',
        }),
    ],
};
