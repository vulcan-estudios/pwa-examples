const webpack = require('webpack');

const dev = process.env.NODE_ENV !== 'production';
const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(
      dev ? 'development' : 'production'
    )
  })
];

if (!dev) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  );
}

module.exports = {
  entry: {
    'app': './client/app/index.js',
    'sw': './client/sw/index.js'
  },
  output: {
    path: './public/',
    filename: '[name].js'
  },
  resolve: {
    fallback: process.cwd()
  },
  module: {
    loaders: [{
      loader: 'babel',
      test: /.js$/,
      exclude: /(node_modules)/,
      query: {
        presets: [
          'react',
          'es2015',
          'stage-1'
        ]
      }
    }]
  },
  devtool: dev ? 'inline-source-map' : undefined,
  plugins,
};
