const mongoose = require('mongoose');
const { Movie } = require('./models');
const mongoURI = 'mongodb://localhost:27017/test';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

async function updateMovieReferences() {
  try {
    const movies = await Movie.find();

    for (let movie of movies) {
      if (movie.GenreId) {
        movie.Genre = movie.GenreId;
        movie.GenreId = undefined;
      }
      if (movie.DirectorId) {
        movie.Director = movie.DirectorId;
        movie.DirectorId = undefined;
      }
      await movie.save();
    }

    console.log('Updated all movies');
  } catch (error) {
    console.error('Error updating movie references:', error);
  } finally {
    mongoose.disconnect();
  }
}

updateMovieReferences();