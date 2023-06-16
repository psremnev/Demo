import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const webpack5esmInteropRule = {
  test: /\.m?js/,
  resolve: {
    fullySpecified: false
  }
};

export const tsRule = {
  test: /\.(ts|tsx|js)$/,
  use: {
    loader: 'ts-loader',
    options: { transpileOnly: true } // отключает проверку типов, заменить на ForkTsCheckerWebpackPlugin
  },
  exclude: /node_modules/
};

export const babelRule = {
  test: /\.(ts|tsx|js)?$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env', '@babel/preset-typescript']
    }
  }
};

export const fontsRule = {
  test: /\.(woff(2)?|ttf|eot|svg)$/,
  loader: 'file-loader'
};

export const scssRuleWithExtractPlugin = {
  test: /\.(sa|sc|c)ss$/,
  use: [
    { loader: MiniCssExtractPlugin.loader },
    { loader: 'css-loader', options: { url: false } }, // важно, чтобы в css не хешировались url
    { loader: 'sass-loader' },
    { loader: 'postcss-loader' }
  ]
};

export const scssRule = {
  test: /\.(sa|sc|c)ss$/,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader', options: { url: false } }, // важно, чтобы в css не хешировались url
    { loader: 'sass-loader' },
    { loader: 'postcss-loader' }
  ]
};

export const imgRule = {
  test: /\.(png|jpg|gif)$/,
  loader: 'file-loader',
  options: {
    name: 'images/[name].[ext]'
  }
};
