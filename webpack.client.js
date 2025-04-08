const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  const baseUrl = 'http://localhost:3001';
  const serverCors = 'http://localhost:3000';

  return {
    entry: './src/client.js',
    mode: isDevelopment ? 'development' : 'production',
    stats: 'minimal',
    output: {
      filename: 'js/bundle.js',
      path: path.resolve(__dirname, 'dist', 'static'),
      publicPath: isDevelopment ? `${baseUrl}/static/` : '/static/',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        inject: true,
        minify: {
          collapseWhitespace: !isDevelopment,
          preserveLineBreaks: isDevelopment,
          minifyCSS: !isDevelopment,
          minifyJS: !isDevelopment,
        },
      }),
      new AssetsWebpackPlugin({
        filename: 'assets.json',
        path: path.resolve(__dirname, 'dist'),
        prettyPrint: true,
      }),
      new WebpackBar({
        name: 'Client',
      }),
      !isDevelopment &&
        new MiniCssExtractPlugin({
          filename: 'css/[name].styles.css', // Use [name] to dynamically generate the filename
        }),
    ].filter(Boolean),
    devServer: {
      port: '3001',
      headers: {
        'Access-Control-Allow-Origin': serverCors,
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
      },
    },
  };
};
