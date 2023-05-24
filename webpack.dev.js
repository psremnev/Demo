import * as path from 'path';
import { fileURLToPath } from 'url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import {
  tsRule,
  scssRule,
  fontsRule,
  imgRule,
  webpack5esmInteropRule,
} from './webpackRules.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('__dirname', __dirname);
const resolveCfg = {
  extensions: ['.js', '.jsx', '.css'],
  // TsconfigPathsPlugin - чтобы работали пути импорта из tsconfig
  plugins: [
    new TsconfigPathsPlugin({ configFile: `${__dirname}/tsconfig.json` }),
  ],
};

export default {
  mode: 'development',
  watch: true,
  watchOptions: {
    ignored: ['**/node_modules/', '**/build'],
  },
  entry: {
    server: './src/server.tsx',
    client: './src/client.tsx',
  },
  output: {
    path: `${__dirname}/build`,
    filename: '[name].js',
    chunkFormat: 'module',
    clean: true,
    pathinfo: false,
  },
  experiments: {
    outputModule: true,
    topLevelAwait: true,
  },
  target: 'node',
  module: {
    rules: [webpack5esmInteropRule, tsRule, scssRule, imgRule, fontsRule],
  },
  resolve: resolveCfg,
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          // копируем шрифты
          from: 'src/fonts',
          globOptions: {
            ignore: ['**/*.scss'],
          },
        },
        {
          // копируем ассеты
          from: 'src/public',
          to: 'public',
          globOptions: {
            ignore: ['**/*.scss'],
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    })
  ]
};
