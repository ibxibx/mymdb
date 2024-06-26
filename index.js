const express = require("express");
const app = express();

// Movie data
const movies = [
  {
    title: "American Beauty",
    year: 1999,
    director: "Sam Mendes",
    genre: "Drama",
  },
  {
    title: "Interstellar",
    year: 2014,
    director: "Christopher Nolan",
    genre: ["Adventure", "Drama", "Sci-Fi"],
  },
  {
    title: "The Great Dictator",
    year: 1940,
    director: "Charles Chaplin",
    genre: ["Comedy", "Drama", "War"],
  },
  {
    title: "Schindler's List",
    year: 1993,
    director: "Steven Spielberg",
    genre: ["Biography", "Drama", "History"],
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
    director: "Peter Jackson",
    genre: ["Adventure", "Drama", "Fantasy"],
  },
  {
    title: "Forrest Gump",
    year: 1994,
    director: "Robert Zemeckis",
    genre: ["Drama", "Romance"],
  },
  {
    title: "Inception",
    year: 2010,
    director: "Christopher Nolan",
    genre: ["Action", "Adventure", "Sci-Fi"],
  },
  {
    title: "Alexander",
    year: 2004,
    director: "Oliver Stone",
    genre: ["Drama", "Action", "Biography"],
  },
  {
    title: "The Matrix",
    year: 1999,
    director: "Lana Wachowski, Lilly Wachowski",
    genre: ["Action", "Sci-Fi"],
  },
  {
    title: "Melancholia",
    year: 2011,
    director: "Lars von Trier",
    genre: ["Drama", "Sci-Fi"],
  },
  {
    title: "The Devil Wears Prada",
    year: 2006,
    director: "David Frankel",
    genre: ["Drama", "Comedy"],
  },
  {
    title: "The Hundred-Foot Journey",
    year: 2014,
    director: "Lasse Hallström",
    genre: ["Drama", "Comedy"],
  },
  {
    title: "Woman in Gold",
    year: 2015,
    director: "Simon Curtis",
    genre: ["Drama", "Biography", "History"],
  },
];

// Define the GET route for the / endpoint
app.get("/", (req, res) => {
  res.json(movies);
});

// Export the app (optional, if used in another module)
module.exports = app;
