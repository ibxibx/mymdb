const express = require("express");
const app = express();
const cors = require('cors');
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com', 'http://localhost:1234'];
let auth = require("./auth")(app);
const passport = require("passport");
require("./passport");

const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('MONGODB_URI environment variable is not set.');
  process.exit(1);
}

const Models = require("./models.js");
const { Genre, Director } = Models;

// Import models
const Movie = Models.Movie;
const Users = Models.User;

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MyMDB API",
      version: "1.0.0",
      description: "A simple Express Movie API",
    },
    servers: [
      {
        url: "https://mymdb-c295923140ec.herokuapp.com",
        description: "Production server",
      },
      {
        url: "http://localhost:8080",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./index.js"], // Path to the API docs
};

const specs = swaggerJsdoc(options);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  connectTimeoutMS: 30000,
})
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

app.use(cors({
 origin: (origin, callback) => {
   if(!origin) return callback(null, true);
   if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
     let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
     return callback(new Error(message ), false);
   }
   return callback(null, true);
 }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

require("./passport");

// Endpoints

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Retrieve a list of all movies
 *     description: Retrieve a list of movies from the MyMDB database
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
// passport.authenticate("jwt", { session: false }),

app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).send("Error: " + error.message);
  }
});

/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     summary: Get user information
 *     description: Retrieve information about a specific user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /movies/{movieId}:
 *   get:
 *     summary: Get a movie by ID
 *     description: Retrieve detailed information about a specific movie
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /movies/title/{title}:
 *   get:
 *     summary: Get a movie by title
 *     description: Retrieve detailed information about a specific movie by its title
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /genres:
 *   get:
 *     summary: Get all genres
 *     description: Retrieve a list of all movie genres
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of genres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /genres/{name}:
 *   get:
 *     summary: Get a genre by name
 *     description: Retrieve information about a specific genre
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Genre details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Genre not found
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /directors:
 *   get:
 *     summary: Get all directors
 *     description: Retrieve a list of all movie directors
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of directors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Director'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /directors/{name}:
 *   get:
 *     summary: Get a director by name
 *     description: Retrieve information about a specific director
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Director details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Director'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Director not found
 *       500:
 *         description: Internal server error
 */

app.get(
  "/directors/:name",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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
  }
);

const generateUsername = (email) => {
  const emailPrefix = email.split("@")[0];
  const randomSuffix = Math.floor(Math.random() * 10000);
  return `${emailPrefix}${randomSuffix}`;
};

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */

// User registration route (no authentication required)
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

    const Username = generateUsername(Email);
    const newUser = new Users({ Email, Password, Birthday, Username });
    newUser.userId = newUser._id.toString();
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

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Update user information
 *     description: Update information for a specific user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /users/{userId}/movies/{movieId}:
 *   post:
 *     summary: Add a movie to favorites
 *     description: Add a movie to a user's list of favorite movies
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie added to favorites successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Movie already in favorites
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User or movie not found
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /users/{userId}/movies/{movieId}:
 *   delete:
 *     summary: Remove a movie from favorites
 *     description: Remove a movie from a user's list of favorite movies
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie removed from favorites successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user account
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         Title:
 *           type: string
 *         Description:
 *           type: string
 *         Genre:
 *           $ref: '#/components/schemas/Genre'
 *         Director:
 *           $ref: '#/components/schemas/Director'
 *         ImagePath:
 *           type: string
 *         Featured:
 *           type: boolean
 *     Genre:
 *       type: object
 *       properties:
 *         Name:
 *           type: string
 *         Description:
 *           type: string
 *     Director:
 *       type: object
 *       properties:
 *         Name:
 *           type: string
 *         Bio:
 *           type: string
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         Username:
 *           type: string
 *         Email:
 *           type: string
 *         Birthday:
 *           type: string
 *           format: date
 *         FavoriteMovies:
 *           type: array
 *           items:
 *             type: string
 *     NewUser:
 *       type: object
 *       required:
 *         - Username
 *         - Password
 *         - Email
 *       properties:
 *         Username:
 *           type: string
 *         Password:
 *           type: string
 *         Email:
 *           type: string
 *         Birthday:
 *           type: string
 *           format: date
 *     UpdateUser:
 *       type: object
 *       properties:
 *         Username:
 *           type: string
 *         Password:
 *           type: string
 *         Email:
 *           type: string
 *         Birthday:
 *           type: string
 *           format: date
 */

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
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
