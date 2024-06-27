const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 8080;

// Use Morgan Middleware to log requests
app.use(morgan("dev"));

// Serve static files from the 'public' folder
app.use(express.static("public"));

// Movie data
const movies = [
  {
    title: "American Beauty",
    year: 1999,
    director: "Sam Mendes",
    genre: "Drama",
    actors: ["Kevin Spacey", "Annette Bening", "Thora Birch"],
  },
  {
    title: "Interstellar",
    year: 2014,
    director: "Christopher Nolan",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
  },
  {
    title: "The Great Dictator",
    year: 1940,
    director: "Charles Chaplin",
    genre: ["Comedy", "Drama", "War"],
    actors: ["Charles Chaplin", "Paulette Goddard", "Jack Oakie"],
  },
  {
    title: "Schindler's List",
    year: 1993,
    director: "Steven Spielberg",
    genre: ["Biography", "Drama", "History"],
    actors: ["Liam Neeson", "Ralph Fiennes", "Ben Kingsley"],
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
    director: "Peter Jackson",
    genre: ["Adventure", "Drama", "Fantasy"],
    actors: ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"],
  },
  {
    title: "Forrest Gump",
    year: 1994,
    director: "Robert Zemeckis",
    genre: ["Drama", "Romance"],
    actors: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
  },
  {
    title: "Inception",
    year: 2010,
    director: "Christopher Nolan",
    genre: ["Action", "Adventure", "Sci-Fi"],
    actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
  },
  {
    title: "Alexander",
    year: 2004,
    director: "Oliver Stone",
    genre: ["Drama", "Action", "Biography"],
    actors: ["Colin Farrell", "Angelina Jolie", "Val Kilmer"],
  },
  {
    title: "The Matrix",
    year: 1999,
    director: "Lana Wachowski, Lilly Wachowski",
    genre: ["Action", "Sci-Fi"],
    actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
  },
  {
    title: "Melancholia",
    year: 2011,
    director: "Lars von Trier",
    genre: ["Drama", "Sci-Fi"],
    actors: ["Kirsten Dunst", "Charlotte Gainsbourg", "Kiefer Sutherland"],
  },
  {
    title: "The Devil Wears Prada",
    year: 2006,
    director: "David Frankel",
    genre: ["Drama", "Comedy"],
    actors: ["Meryl Streep", "Anne Hathaway", "Emily Blunt"],
  },
  {
    title: "The Hundred-Foot Journey",
    year: 2014,
    director: "Lasse Hallström",
    genre: ["Drama", "Comedy"],
    actors: ["Helen Mirren", "Om Puri", "Manish Dayal"],
  },
  {
    title: "Woman in Gold",
    year: 2015,
    director: "Simon Curtis",
    genre: ["Drama", "Biography", "History"],
    actors: ["Helen Mirren", "Ryan Reynolds", "Daniel Brühl"],
  },
  {
    title: "Navalny",
    year: 2022,
    director: "Daniel Roher",
    genre: ["Documentary", "Biography"],
    actors: ["Alexei Navalny", "Yulia Navalnaya", "Dmitri Muratov"],
  },
  {
    title: "The House That Jack Built",
    year: 2018,
    director: "Lars von Trier",
    genre: ["Crime", "Drama", "Horror"],
    actors: ["Matt Dillon", "Bruno Ganz", "Uma Thurman"],
  },
  {
    title: "Dogville",
    year: 2003,
    director: "Lars von Trier",
    genre: ["Crime", "Drama"],
    actors: ["Nicole Kidman", "Paul Bettany", "Lauren Bacall"],
  },
  {
    title: "2001: A Space Odyssey",
    year: 1968,
    director: "Stanley Kubrick",
    genre: ["Adventure", "Sci-Fi"],
    actors: ["Keir Dullea", "Gary Lockwood", "William Sylvester"],
  },
  {
    title: "Four Rooms",
    year: 1995,
    director:
      "Allison Anders, Alexandre Rockwell, Robert Rodriguez, Quentin Tarantino",
    genre: ["Comedy"],
    actors: ["Tim Roth", "Antonio Banderas", "Jennifer Beals"],
  },
  {
    title: "Kill Bill Vol. 1",
    year: 2003,
    director: "Quentin Tarantino",
    genre: ["Action", "Crime", "Drama"],
    actors: ["Uma Thurman", "David Carradine", "Daryl Hannah"],
  },
  {
    title: "Kill Bill Vol. 2",
    year: 2004,
    director: "Quentin Tarantino",
    genre: ["Action", "Crime", "Drama"],
    actors: ["Uma Thurman", "David Carradine", "Michael Madsen"],
  },
  {
    title: "The Platform",
    year: 2019,
    director: "Galder Gaztelu-Urrutia",
    genre: ["Horror", "Sci-Fi", "Thriller"],
    actors: ["Ivan Massagué", "Zorion Eguileor", "Antonia San Juan"],
  },
  {
    title: "Vivarium",
    year: 2019,
    director: "Lorcan Finnegan",
    genre: ["Horror", "Mystery", "Sci-Fi"],
    actors: ["Imogen Poots", "Jesse Eisenberg", "Jonathan Aris"],
  },
  {
    title: "The Social Network",
    year: 2010,
    director: "David Fincher",
    genre: ["Biography", "Drama"],
    actors: ["Jesse Eisenberg", "Andrew Garfield", "Justin Timberlake"],
  },
  {
    title: "Avatar",
    year: 2009,
    director: "James Cameron",
    genre: ["Action", "Adventure", "Fantasy"],
    actors: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
  },
  {
    title: "The Messenger: The Story of Joan of Arc",
    year: 1999,
    director: "Luc Besson",
    genre: ["Adventure", "Biography", "Drama"],
    actors: ["Milla Jovovich", "John Malkovich", "Rab Affleck"],
  },
  {
    title: "Anna",
    year: 2019,
    director: "Luc Besson",
    genre: ["Action", "Thriller"],
    actors: ["Sasha Luss", "Helen Mirren", "Luke Evans"],
  },
  {
    title: "The Good Liar",
    year: 2019,
    director: "Bill Condon",
    genre: ["Crime", "Drama", "Mystery"],
    actors: ["Helen Mirren", "Ian McKellen", "Russell Tovey"],
  },
  {
    title: "The Debt",
    year: 2010,
    director: "John Madden",
    genre: ["Drama", "Thriller"],
    actors: ["Helen Mirren", "Sam Worthington", "Tom Wilkinson"],
  },
];

// Define the GET route for the / endpoint (homepage)
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My MDB</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            text-align: center;
            color: #333;
          }
          p {
            line-height: 1.6;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to My-Movie-DataBase</h1>
          <p>The art of film is relatively new, but it has given both the creators and spectators countless possibilities while creating those masterpieces, as well as fantastic experiences for the ones enjoying watching them.</p>
          <p>My Top Movies List includes just the movies I could recall right away. I hope you'd get a chance to watch some of them and enjoy them as much as I did.</p>
        </div>
      </body>
    </html>
  `);
});

// Define the GET route for the /movies endpoint
app.get("/movies", (req, res) => {
  res.json(movies);
});

// Catch-all route for handling non-existing routes
app.get("*", (req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Page Not Found</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
            text-align: center;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333;
          }
          p {
            line-height: 1.6;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>404 - Page Not Found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
        </div>
      </body>
    </html>
  `);
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error to the terminal
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
