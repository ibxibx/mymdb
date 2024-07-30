const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const Models = require("./models.js");
const Movie = Models.Movie;
const Users = Models.User;
let auth = require("./auth")(app);
const passport = require("passport");
require("./passport");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const { Genre, Director } = Models;

mongoose
  .connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

require("./passport");

// Endpoints

app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Movie.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

app.get(
  "/user/:userId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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
  }
);

app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const users = await Users.find().select("-password");
      res.json(users);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving users", error: error.message });
    }
  }
);

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "public", "hello.html");
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Failed to send file:", err);
      res.status(err.status || 500).send("Something went wrong!");
    }
  });
});

app.get(
  "/movies/:movieId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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
  }
);

app.get(
  "/movies/title/:title",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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
  }
);

app.get(
  "/genres",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const genres = await Genre.find();
      res.json(genres);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving genres", error: error.message });
    }
  }
);

app.get(
  "/genres/:name",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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
  }
);

app.get(
  "/directors",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const directors = await Director.find();
      res.json(directors);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving directors", error: error.message });
    }
  }
);

app.get(
  "/directors/:name",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Decode the URI component to handle spaces and special characters
      const directorName = decodeURIComponent(req.params.name);
      console.log(`Searching for director: ${directorName}`);

      // Case-insensitive search using a regular expression
      const director = await Director.findOne({
        name: new RegExp(`^${directorName}$`, "i"),
      });

      if (!director) {
        return res.status(404).json({ message: "Director not found" });
      }

      res.json({
        Name: director.name,
        Bio: director.bio,
        Birth: director.birth,
        Death: director.death,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving director", error: error.message });
    }
  }
);

const generateUsername = (email) => {
  const emailPrefix = email.split("@")[0];
  const randomSuffix = Math.floor(Math.random() * 10000);
  return `${emailPrefix}${randomSuffix}`;
};

app.post(
  "/users",
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  async (req, res) => {
    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      const { Email, Password, Birthday, Username } = req.body;

      // Check if the email or username already exists
      const existingUser = await Users.findOne({ Email });
      if (existingUser) {
        return res.status(400).json({ message: "Email is already registered" });
      }

      const usernameExists = await Users.findOne({ Username });
      if (usernameExists) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(Password, 10);

      // Create a new user
      const newUser = new Users({
        Username,
        Email,
        Password: hashedPassword,
        Birthday,
      });
      newUser.userId = newUser._id.toString();
      await newUser.save();

      res.status(201).json({
        userId: newUser.userId,
        Email: newUser.Email,
        Username: newUser.Username,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error registering user",
        error: error.message,
      });
    }
  }
);

app.put(
  "/users/:userId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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
  }
);

app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send("Permission denied");
    }
    await Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true }
    )
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error: " + err);
      });
  }
);

app.post(
  "/users/:userId/movies/:movieId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      console.log(
        `Attempting to add movie ${req.params.movieId} to favorites for user ${req.params.userId}`
      );

      // Check if the user exists
      const user = await Users.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the movie exists (assuming you have a Movie model)
      const movie = await Movie.findById(req.params.movieId);
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      // Check if the movie is already in favorites
      if (user.FavoriteMovies.includes(req.params.movieId)) {
        return res.status(400).json({ message: "Movie already in favorites" });
      }

      const updatedUser = await Users.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { FavoriteMovies: req.params.movieId } },
        { new: true }
      ).select("-password");

      console.log("Updated user:", updatedUser);

      res.json(updatedUser);
    } catch (error) {
      console.error("Error adding movie to favorites:", error);
      res.status(500).json({
        message: "Error adding movie to favorites",
        error: error.message,
      });
    }
  }
);

app.delete(
  "/users/:userId/movies/:movieId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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
  }
);

app.delete(
  "/users/:userId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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
  }
);

app.use((req, res) => {
  res.status(404).sendFile(__dirname + "/public/error404.html");
});

app.use((req, res, next) => {
  if (res.status === 204) {
    res.sendFile(__dirname + "/public/error.html");
  } else {
    next();
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});
