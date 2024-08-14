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
    const movies = await Movie.find({}).populate("Director").populate("Genres");

    for (let movie of movies) {
      console.log(`Processing movie: ${movie.Title}`);

      // Log the director and genres for debugging
      if (movie.Director) {
        console.log(
          `Found director: ${movie.Director.Name} for movie: ${movie.Title}`
        );
      } else {
        console.error(`Director not found for movie: ${movie.Title}`);
      }

      if (movie.Genres && movie.Genres.length > 0) {
        console.log(`Found genres for movie: ${movie.Title}`);
        movie.Genres.forEach((genre) => console.log(`Genre: ${genre.Name}`));
      } else {
        console.error(`Genres not found for movie: ${movie.Title}`);
      }

      // Save the updated movie document
      await movie.save();
      console.log(`Updated movie: ${movie.Title}`);
    }

    console.log("Movies have been populated with genres and director.");
  } catch (err) {
    console.error("Error populating movies:", err);
  } finally {
    mongoose.connection.close();
  }
}

populateMovies();
