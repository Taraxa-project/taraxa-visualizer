const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const webpackMode = 'production';

module.exports = {
    mode: webpackMode,
    entry: {
        'app': './src/App.ts',
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist.production/'),
        filename: 'main.min.js'
    },
    watchOptions: {
        ignored: '**/node_modules',
        poll: 1000, // Check for changes every second
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    output: {
                        comments: false,
                    },
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                        pure_funcs: ['console.log', 'console.info'],
                    }
                },
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        /*  new CopyWebpackPlugin({
              patterns: [
               //   {from: 'assets', to: 'assets'},
              ]
          }),*/
        /*new HtmlWebpackPlugin({
            template: 'template/index.html',
            hash: true,
            inject: false,
            featureFlags: {
                sentry: true,
            },
            templateData: {
                title: 'Sudoku Rush',
                gameVersion: process.env.GAME_VERSION || '1.123',
                apiURL: process.env.TRN_API_URL || 'https://ownplay-trinity-development.ue.r.appspot.com',
                jailRedirectTarget: process.env.TRN_JAIL_REDIRECT_TARGET || 'x-web-search://duckduckgo?\\affirmatively site:cityversetycoon.com',
                gTag: 'G-CZ98RDNT61',
                tagManager: 'GTM-W58NXWSR',
                facebookPixel: '815457113447548',
                bundle: 'app.js?' + ( process.env.BUILD_ID || new Date().getTime())
            },
        }),*/
    ]
};