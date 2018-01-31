/**
 * webpack.config.js
 *
 * This config serves as both the development and production
 * Webpack config. The difference is that it's consumed by
 * either webpack-dev-server (development) or webpack itself
 * (production)
 */

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');

/**
 * Envs
 */
const ENV = process.env.NODE_ENV;
const IS_PROD = ENV === 'production';

/**
 * Directories
 */
const srcDirRelative = './src';
const distDirRelative = './dist';

const srcDir = path.join(__dirname, srcDirRelative);
const distDir = path.join(__dirname, distDirRelative);

/**
 * Plugins
 */
const definePlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(ENV)
});

const noEmitOnErrorsPlugin = new webpack.NoEmitOnErrorsPlugin();

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: './src/index.ejs',
  inject: true
});

const namedModulesPlugin = new webpack.NamedModulesPlugin();
const hmrReplacementPlugin = new webpack.HotModuleReplacementPlugin();
const uglifyWebpackPlugin = new UglifyWebpackPlugin();

const envPlugins = IS_PROD
  ? [ uglifyWebpackPlugin ]
  : [ hmrReplacementPlugin ];

const plugins = [
  definePlugin,
  noEmitOnErrorsPlugin,
  htmlWebpackPlugin,
  namedModulesPlugin,
  ...envPlugins
];

/**
 * Export config
 */
module.exports = {
  devtool: IS_PROD ? 'source-map' : 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    require.resolve('react-dev-utils/webpackHotDevClient'),
    `${srcDirRelative}/index.tsx`
  ],
  output: {
    path: distDir,
    filename: '[name].[hash:5].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        loader: 'tslint-loader',
        include: srcDir,
        exclude: /node_modules/,
        options: {
          configFile: './tslint.json',
          failOnHint: true
        }
      },
      {
        test: /\.tsx?$/,
        include: srcDir,
        exclude: /node_modules/,
        use: [
          // /**
          //  * 3. Transpile ES6 + dynamic imports into ES5
          //  ---- currently not working with hot loader
          //  */
          // 'babel-loader',
          /**
           * 2. Add react hot loader (development)
           */
          'react-hot-loader/webpack',
          {
            /**
             * 1. Transpile TypeScript into ES6 + dynamic imports
             */
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                module: 'esnext' // allows bundle splitting via dynamic imports!
              }
            }
          }
        ]
      }
    ]
  },
  plugins,
  devServer: {
    contentBase: srcDir,
    compress: true,
    port: 9000,
    hot: true
  }
};
