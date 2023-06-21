import * as path from 'path';
import { fileURLToPath } from 'url';

import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import {
  tsRule,
  scssRuleWithExtractPlugin,
  fontsRule,
  imgRule,
  webpack5esmInteropRule,
  babelRule
} from './webpackUtils/webpackRules.js';
import {
  copyPlugin,
  cssExtractPlugin
} from './webpackUtils/webpackPlugins.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resolveCfg = {
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
  // TsconfigPathsPlugin - чтобы работали пути импорта из tsconfig
  plugins: [
    new TsconfigPathsPlugin({ configFile: `${__dirname}/tsconfig.json` })
  ]
};

const getConfig = ({
  entry,
  client = true,
  outputName = '[name]',
  mode = 'development'
}) => {
  return {
    mode,
    watch: true,
    watchOptions: {
      ignored: ['**/node_modules/', '**/build']
    },
    entry,
    output: {
      path: `${__dirname}/build`,
      filename: `${outputName}.js`,
      chunkFormat: 'module'
    },
    experiments: {
      outputModule: true,
      topLevelAwait: true
    },
    target: client ? 'web' : 'async-node',
    module: {
      rules: [
        webpack5esmInteropRule,
        tsRule,
        scssRuleWithExtractPlugin,
        imgRule,
        fontsRule,
        babelRule
      ]
    },
    resolve: resolveCfg,
    plugins: [copyPlugin, cssExtractPlugin]
  };
};

export default [
  getConfig({ entry: './client/endpoint.tsx', outputName: 'client' }),
  getConfig({
    entry: './server/endpoint.tsx',
    client: false,
    outputName: 'server'
  })
];
