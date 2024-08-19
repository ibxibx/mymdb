const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const movieSchema = new Schema({
  Title: String,
  Description: String,
  Actors: [String],
  ImagePath: String,
  Featured: Boolean,
  Genres: [
    {
      _id: Schema.Types.ObjectId,
      genre: String,
      description: String,
    },
  ],
  Director: {
    _id: Schema.Types.ObjectId,
    name: String,
    bio: String,
    birthPlace: String,
    moviesCount: Number,
  },
});

const userSchema = new Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

userSchema.pre("save", function (next) {
  if (this.isModified("Password")) {
    this.Password = bcrypt.hashSync(this.Password, 10);
  }
  next();
});

const genreSchema = new Schema({
  genre: String,
  description: String,
});

const directorSchema = new Schema({
  name: String,
  bio: String,
  birthPlace: String,
  moviesCount: Number,
});

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);
let Genre = mongoose.model("Genre", genreSchema);
let Director = mongoose.model("Director", directorSchema);

module.exports = { Movie, User, Genre, Director };
