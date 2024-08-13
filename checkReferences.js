const mongoose = require("mongoose");
const { Movie } = require("./models");

const mongoURI =
  "mongodb+srv://magnyt:sC9qc3JHCnHxKnGJ@mymdb.z2qogep.mongodb.net/test?retryWrites=true&w=majority&appName=mymdb";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

async function checkReferences() {
  try {
    const movies = await Movie.find()
      .populate("GenreId", "Name Description") // Populate GenreId with the Name and Description fields from Genre
      .populate("DirectorId", "Name Bio"); // Populate DirectorId with the Name and Bio fields from Director

    for (let movie of movies) {
      console.log(`Movie: ${movie.Title}`);
      console.log(`Genre: ${movie.GenreId ? movie.GenreId.Name : "N/A"}`);
      console.log(`Director: ${movie.DirectorId ? movie.DirectorId.Name : "N/A"}`);
      console.log('---');
    }
  } catch (error) {
    console.error('Error checking references:', error);
  } finally {
    mongoose.disconnect();
  }
}

checkReferences();