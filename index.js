const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Models = require("./models.js");
const { Genre, Director } = Models;

const app = express();

// Import the model
const Movie = Models.Movie;
const Users = Models.User;

const mongoURI = "mongodb://localhost:27017/test";
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Movie data
const movies = [
  {
    title: "American Beauty",
    year: 1999,
    director: "Sam Mendes",
    genre: "Drama",
    image:
      "https://upload.wikimedia.org/wikipedia/en/a/a0/American_Beauty_poster.jpg",
    actors: ["Kevin Spacey", "Annette Bening", "Thora Birch"],
    movieId: 1,
  },
  {
    title: "Interstellar",
    year: 2014,
    director: "Christopher Nolan",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    movieId: 2,
  },
  {
    title: "The Great Dictator",
    year: 1940,
    director: "Charles Chaplin",
    genre: ["Comedy", "Drama", "War"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/1/1c/Great_Dictator_Theatrical_Poster.jpg",
    actors: ["Charles Chaplin", "Paulette Goddard", "Jack Oakie"],
    movieId: 3,
  },
  {
    title: "Schindler's List",
    year: 1993,
    director: "Steven Spielberg",
    genre: ["Biography", "Drama", "History"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/3/38/Schindler%27s_List_movie.jpg",
    actors: ["Liam Neeson", "Ralph Fiennes", "Ben Kingsley"],
    movieId: 4,
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
    director: "Peter Jackson",
    genre: ["Adventure", "Drama", "Fantasy"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/9/9d/LOTR_-_The_Return_of_the_King.jpg",
    actors: ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"],
    movieId: 5,
  },
  {
    title: "Forrest Gump",
    year: 1994,
    director: "Robert Zemeckis",
    genre: ["Drama", "Romance"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
    actors: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    movieId: 6,
  },
  {
    title: "Inception",
    year: 2010,
    director: "Christopher Nolan",
    genre: ["Action", "Adventure", "Sci-Fi"],
    image: "https://upload.wikimedia.org/wikipedia/en/7/7f/Inception_ver3.jpg",
    actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    movieId: 7,
  },
  {
    title: "Alexander",
    year: 2004,
    director: "Oliver Stone",
    genre: ["Drama", "Action", "Biography"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/2/20/Alexander_film_poster.jpg",
    actors: ["Colin Farrell", "Angelina Jolie", "Val Kilmer"],
    movieId: 8,
  },
  {
    title: "The Matrix",
    year: 1999,
    director: "Lana Wachowski, Lilly Wachowski",
    genre: ["Action", "Sci-Fi"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
    actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    movieId: 9,
  },
  {
    title: "Melancholia",
    year: 2011,
    director: "Lars von Trier",
    genre: ["Drama", "Sci-Fi"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/0/03/Melancholia_Poster.jpg",
    actors: ["Kirsten Dunst", "Charlotte Gainsbourg", "Kiefer Sutherland"],
    movieId: 10,
  },
  {
    title: "The Devil Wears Prada",
    year: 2006,
    director: "David Frankel",
    genre: ["Drama", "Comedy"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/a/a5/The_Devil_Wears_Prada.jpg",
    actors: ["Meryl Streep", "Anne Hathaway", "Emily Blunt"],
    movieId: 11,
  },
  {
    title: "The Hundred-Foot Journey",
    year: 2014,
    director: "Lasse Hallström",
    genre: ["Drama", "Comedy"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/0/09/The_Hundred-Foot_Journey_%28film%29.jpg",
    actors: ["Helen Mirren", "Om Puri", "Manish Dayal"],
    movieId: 12,
  },
  {
    title: "Woman in Gold",
    year: 2015,
    director: "Simon Curtis",
    genre: ["Drama", "Biography", "History"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/4/41/Woman_in_Gold_poster.jpg",
    actors: ["Helen Mirren", "Ryan Reynolds", "Daniel Brühl"],
    movieId: 13,
  },
  {
    title: "Navalny",
    year: 2022,
    director: "Daniel Roher",
    genre: ["Documentary", "Biography"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/a/aa/Navalny_2022_film_poster.png",
    actors: ["Alexei Navalny", "Yulia Navalnaya", "Dmitri Muratov"],
    movieId: 14,
  },
  {
    title: "The House That Jack Built",
    year: 2018,
    director: "Lars von Trier",
    genre: ["Crime", "Drama", "Horror"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/5/5c/The_House_That_Jack_Built_%28film%29.png",
    actors: ["Matt Dillon", "Bruno Ganz", "Uma Thurman"],
    movieId: 15,
  },
  {
    title: "Dogville",
    year: 2003,
    director: "Lars von Trier",
    genre: ["Crime", "Drama"],
    image: "https://upload.wikimedia.org/wikipedia/en/b/bb/Dogville_poster.jpg",
    actors: ["Nicole Kidman", "Paul Bettany", "Lauren Bacall"],
    movieId: 16,
  },
  {
    title: "2001: A Space Odyssey",
    year: 1968,
    director: "Stanley Kubrick",
    genre: ["Adventure", "Sci-Fi"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/1/11/2001_A_Space_Odyssey_%281968%29.png",
    actors: ["Keir Dullea", "Gary Lockwood", "William Sylvester"],
    movieId: 17,
  },
  {
    title: "Four Rooms",
    year: 1995,
    director:
      "Allison Anders, Alexandre Rockwell, Robert Rodriguez, Quentin Tarantino",
    genre: ["Comedy"],
    image: "https://upload.wikimedia.org/wikipedia/en/f/f7/Four_rooms_ver1.jpg",
    actors: ["Tim Roth", "Antonio Banderas", "Jennifer Beals"],
    movieId: 18,
  },
  {
    title: "Kill Bill Vol. 1",
    year: 2003,
    director: "Quentin Tarantino",
    genre: ["Action", "Crime", "Drama"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/c/cf/Kill_Bill_Volume_1.png",
    actors: ["Uma Thurman", "David Carradine", "Daryl Hannah"],
    movieId: 19,
  },
  {
    title: "Kill Bill Vol. 2",
    year: 2004,
    director: "Quentin Tarantino",
    genre: ["Action", "Crime", "Drama"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/4/4c/Kill_Bill_Volume_2.png",
    actors: ["Uma Thurman", "David Carradine", "Michael Madsen"],
    movieId: 20,
  },
  {
    title: "The Platform",
    year: 2019,
    director: "Galder Gaztelu-Urrutia",
    genre: ["Horror", "Sci-Fi", "Thriller"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/6/69/The_Platform_poster.jpg",
    actors: ["Ivan Massagué", "Zorion Eguileor", "Antonia San Juan"],
    movieId: 21,
  },
  {
    title: "Vivarium",
    year: 2019,
    director: "Lorcan Finnegan",
    genre: ["Horror", "Mystery", "Sci-Fi"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/1/1e/Vivarium_film_poster.jpg",
    actors: ["Imogen Poots", "Jesse Eisenberg", "Jonathan Aris"],
    movieId: 22,
  },
  {
    title: "The Social Network",
    year: 2010,
    director: "David Fincher",
    genre: ["Biography", "Drama"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/7/7a/Social_network_film_poster.jpg",
    actors: ["Jesse Eisenberg", "Andrew Garfield", "Justin Timberlake"],
    movieId: 23,
  },
  {
    title: "Avatar",
    year: 2009,
    director: "James Cameron",
    genre: ["Action", "Adventure", "Fantasy"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/b/b0/Avatar-Teaser-Poster.jpg",
    actors: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
    movieId: 24,
  },
  {
    title: "The Messenger: The Story of Joan of Arc",
    year: 1999,
    director: "Luc Besson",
    genre: ["Adventure", "Biography", "Drama"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/6/61/The_Messenger_poster.jpg",
    actors: ["Milla Jovovich", "John Malkovich", "Rab Affleck"],
    movieId: 25,
  },
  {
    title: "Anna",
    year: 2019,
    director: "Luc Besson",
    genre: ["Action", "Thriller"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/9/97/Anna_2019_poster.jpg",
    actors: ["Sasha Luss", "Helen Mirren", "Luke Evans"],
    movieId: 26,
  },
  {
    title: "The Good Liar",
    year: 2019,
    director: "Bill Condon",
    genre: ["Crime", "Drama", "Mystery"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/f/f6/The_Good_Liar_poster.png",
    actors: ["Helen Mirren", "Ian McKellen", "Russell Tovey"],
    movieId: 27,
  },
  {
    title: "The Debt",
    year: 2010,
    director: "John Madden",
    genre: ["Drama", "Thriller"],
    image: "https://upload.wikimedia.org/wikipedia/en/5/5c/The_Debt_Poster.jpg",
    actors: ["Helen Mirren", "Sam Worthington", "Tom Wilkinson"],
    movieId: 28,
  },
];

// Function to insert movies
async function insertMovies() {
  try {
    await Movie.insertMany(movies);
    console.log("Movies inserted successfully");
  } catch (error) {
    console.error("Error inserting movies:", error);
  } finally {
    mongoose.disconnect();
  }
}

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

//Endpoints
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

    // Create a new user without userId
    const newUser = new Users({ Email, Password, Birthday });

    // Save the user to generate the _id
    await newUser.save();

    // Update the user with the generated _id as userId
    newUser.userId = newUser._id.toString();
    await newUser.save();

    res.status(201).json({
      userId: newUser.userId,
      Email: newUser.Email,
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
