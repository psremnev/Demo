import { default as devConfig } from './webpack.dev.js';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

const [server, client] = devConfig;

const config = {
  mode: 'production',
  externals: {
    express: 'express',
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
};

export default [
  {
    ...config,
    ...server,
  },
  {
    ...config,
    ...client,
  },
];
