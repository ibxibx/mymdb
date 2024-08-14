const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  DirectorId: { type: Schema.Types.ObjectId, ref: "Director" }, // Reference to Director
  Genres: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
  Actors: [String],
  ImagePath: String,
  Featured: Boolean,
});

const userSchema = new Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

const genreSchema = new Schema({
  Name: { type: String, required: true },
  Description: String,
});

const directorSchema = new Schema({
  Name: { type: String, required: true },
  Bio: String,
  Birth: Date,
  Death: { type: Date, default: null },
});

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);
let Genre = mongoose.model("Genre", genreSchema);
let Director = mongoose.model("Director", directorSchema);

module.exports = { Movie, User, Genre, Director };
