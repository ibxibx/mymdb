const mongoose = require('mongoose');
const { Movie } = require('./models');  // Adjust the path if necessary

const mongoURI = 'mongodb://localhost:27017/test';  // Replace with your actual database name

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

async function checkMovies() {
  try {
    // Count the number of movies
    const count = await Movie.countDocuments();
    console.log(`Total number of movies: ${count}`);

    // Fetch and display all movie titles
    const movies = await Movie.find({}, 'Title');
    console.log('Movie titles:');
    movies.forEach(movie => console.log(movie.Title));

    // Optionally, display full details of the first movie
    const firstMovie = await Movie.findOne();
    console.log('\nDetails of the first movie:');
    console.log(JSON.stringify(firstMovie, null, 2));

  } catch (error) {
    console.error('Error checking movies:', error);
  } finally {
    mongoose.disconnect();
  }
}

checkMovies();