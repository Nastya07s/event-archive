const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATH = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets',
};

module.exports = {

  externals: {
    paths: PATH,
  },
  entry: {
    app: PATH.src,
    articles: `${PATH.src}/js/articles`,
    article: `${PATH.src}/js/article`,    
    login: `${PATH.src}/js/login`,    
    addEvent: `${PATH.src}/js/addEvent`,    
  },
  output: {
    filename: `${PATH.assets}/js/[name].[hash].js`,
    path: PATH.dist,
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'/*, 'eslint-loader'*/],
      exclude: '/node_modules/',
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
      },
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true },
        },
        {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: './build/postcss.config.js' } },
        },
        {
          loader: 'sass-loader',
          options: { sourceMap: true },
        },
      ],
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true },
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: './build/postcss.config.js' } },
        },
      ],
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATH.assets}/css/[name].[contenthash].css`,
    }),
    new HtmlWebpackPlugin({
      template: `${PATH.src}/index.html`,
      filename: './index.html',
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      template: `${PATH.src}/articles.html`,
      filename: './articles.html',
      chunks: ['articles']
    }),
    new HtmlWebpackPlugin({
      template: `${PATH.src}/article.html`,
      filename: './article.html',
      chunks: ['article']
    }),
    new HtmlWebpackPlugin({
      template: `${PATH.src}/login.html`,
      filename: './login.html',
      chunks: ['login']
    }),
    new HtmlWebpackPlugin({
      template: `${PATH.src}/header.html`,
      filename: './header.html',
    }),
    new HtmlWebpackPlugin({
      template: `${PATH.src}/addEvent.html`,
      filename: './addEvent.html',
      chunks: ['addEvent']
    }),
    new CopyWebpackPlugin([
      { from: `${PATH.src}/img`, to: `${PATH.assets}/img` },
      { from: `${PATH.src}/static`, to: '' },
    ]),
  ],
};
