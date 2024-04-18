const fs = require('fs');
const path = require('path');

const LiveReloadPlugin = require('webpack-livereload-plugin');
/*const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");*/
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'development',
    entry: {
        'app': './src/App.ts',
    },
    watch: true,
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name].js'
    },
    watchOptions: {
        ignored: '**/node_modules',
        //  poll: 1000, // Check for changes every second
    },
    externals: {
        "pixi.js": "PIXI",
        // 'dat.GUI': 'dat.gui'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',

                /*    use: {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        },
                    },*/
                exclude: /node_modules/
            }
        ]
    },
    /*  optimization: {
          minimizer: [
              new TerserPlugin({
                  extractComments: false,
                  terserOptions: {
                      output: {
                          comments: false,
                      },
                      /!*   compress: {
                             drop_console: true,
                             drop_debugger: true,
                             pure_funcs: ['console.log', 'console.info'],
                         }*!/
                  },
              }),
          ],
      },*/
    plugins: [
        /* new CopyWebpackPlugin({
             patterns: [
                 {from: 'assets', to: 'assets'},
             ]
         }),*/
        // new webpack.HotModuleReplacementPlugin(),
        new LiveReloadPlugin(),
        //new BundleAnalyzerPlugin()
    ]
};