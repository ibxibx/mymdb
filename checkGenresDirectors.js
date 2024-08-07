const mongoose = require('mongoose');
const { Genre, Director } = require('./models');

const mongoURI = 'mongodb://localhost:27017/test';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function checkGenresAndDirectors() {
  try {
    // Check Genres
    const genreCount = await Genre.countDocuments();
    console.log(`Total number of genres: ${genreCount}`);
    const genres = await Genre.find({}, 'Name');
    console.log('Genre names:');
    genres.forEach(genre => console.log(genre.Name));

    console.log('\n-------------------\n');

    // Check Directors
    const directorCount = await Director.countDocuments();
    console.log(`Total number of directors: ${directorCount}`);
    const directors = await Director.find({}, 'Name');
    console.log('Director names:');
    directors.forEach(director => console.log(director.Name));

  } catch (error) {
    console.error('Error checking genres and directors:', error);
  } finally {
    mongoose.disconnect();
  }
}

checkGenresAndDirectors();