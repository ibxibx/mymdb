const mongoose = require("mongoose");

let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: { 
        Name: String,
        Description: String
    },
    Director: {
        name: String,
        Bio: String
    },
Actors: [String],
Imagepath: String,
Featured: Boolean
});

let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    password: type: String, required: true},
    Email: {type: String, required: true}, 
    Birthday: Date,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId,
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
 