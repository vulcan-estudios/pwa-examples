module.exports = {
  entry: {
    'app': './client/app/index.js',
    'worker': './client/worker/index.js'
  },
  output: {
    path: './public/',
    filename: '[name].js'
  },
  resolve: {
    fallback: process.cwd()
  },
  devtool: 'inline-source-map',
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
  }
};
