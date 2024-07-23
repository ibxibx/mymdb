const mongoose = require('mongoose');
const { Movie } = require('./models');  // Adjust the path if necessary

// Your MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/test';  // Replace with your actual database name

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const movies = [
  // Your movie array here (as provided in your message)
];

async function insertMovies() {
  try {
    for (let movie of movies) {
      const newMovie = new Movie({
        Title: movie.title,
        Description: `A ${movie.year} ${Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre} film directed by ${movie.director}.`,
        Genre: {
          Name: Array.isArray(movie.genre) ? movie.genre[0] : movie.genre,
          Description: `A ${Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre} movie.`
        },
        Director: {
          Name: movie.director,
          Bio: `Director of ${movie.title}.`  // You might want to add more detailed bios
        },
        Actors: movie.actors,
        ImagePath: movie.image,
        Featured: false,  // You can set this as needed
        Year: movie.year
      });

      await newMovie.save();
      console.log(`Inserted: ${movie.title}`);
    }
    console.log('All movies have been inserted.');
  } catch (error) {
    console.error('Error inserting movies:', error);
  } finally {
    mongoose.disconnect();
  }
}

insertMovies();