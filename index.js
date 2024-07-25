const express = require("express");
const app = express();
let auth = require("./auth")(app);
const passport = require("passport");
require("./passport");

const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Models = require("./models.js");
const { Genre, Director } = Models;

// Import the model
const Movie = Models.Movie;
const Users = Models.User;

mongoose
  .connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

app.use(bodyParser.json()); // Middleware to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(morgan("dev")); // Use Morgan Middleware to log requests
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files from the 'public' folder

// Passport configuration
require("./passport");
//Endpoints

//JWT Authentication Endpoint
app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Movies.find()
      .then((movies) => {
        res.status(200).json(movies);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

// Get a user by userId mongoose
app.get("/user/:userId", async (req, res) => {
  try {
    const user = await Users.findById(req.params.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving user", error: error.message });
  }
});

// Route to get all users with their favorite movies
app.get("/users", async (req, res) => {
  try {
    const users = await Users.find().select("-password");
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
});

// Define the GET route for the / endpoint (homepage)
app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "public", "hello.html");

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Failed to send file:", err);
      res.status(err.status || 500).send("Something went wrong!");
    }
  });
});

// Return all movies
app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving movies", error: error.message });
  }
});

// Route to get a movie by movieId
app.get("/movies/:movieId", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving movie", error: error.message });
  }
});

// Return data about a single movie by title
app.get("/movies/title/:title", async (req, res) => {
  try {
    const movie = await Movie.findOne({ Title: req.params.title });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving movie", error: error.message });
  }
});

//Return all Genres
app.get("/genres", async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving genres", error: error.message });
  }
});

// Return data about a genre (description) by name/title
app.get("/genres/:name", async (req, res) => {
  try {
    const genre = await Genre.findOne({ Name: req.params.name });
    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }
    res.json({ Name: genre.Name, Description: genre.Description });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving genre", error: error.message });
  }
});

//Return all Directors' List
app.get("/directors", async (req, res) => {
  try {
    const directors = await Director.find();
    res.json(directors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving directors", error: error.message });
  }
});

//Return data about a director (bio, birth year, death year) by name
app.get("/directors/:name", async (req, res) => {
  try {
    const director = await Director.findOne({ Name: req.params.name });
    if (!director) {
      return res.status(404).json({ message: "Director not found" });
    }
    res.json({
      Name: director.Name,
      Bio: director.Bio,
      Birth: director.Birth,
      Death: director.Death,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving director", error: error.message });
  }
});

// User management endpoints

const generateUsername = (email) => {
  const emailPrefix = email.split("@")[0];
  const randomSuffix = Math.floor(Math.random() * 10000);
  return `${emailPrefix}${randomSuffix}`;
};

// User, Register with Email and userId
app.post("/users/register", async (req, res) => {
  try {
    const { Email, Password, Birthday } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({ error: "Email and Password are required" });
    }

    const existingUser = await Users.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Generate Username
    const Username = generateUsername(Email);

    // Create a new user without userId
    const newUser = new Users({ Email, Password, Birthday, Username });

    // Generate userId based on _id
    newUser.userId = newUser._id.toString();

    // Save the user with the generated userId and Username
    await newUser.save();

    res.status(201).json({
      userId: newUser.userId,
      Email: newUser.Email,
      Username: newUser.Username,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
});

// Update a user's info, by userId mongoose
app.put("/users/:userId", async (req, res) => {
  try {
    const updatedUser = await Users.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { new: true }
    ).select("-password");
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
});

// Add a user mongoose
/* We’ll expect JSON in this format
{
  userId: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/

// Add a movie to a user's list of favorites mongoose
app.post("/users/:userId/movies/:movieId", async (req, res) => {
  try {
    const updatedUser = await Users.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { FavoriteMovies: req.params.movieId } },
      { new: true }
    ).select("-password");
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: "Error adding movie to favorites",
      error: error.message,
    });
  }
});

// User - Delete Movie from Favourites
app.delete("/users/:userId/movies/:movieId", async (req, res) => {
  try {
    const updatedUser = await Users.findByIdAndUpdate(
      req.params.userId,
      { $pull: { FavoriteMovies: req.params.movieId } },
      { new: true }
    ).select("-password");
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: "Error removing movie from favorites",
      error: error.message,
    });
  }
});

// Delete a user by userId mongoose
app.delete("/users/:userId", async (req, res) => {
  try {
    const deletedUser = await Users.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
});

// Catch-all route for handling non-existing routes
app.use((req, res) => {
  res.status(404).sendFile(__dirname + "/public/error404.html");
});

// Middleware for handling 204 error page
app.use((req, res, next) => {
  if (res.status === 204) {
    res.sendFile(__dirname + "/public/error.html");
  } else {
    next();
  }
});
// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
