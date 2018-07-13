var path = require('path');
var SRC = path.join(__dirname, '/client/src');
var DIST = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
