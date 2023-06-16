import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';

export const copyPlugin = new CopyPlugin({
  patterns: [
    {
      // копируем шрифты
      from: 'fonts',
      globOptions: {
        ignore: ['**/*.scss']
      }
    },
    {
      // копируем ассеты
      from: 'public',
      to: 'public',
      globOptions: {
        ignore: ['**/*.scss']
      }
    }
  ]
});

export const cssExtractPlugin = new MiniCssExtractPlugin({
  filename: 'style.css'
});
