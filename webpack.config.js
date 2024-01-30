const path = require('path');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');

dotenv.config();
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
    publicPath:
      args.mode === 'development' ? `http://localhost:${port}/` : 'https://nkaplyukhin.github.io/otus-course-work',
    filename: `js/[name].js`,
    chunkFilename: `js/[name].js`,
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({
            before: [args.mode === 'development' && ReactRefreshTypeScript()].filter(Boolean),
          }),
          transpileOnly: args.mode === 'development',
        },
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
    new DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    args.mode === 'development' && new ReactRefreshWebpackPlugin(),
  ],
});
