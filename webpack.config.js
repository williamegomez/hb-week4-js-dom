const path = require('path')

module.exports = {
  entry: {
    gallery: ['./src/gallery/main.js', './src/gallery/firebase.js'],
    movies: './src/movies/main.js'
  },
  output: {
    filename: './[name]/main.js',
    path: path.resolve(__dirname, 'public')
  }
}
