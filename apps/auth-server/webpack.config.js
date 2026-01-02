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
            target: 'node',
            compiler: 'tsc',
            main: './src/main.ts',
            tsConfig: './tsconfig.app.json',
            // TODO - Enable assets once the application has actual assets.
            // assets: ['./src/assets'],
            optimization: isProduction,
            outputHashing: 'none',
            generatePackageJson: isProduction,
            sourceMap: !isProduction,
        }),
    ],
};
