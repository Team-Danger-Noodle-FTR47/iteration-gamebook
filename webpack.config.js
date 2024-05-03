const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './client/App.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/transform-async-to-generator',
              '@babel/plugin-syntax-jsx',
            ],
          },
        },
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    port: 8080,
    hot: true,
    static: {
      directory: path.join(__dirname, './build'),
      publicPath: '/',
    },
    // proxy: [{
    //     context: ['/'],
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    // }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   mode: 'development',
//   entry: './client/components/TestApp.jsx',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'build'),
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: 'index.html',
//     }),
//   ],
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env', '@babel/preset-react'],
//           },
//         },
//       },
//       {
//         test: /\.s?css$/,
//         exclude: /node_modules/,
//         use: ['style-loader', 'css-loader', 'sass-loader'],
//       },
//     ],
//   },
//   devServer: {
//     static: {
//       directory: path.resolve(__dirname, 'build'),
//       publicPath: '/',
//     },
//   },
// };
