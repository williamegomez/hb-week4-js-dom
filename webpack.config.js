const path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    gallery: ['./src/gallery/main.js', './src/gallery/firebase.js'],
    movies: './src/movies/main.js'
  },
  output: {
    filename: './[name]/main.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{ loader: 'css-loader', options: {minimize: true, sourceMap: true} },
                { loader: 'sass-loader', options: {sourceMap: true} }]
        })
      }
    ]
  },
  plugins: [new ExtractTextPlugin({filename: 'style.css'})]
}
