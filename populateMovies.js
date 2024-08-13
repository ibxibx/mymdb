const mongoose = require('mongoose');
const { Movie, Genre, Director } = require('./models'); // Adjust the path as needed

const mongoURI = 'mongodb+srv://magnyt:sC9qc3JHCnHxKnGJ@mymdb.z2qogep.mongodb.net/test?retryWrites=true&w=majority&appName=mymdb';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

async function populateMovies() {
  try {
    const movies = await Movie.find()
      .populate({
        path: 'GenreId', // Ensure this field name matches your schema
        select: 'Name Description', // Use capitalized field names from Genre schema
      })
      .populate({
        path: 'DirectorId', // Ensure this field name matches your schema
        select: 'Name Bio Birth Death', // Use capitalized field names from Director schema
      });

    movies.forEach(movie => {
      console.log(`Movie: ${movie.Title}`);
      console.log(`Genre: ${movie.GenreId ? movie.GenreId.Name : 'N/A'}`); // Adjust based on your Genre schema
      console.log(`Director: ${movie.DirectorId ? movie.DirectorId.Name : 'N/A'}`); // Adjust based on your Director schema
      console.log('---');
    });
  } catch (error) {
    console.error('Error populating movies:', error);
  } finally {
    mongoose.disconnect();
  }
}

populateMovies();