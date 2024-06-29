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
    image:
      "https://upload.wikimedia.org/wikipedia/en/a/a0/American_Beauty_poster.jpg",
    actors: ["Kevin Spacey", "Annette Bening", "Thora Birch"],
  },
  {
    title: "Interstellar",
    year: 2014,
    director: "Christopher Nolan",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
  },
  {
    title: "The Great Dictator",
    year: 1940,
    director: "Charles Chaplin",
    genre: ["Comedy", "Drama", "War"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/1/1c/Great_Dictator_Theatrical_Poster.jpg",
    actors: ["Charles Chaplin", "Paulette Goddard", "Jack Oakie"],
  },
  {
    title: "Schindler's List",
    year: 1993,
    director: "Steven Spielberg",
    genre: ["Biography", "Drama", "History"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/3/38/Schindler%27s_List_movie.jpg",
    actors: ["Liam Neeson", "Ralph Fiennes", "Ben Kingsley"],
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
    director: "Peter Jackson",
    genre: ["Adventure", "Drama", "Fantasy"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/9/9d/LOTR_-_The_Return_of_the_King.jpg",
    actors: ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"],
  },
  {
    title: "Forrest Gump",
    year: 1994,
    director: "Robert Zemeckis",
    genre: ["Drama", "Romance"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
    actors: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
  },
  {
    title: "Inception",
    year: 2010,
    director: "Christopher Nolan",
    genre: ["Action", "Adventure", "Sci-Fi"],
    image: "https://upload.wikimedia.org/wikipedia/en/7/7f/Inception_ver3.jpg",
    actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
  },
  {
    title: "Alexander",
    year: 2004,
    director: "Oliver Stone",
    genre: ["Drama", "Action", "Biography"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/2/20/Alexander_film_poster.jpg",
    actors: ["Colin Farrell", "Angelina Jolie", "Val Kilmer"],
  },
  {
    title: "The Matrix",
    year: 1999,
    director: "Lana Wachowski, Lilly Wachowski",
    genre: ["Action", "Sci-Fi"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
    actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
  },
  {
    title: "Melancholia",
    year: 2011,
    director: "Lars von Trier",
    genre: ["Drama", "Sci-Fi"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/0/03/Melancholia_Poster.jpg",
    actors: ["Kirsten Dunst", "Charlotte Gainsbourg", "Kiefer Sutherland"],
  },
  {
    title: "The Devil Wears Prada",
    year: 2006,
    director: "David Frankel",
    genre: ["Drama", "Comedy"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/a/a5/The_Devil_Wears_Prada.jpg",
    actors: ["Meryl Streep", "Anne Hathaway", "Emily Blunt"],
  },
  {
    title: "The Hundred-Foot Journey",
    year: 2014,
    director: "Lasse Hallström",
    genre: ["Drama", "Comedy"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/0/09/The_Hundred-Foot_Journey_%28film%29.jpg",
    actors: ["Helen Mirren", "Om Puri", "Manish Dayal"],
  },
  {
    title: "Woman in Gold",
    year: 2015,
    director: "Simon Curtis",
    genre: ["Drama", "Biography", "History"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/4/41/Woman_in_Gold_poster.jpg",
    actors: ["Helen Mirren", "Ryan Reynolds", "Daniel Brühl"],
  },
  {
    title: "Navalny",
    year: 2022,
    director: "Daniel Roher",
    genre: ["Documentary", "Biography"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/a/aa/Navalny_2022_film_poster.png",
    actors: ["Alexei Navalny", "Yulia Navalnaya", "Dmitri Muratov"],
  },
  {
    title: "The House That Jack Built",
    year: 2018,
    director: "Lars von Trier",
    genre: ["Crime", "Drama", "Horror"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/5/5c/The_House_That_Jack_Built_%28film%29.png",
    actors: ["Matt Dillon", "Bruno Ganz", "Uma Thurman"],
  },
  {
    title: "Dogville",
    year: 2003,
    director: "Lars von Trier",
    genre: ["Crime", "Drama"],
    image: "https://upload.wikimedia.org/wikipedia/en/b/bb/Dogville_poster.jpg",
    actors: ["Nicole Kidman", "Paul Bettany", "Lauren Bacall"],
  },
  {
    title: "2001: A Space Odyssey",
    year: 1968,
    director: "Stanley Kubrick",
    genre: ["Adventure", "Sci-Fi"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/1/11/2001_A_Space_Odyssey_%281968%29.png",
    actors: ["Keir Dullea", "Gary Lockwood", "William Sylvester"],
  },
  {
    title: "Four Rooms",
    year: 1995,
    director:
      "Allison Anders, Alexandre Rockwell, Robert Rodriguez, Quentin Tarantino",
    genre: ["Comedy"],
    image: "https://upload.wikimedia.org/wikipedia/en/f/f7/Four_rooms_ver1.jpg",
    actors: ["Tim Roth", "Antonio Banderas", "Jennifer Beals"],
  },
  {
    title: "Kill Bill Vol. 1",
    year: 2003,
    director: "Quentin Tarantino",
    genre: ["Action", "Crime", "Drama"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/c/cf/Kill_Bill_Volume_1.png",
    actors: ["Uma Thurman", "David Carradine", "Daryl Hannah"],
  },
  {
    title: "Kill Bill Vol. 2",
    year: 2004,
    director: "Quentin Tarantino",
    genre: ["Action", "Crime", "Drama"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/4/4c/Kill_Bill_Volume_2.png",
    actors: ["Uma Thurman", "David Carradine", "Michael Madsen"],
  },
  {
    title: "The Platform",
    year: 2019,
    director: "Galder Gaztelu-Urrutia",
    genre: ["Horror", "Sci-Fi", "Thriller"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/6/69/The_Platform_poster.jpg",
    actors: ["Ivan Massagué", "Zorion Eguileor", "Antonia San Juan"],
  },
  {
    title: "Vivarium",
    year: 2019,
    director: "Lorcan Finnegan",
    genre: ["Horror", "Mystery", "Sci-Fi"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/1/1e/Vivarium_film_poster.jpg",
    actors: ["Imogen Poots", "Jesse Eisenberg", "Jonathan Aris"],
  },
  {
    title: "The Social Network",
    year: 2010,
    director: "David Fincher",
    genre: ["Biography", "Drama"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/7/7a/Social_network_film_poster.jpg",
    actors: ["Jesse Eisenberg", "Andrew Garfield", "Justin Timberlake"],
  },
  {
    title: "Avatar",
    year: 2009,
    director: "James Cameron",
    genre: ["Action", "Adventure", "Fantasy"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/b/b0/Avatar-Teaser-Poster.jpg",
    actors: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
  },
  {
    title: "The Messenger: The Story of Joan of Arc",
    year: 1999,
    director: "Luc Besson",
    genre: ["Adventure", "Biography", "Drama"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/6/61/The_Messenger_poster.jpg",
    actors: ["Milla Jovovich", "John Malkovich", "Rab Affleck"],
  },
  {
    title: "Anna",
    year: 2019,
    director: "Luc Besson",
    genre: ["Action", "Thriller"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/9/97/Anna_2019_poster.jpg",
    actors: ["Sasha Luss", "Helen Mirren", "Luke Evans"],
  },
  {
    title: "The Good Liar",
    year: 2019,
    director: "Bill Condon",
    genre: ["Crime", "Drama", "Mystery"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/f/f6/The_Good_Liar_poster.png",
    actors: ["Helen Mirren", "Ian McKellen", "Russell Tovey"],
  },
  {
    title: "The Debt",
    year: 2010,
    director: "John Madden",
    genre: ["Drama", "Thriller"],
    image: "https://upload.wikimedia.org/wikipedia/en/5/5c/The_Debt_Poster.jpg",
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

// Define the GET route for the /movies/:title endpoint
app.get("/movies/:title", (req, res) => {
  const movie = movies.find(
    (m) => m.title.toLowerCase() === req.params.title.toLowerCase()
  );
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send("Movie not found");
  }
});

// Define the GET route for the /genre/:genre endpoint
app.get("/genre/:genre", (req, res) => {
  const genreMovies = movies.filter((m) =>
    m.genre.map((g) => g.toLowerCase()).includes(req.params.genre.toLowerCase())
  );
  if (genreMovies.length > 0) {
    res.json(
      genreMovies.map((m) => ({
        title: m.title,
        description: m.genre,
        director: m.director,
        imageURL: m.image,
        featured: m.featured || false,
      }))
    );
  } else {
    res.status(404).send("Genre not found");
  }
});

// Define the GET route for the /director/:name endpoint
app.get("/director/:name", (req, res) => {
  const directorMovies = movies.filter(
    (m) => m.director.toLowerCase() === req.params.name.toLowerCase()
  );
  if (directorMovies.length > 0) {
    res.json(
      directorMovies.map((m) => ({
        title: m.title,
        bio: "Biography not available",
        birthYear: "N/A",
        deathYear: "N/A",
      }))
    );
  } else {
    res.status(404).send("Director not found");
  }
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
