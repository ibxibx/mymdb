require('dotenv').config();
const mongoose = require('mongoose');
const { Movie, Genre, Director } = require('./models'); // Import models

const mongoURI = process.env.MONGO_URI || 'mongodb+srv://magnyt:sC9qc3JHCnHxKnGJ@mymdb.z2qogep.mongodb.net/test?retryWrites=true&w=majority&appName=mymdb';  

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

async function populateMovies() {
  try {
    const movies = await Movie.find()
      .populate('Director') // Populate Director field
      .populate('Genres'); // Populate Genres field

    movies.forEach(movie => {
      console.log(`Title: ${movie.Title}`);
      console.log(`Description: ${movie.Description}`);
      console.log(`Featured: ${movie.Featured}`);
      console.log(`Director: ${movie.Director ? movie.Director.Name : 'N/A'}`);
      console.log('Genres:');
      movie.Genres.forEach(genre => {
        console.log(` - ${genre.Name}`);
      });
      console.log('---');
    });
  } catch (error) {
    console.error('Error populating movies:', error);
  } finally {
    mongoose.disconnect();
  }
}

populateMovies();