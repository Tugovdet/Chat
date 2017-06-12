module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] },
        }],
      },
      { test: /\.pug$/, use: 'pug-loader' },
    ],
  },
  devServer: {
    contentBase: __dirname,
    compress: true,
    port: 9000,
    historyApiFallback: true,
  },
  devtool: 'source-map',
};
