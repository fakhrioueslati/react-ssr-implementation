const path = require('path');
const WebpackBar = require('webpackbar');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    entry: './src/server.js',
    mode: isDevelopment ? 'development' : 'production',
    stats: 'minimal',
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'dist'),
    },
    target: 'node',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: 'ignore-loader', 
        },
      ],
    },
    plugins: [
      new WebpackBar({
        name: "Server",
      }),
    ],
  };
};
