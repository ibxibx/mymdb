const mongoose = require("mongoose");
const { Schema } = mongoose;

let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  GenreId: { type: mongoose.Schema.Types.ObjectId, ref: "Genre" },
  DirectorId: { type: mongoose.Schema.Types.ObjectId, ref: "Director" },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean,
});

let userSchema = mongoose.Schema({
  Username: { type: String },
  userId: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

let genreSchema = mongoose.Schema({
  genreId: { type: Number, required: true, unique: true },
  Name: String,
  Description: String,
});

let directorSchema = mongoose.Schema({
  directorId: { type: Number, required: true, unique: true },
  Name: String,
  Bio: String,
  Birth: Date,
  Death: Date,
});

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);
let Genre = mongoose.model("Genre", genreSchema);
let Director = mongoose.model("Director", directorSchema);

module.exports = { Movie, User, Genre, Director };
