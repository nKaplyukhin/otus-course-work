const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const port = 3000;
const dist = path.join(__dirname, 'dist');
const src = path.join(__dirname, 'src');

module.exports = (_, args) => ({
  entry: './index.tsx',
  devtool: 'source-map',
  context: src,
  devServer: {
    port,
    hot: true,
    historyApiFallback: true,
  },
  resolve: {
    modules: [src, 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      src,
    },
  },
  output: {
    path: dist,
    publicPath: args.mode === 'development' ? `http://localhost:${port}/` : 'https://github.com/nKaplyukhin',
    filename: `js/[name].js`,
    chunkFilename: `js/[name].js`,
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svg/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: './favicon.svg',
    }),
    new CleanWebpackPlugin(),
  ],
});
