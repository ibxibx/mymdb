const mongoose = require("mongoose");
const { Schema } = mongoose;

let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Director: { type: mongoose.Schema.Types.ObjectId, ref: "Director" },
  Genres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
  Actors: [String],
  ImagePath: String,
  Featured: Boolean,
});

let userSchema = new Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

let genreSchema = new Schema({
  Name: { type: String, required: true },
  Description: String,
});

let directorSchema = new Schema({
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
