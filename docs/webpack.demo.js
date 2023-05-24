import * as path from 'path';
import { fileURLToPath } from 'url';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import {tsRule, scssRule} from '../webpackRules.js';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'production',
  watch: true,
  watchOptions: {
    ignored: ['**/node_modules/', '**/build'],
  },
  entry: {
    demo: './src/client_modules/Demo/Demo.tsx',
  },
  output: {
    path: `${__dirname}`,
    filename: '[name].js',
    chunkFormat: 'module',
  },
  experiments: {
    outputModule: true,
    topLevelAwait: true,
  },
  module: {
    rules: [tsRule, scssRule],
  },
  target: 'node',
  resolve: {
    extensions: ['.ts', '.tsx'],
    // TsconfigPathsPlugin - чтобы работали пути импорта из tsconfig
    plugins: [
      new TsconfigPathsPlugin({ configFile: `${__dirname}/../tsconfig.json` }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
};
