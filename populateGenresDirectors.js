const mongoose = require("mongoose");
const { Movie, Genre, Director } = require("./models"); // Adjust the path if needed

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

      // Handle DirectorId and update Director field
      if (movie.DirectorId) {
        const director = await Director.findById(movie.DirectorId);
        if (director) {
          movie.Director = director._id; // Update to director's ObjectId
          console.log(
            `Found director: ${director.name} for movie: ${movie.Title}`
          );
        } else {
          console.error(`Director not found for movie: ${movie.Title}`);
        }
        // Remove the DirectorId field
        delete movie.DirectorId;
      } else {
        console.error(`DirectorId not found for movie: ${movie.Title}`);
      }

      // Handle genres
      if (movie.Genres && movie.Genres.length > 0) {
        const genres = await Genre.find({ _id: { $in: movie.Genres } });
        if (genres.length === movie.Genres.length) {
          movie.Genres = genres.map((genre) => genre._id); // Ensure genres are updated correctly
          console.log(`Found and updated genres for movie: ${movie.Title}`);
        } else {
          console.error(`Some genres not found for movie: ${movie.Title}`);
        }
      } else {
        console.error(`No genres found for movie: ${movie.Title}`);
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
