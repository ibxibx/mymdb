const mongoose = require("mongoose");
const { Movie, Genre, Director } = require("./models");

// Connect to your MongoDB database
mongoose
  .connect(
    "mongodb+srv://magnyt:sC9qc3JHCnHxKnGJ@mymdb.z2qogep.mongodb.net/test?retryWrites=true&w=majority&appName=mymdb",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    populateMovies();
  })
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Function to populate movies with genres and director
async function populateMovies() {
  try {
    // Find all movies
    const movies = await Movie.find();

    for (const movie of movies) {
      // Populate genres and director fields
      await Movie.findByIdAndUpdate(movie._id, {
        $set: {
          Genres: await Genre.find({ _id: { $in: movie.Genres } }),
          Director: await Director.findById(movie.Director),
        },
      });
    }

    console.log("Movies have been populated with genres and director.");
    mongoose.disconnect();
  } catch (err) {
    console.error("Error populating movies:", err);
    mongoose.disconnect();
  }
}
