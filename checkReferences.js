const mongoose = require("mongoose");
const { Movie, Genre, Director } = require("./models");
const mongoURI = "mongodb://localhost:27017/test";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

async function checkReferences() {
  try {
    const movies = await Movie.find();
    for (let movie of movies) {
      console.log(`Movie: ${movie.Title}`);
      if (movie.Genre) {
        const genre = await Genre.findById(movie.Genre);
        console.log(`Genre: ${genre ? genre.Name : "Not found"}`);
      } else {
        console.log("Genre: Not set");
      }
      if (movie.Director) {
        const director = await Director.findById(movie.Director);
        console.log(`Director: ${director ? director.Name : "Not found"}`);
      } else {
        console.log("Director: Not set");
      }
      console.log("---");
    }
  } catch (error) {
    console.error("Error checking references:", error);
  } finally {
    mongoose.disconnect();
  }
}

checkReferences();
