const mongoose = require("mongoose");
const { Movie, Genre, Director } = require("./models");

const mongoURI =
  "mongodb+srv://magnyt:sC9qc3JHCnHxKnGJ@mymdb.z2qogep.mongodb.net/test?retryWrites=true&w=majority&appName=mymdb";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

async function populateMovies() {
  try {
    const movies = await Movie.find();

    for (let movie of movies) {
      const genre = await Genre.findOne({ _id: movie.Genre });
      const director = await Director.findOne({ _id: movie.Director });

      if (genre) {
        movie.Genre = genre._id;
      }

      if (director) {
        movie.Director = director._id;
      }

      await movie.save();
    }

    console.log("Movies populated successfully");
  } catch (error) {
    console.error("Error populating movies:", error);
  } finally {
    mongoose.disconnect();
  }
}

populateMovies();
