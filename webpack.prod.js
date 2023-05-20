import { default as devConfig } from './webpack.dev.js';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

const config = {
  mode: 'production',
  watch: false,
  externals: {
    express: 'express',
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()]
  }
};

export default {
  ...devConfig,
  ...config
};
