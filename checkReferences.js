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
    // Fetch movies and populate Genre and Director fields
    const movies = await Movie.find()
      .populate('GenreId', 'Name Description')  // Populating GenreId field
      .populate('DirectorId', 'Name Bio Birth Death');  // Populating DirectorId field

    for (let movie of movies) {
      console.log(`Movie: ${movie.Title}`);
      console.log(`Genre: ${movie.GenreId ? movie.GenreId.Name : 'Not populated'}`);
      console.log(`Director: ${movie.DirectorId ? movie.DirectorId.Name : 'Not populated'}`);
      console.log('---');
    }
  } catch (error) {
    console.error('Error checking references:', error);
  } finally {
    mongoose.disconnect();
  }
}

checkReferences();