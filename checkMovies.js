const mongoose = require("mongoose");
const { Movie } = require("./models");
const mongoURI = "mongodb://localhost:27017/test";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

async function checkMovies() {
  try {
    const count = await Movie.countDocuments();
    console.log(`Total number of movies: ${count}`);

    const movies = await Movie.find({}, "Title");
    console.log("Movie titles:");
    movies.forEach((movie) => console.log(movie.Title));

    const firstMovie = await Movie.findOne()
      .populate("Genre")
      .populate("Director");

    console.log(
      "\nDetails of the first movie (with populated Genre and Director):"
    );
    console.log(JSON.stringify(firstMovie, null, 2));
  } catch (error) {
    console.error("Error checking movies:", error);
  } finally {
    mongoose.disconnect();
  }
}

checkMovies();
