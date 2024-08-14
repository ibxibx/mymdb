const mongoose = require("mongoose");
const { Movie, Genre, Director } = require("./models");

const mongoURI =
  "mongodb+srv://magnyt:sC9qc3JHCnHxKnGJ@mymdb.z2qogep.mongodb.net/test?retryWrites=true&w=majority&appName=mymdb";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

async function populateMovies() {
  try {
    // Fetch all movies
    const movies = await Movie.find({});

    for (let movie of movies) {
      console.log(`Processing movie: ${movie.Title}`);

      // Fetch the director based on DirectorId
      const director = await Director.findById(movie.DirectorId);
      if (!director) {
        console.error(`Director not found for movie: ${movie.Title}`);
      } else {
        console.log(
          `Found director: ${director.name} for movie: ${movie.Title}`
        );
      }

      // Fetch the genres based on Genres array
      const genres = await Genre.find({ _id: { $in: movie.Genres } });
      if (genres.length !== movie.Genres.length) {
        console.error(`Some genres not found for movie: ${movie.Title}`);
      } else {
        console.log(`Found genres for movie: ${movie.Title}`);
      }

      // Update the movie document with populated data
      if (director && genres.length > 0) {
        movie.Director = director;
        movie.Genres = genres;
        await movie.save();
        console.log(`Updated movie: ${movie.Title}`);
      }
    }

    console.log("Movies have been populated with genres and director.");
  } catch (err) {
    console.error("Error populating movies:", err);
  } finally {
    mongoose.connection.close();
  }
}

populateMovies();
