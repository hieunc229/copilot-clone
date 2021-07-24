const path = require('path');
<<<<<<< HEAD
const webpack = require("webpack");
=======
>>>>>>> e32b490 (Added configs to publish to OpenVSX)

const config = {
  target: 'node',
  entry: './src/extension.ts',
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../[resource-path]'
  },
  externals: {
    vscode: 'commonjs vscode'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.node$/,
        loader: "node-loader",
<<<<<<< HEAD
      }
=======
      },
>>>>>>> e32b490 (Added configs to publish to OpenVSX)
    ]
  }
};
module.exports = config;