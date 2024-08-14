const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Director: { type: Schema.Types.ObjectId, ref: "Director" }, // Reference to Director
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
  Name: String,
  Description: String,
});

const directorSchema = new Schema({
  Name: String,
  Bio: String,
  BirthYear: Number,
});

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);
let Genre = mongoose.model("Genre", genreSchema);
let Director = mongoose.model("Director", directorSchema);

module.exports = { Movie, User, Genre, Director };
