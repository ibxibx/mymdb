const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");

// Use Morgan Middleware to log requests
app.use(morgan("dev"));

app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static("public"));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

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

// Genre data
const genres = [
  {
    genre: "Drama",
    description:
      "Drama Films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature. A dramatic film shows us human beings at their best, their worst, and everything in-between.",
  },
  {
    genre: "Action",
    description:
      "Action films are characterized by a resourceful hero struggling against incredible odds, which include life-threatening situations, an evil villain, or a pursuit which usually concludes in victory for the hero.",
  },
  {
    genre: "Adventure",
    description:
      "Adventure films are exciting stories, with new experiences or exotic locales. Adventure films are very similar to the action film genre, in that they are designed to provide an action-filled, energetic experience for the film viewer.",
  },
  {
    genre: "Comedy",
    description:
      "Comedy films are designed to elicit laughter from the audience. Comedies are light-hearted dramas, crafted to amuse, entertain, and provoke enjoyment.",
  },
  {
    genre: "Crime",
    description:
      "Crime films are a genre that revolves around the actions of a criminal mastermind, typically focusing on the criminal's perspective and exploring the repercussions of their illegal activities.",
  },
  {
    genre: "Biography",
    description:
      "Biography films are a sub-genre of dramas and epics and are based on the life stories of real people. They often explore their contributions to society, their personal lives, and their journey to prominence.",
  },
  {
    genre: "Documentary",
    description:
      "Documentary films are non-fictional motion pictures intended to document some aspect of reality, primarily for the purposes of instruction, education, or maintaining a historical record.",
  },
  {
    genre: "Fantasy",
    description:
      "Fantasy films involve magical and supernatural elements that do not exist in the real world. They often include mythical beings, magical events, and fantasy worlds.",
  },
  {
    genre: "Horror",
    description:
      "Horror films are designed to frighten and to invoke our hidden worst fears, often in a terrifying, shocking finale, while captivating and entertaining us at the same time in a cathartic experience.",
  },
  {
    genre: "Mystery",
    description:
      "Mystery films focus on the unsolved aspect of a crime or event, and the main character, whether a detective or amateur sleuth, must use their deductive reasoning to unravel the mystery.",
  },
  {
    genre: "Romance",
    description:
      "Romance films are love stories, or affairs of the heart that center on passion, emotion, and the romantic, affectionate involvement of the main characters.",
  },
  {
    genre: "Sci-Fi",
    description:
      "Sci-Fi films are often set in the future, in space, on other worlds, or in alternate dimensions, and involve scientific and technological advancements that have a significant impact on society or individuals.",
  },
  {
    genre: "Thriller",
    description:
      "Thriller films are designed to keep the audience on the edge of their seats, with suspense, excitement, and tension as the main components.",
  },
  {
    genre: "War",
    description:
      "War films depict the battles and stories of warriors and soldiers. They often explore the experiences and impacts of war, focusing on its horrors, its bravery, and its impact on society.",
  },
];

// Director data
const directors = [
  {
    name: "Sam Mendes",
    bio: "Sam Mendes was born in 1965 in Reading, England. He is known for directing films such as American Beauty and the James Bond films Skyfall and Spectre.",
    birthYear: 1965,
    birthPlace: "Reading, England",
    moviesCount: 10,
  },
  {
    name: "Christopher Nolan",
    bio: "Christopher Nolan, born in 1970 in London, England, is acclaimed for his cerebral, often non-linear storytelling. He directed The Dark Knight trilogy, Inception, and Interstellar.",
    birthYear: 1970,
    birthPlace: "London, England",
    moviesCount: 11,
  },
  {
    name: "Charles Chaplin",
    bio: "Charles Chaplin was born in 1889 in London, England. He is a legendary figure in the film industry, known for his work in silent films such as The Great Dictator and Modern Times.",
    birthYear: 1889,
    birthPlace: "London, England",
    moviesCount: 82,
  },
  {
    name: "Steven Spielberg",
    bio: "Steven Spielberg, born in 1946 in Cincinnati, Ohio, is one of the most influential filmmakers in history. His works include Jaws, E.T., and Schindler's List.",
    birthYear: 1946,
    birthPlace: "Cincinnati, Ohio, USA",
    moviesCount: 33,
  },
  {
    name: "Peter Jackson",
    bio: "Peter Jackson, born in 1961 in Wellington, New Zealand, is best known for directing The Lord of the Rings trilogy and The Hobbit trilogy.",
    birthYear: 1961,
    birthPlace: "Wellington, New Zealand",
    moviesCount: 20,
  },
  {
    name: "Robert Zemeckis",
    bio: "Robert Zemeckis, born in 1951 in Chicago, Illinois, is known for directing innovative and visually stunning films such as Back to the Future, Forrest Gump, and The Polar Express.",
    birthYear: 1951,
    birthPlace: "Chicago, Illinois, USA",
    moviesCount: 21,
  },
  {
    name: "Oliver Stone",
    bio: "Oliver Stone, born in 1946 in New York City, is a prolific director known for his controversial and political films such as Platoon, JFK, and Alexander.",
    birthYear: 1946,
    birthPlace: "New York City, USA",
    moviesCount: 20,
  },
  {
    name: "Lana Wachowski",
    bio: "Lana Wachowski, born in 1965 in Chicago, Illinois, is known for co-directing The Matrix trilogy with her sister Lilly Wachowski.",
    birthYear: 1965,
    birthPlace: "Chicago, Illinois, USA",
    moviesCount: 9,
  },
  {
    name: "Lilly Wachowski",
    bio: "Lilly Wachowski, born in 1967 in Chicago, Illinois, co-directed The Matrix trilogy and Cloud Atlas with her sister Lana Wachowski.",
    birthYear: 1967,
    birthPlace: "Chicago, Illinois, USA",
    moviesCount: 9,
  },
  {
    name: "Lars von Trier",
    bio: "Lars von Trier, born in 1956 in Copenhagen, Denmark, is known for his provocative and avant-garde films such as Melancholia, Dogville, and The House That Jack Built.",
    birthYear: 1956,
    birthPlace: "Copenhagen, Denmark",
    moviesCount: 14,
  },
  {
    name: "David Frankel",
    bio: "David Frankel, born in 1959 in New York City, is known for directing popular films like The Devil Wears Prada and Marley & Me.",
    birthYear: 1959,
    birthPlace: "New York City, USA",
    moviesCount: 8,
  },
  {
    name: "Lasse Hallström",
    bio: "Lasse Hallström, born in 1946 in Stockholm, Sweden, is known for directing films such as The Cider House Rules, Chocolat, and The Hundred-Foot Journey.",
    birthYear: 1946,
    birthPlace: "Stockholm, Sweden",
    moviesCount: 23,
  },
  {
    name: "Simon Curtis",
    bio: "Simon Curtis, born in 1960 in London, England, is a director and producer known for films like My Week with Marilyn and Woman in Gold.",
    birthYear: 1960,
    birthPlace: "London, England",
    moviesCount: 7,
  },
  {
    name: "Daniel Roher",
    bio: "Daniel Roher, born in 1990, is a Canadian filmmaker known for his work on the documentary film Navalny.",
    birthYear: 1990,
    birthPlace: "Canada",
    moviesCount: 5,
  },
  {
    name: "Stanley Kubrick",
    bio: "Stanley Kubrick, born in 1928 in New York City, was an influential director known for his innovative and diverse films such as 2001: A Space Odyssey and The Shining.",
    birthYear: 1928,
    birthPlace: "New York City, USA",
    moviesCount: 13,
  },
  {
    name: "Allison Anders",
    bio: "Allison Anders, born in 1954 in Ashland, Kentucky, is an independent filmmaker known for her films Gas Food Lodging and Mi Vida Loca.",
    birthYear: 1954,
    birthPlace: "Ashland, Kentucky, USA",
    moviesCount: 7,
  },
  {
    name: "Alexandre Rockwell",
    bio: "Alexandre Rockwell, born in 1956, is known for his independent films and his contribution to the anthology film Four Rooms.",
    birthYear: 1956,
    birthPlace: "Boston, Massachusetts, USA",
    moviesCount: 6,
  },
  {
    name: "Robert Rodriguez",
    bio: "Robert Rodriguez, born in 1968 in San Antonio, Texas, is known for directing films like Desperado, Sin City, and Spy Kids.",
    birthYear: 1968,
    birthPlace: "San Antonio, Texas, USA",
    moviesCount: 17,
  },
  {
    name: "Quentin Tarantino",
    bio: "Quentin Tarantino, born in 1963 in Knoxville, Tennessee, is known for his distinctive style and films such as Pulp Fiction, Kill Bill, and Once Upon a Time in Hollywood.",
    birthYear: 1963,
    birthPlace: "Knoxville, Tennessee, USA",
    moviesCount: 10,
  },
  {
    name: "Galder Gaztelu-Urrutia",
    bio: "Galder Gaztelu-Urrutia, born in 1974 in Bilbao, Spain, is a Spanish director known for his film The Platform.",
    birthYear: 1974,
    birthPlace: "Bilbao, Spain",
    moviesCount: 2,
  },
  {
    name: "Lorcan Finnegan",
    bio: "Lorcan Finnegan, born in 1979, is an Irish director known for his work on the films Vivarium and Without Name.",
    birthYear: 1979,
    birthPlace: "Ireland",
    moviesCount: 3,
  },
  {
    name: "David Fincher",
    bio: "David Fincher, born in 1962 in Denver, Colorado, is renowned for his psychological thrillers and dark, stylish films such as Fight Club, The Social Network, and Gone Girl.",
    birthYear: 1962,
    birthPlace: "Denver, Colorado, USA",
    moviesCount: 11,
  },
  {
    name: "James Cameron",
    bio: "James Cameron, born in 1954 in Kapuskasing, Ontario, is a Canadian filmmaker known for directing blockbuster films like Titanic, Avatar, and The Terminator series.",
    birthYear: 1954,
    birthPlace: "Kapuskasing, Ontario, Canada",
    moviesCount: 12,
  },
  {
    name: "Luc Besson",
    bio: "Luc Besson, born in 1959 in Paris, France, is a French director known for his stylish action films and dramas such as Léon: The Professional, The Fifth Element, and Lucy.",
    birthYear: 1959,
    birthPlace: "Paris, France",
    moviesCount: 18,
  },
  {
    name: "Bill Condon",
    bio: "Bill Condon, born in 1955 in New York City, is known for directing films such as Gods and Monsters, Dreamgirls, and The Twilight Saga: Breaking Dawn.",
    birthYear: 1955,
    birthPlace: "New York City, USA",
    moviesCount: 13,
  },
  {
    name: "John Madden",
    bio: "John Madden, born in 1949 in Portsmouth, England, is a director known for films like Shakespeare in Love, The Best Exotic Marigold Hotel, and The Debt.",
    birthYear: 1949,
    birthPlace: "Portsmouth, England",
    moviesCount: 12,
  },
];

// Users - Userid Generation with murmurhash
let users = [];

const murmurhash3js = require("murmurhash3js");

// Function to generate userId
function generateUserId(name, email) {
  const data = name + email;
  const userId = murmurhash3js.x86.hash32(data);
  return userId;
}

// Route to handle user registration
app.post("/users/register", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const userId = generateUserId(name, email);

  // Save the user data to the in-memory storage
  const user = { userId, name, email };
  users.push(user);

  res.status(201).json(user);
});

// Route to get all users
app.get("/users", (req, res) => {
  const userList = users.map((user) => ({
    userId: user.userId,
    name: user.name,
  }));
  res.json(userList);
});

// Example usage
const name = "John Doe";
const email = "jahndoe@email.com";
const userId = generateUserId(name, email);

console.log(`Generated userId for ${name} (${email}): ${userId}`);

// Function to add a new user (example)
function addUser(name, email) {
  const userId = generateUserId(name, email);
  // Here, you can add code to save the user to your database
  console.log(`New user added: ${name} (${email}), userId: ${userId}`);
}

// Example of adding a new user
addUser("John Doe", "jahndoe@email.com");

// Endpoints

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

app.get("/movies", (req, res) => {
  res.json(movies);
});

app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find(
    (m) => m.title.toLowerCase() === title.toLowerCase()
  );
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send("Movie not found");
  }
});

app.get("/genres", (req, res) => {
  res.json(genres);
});

app.get("/genres/:name", (req, res) => {
  const { name } = req.params;
  const genre = genres.find(
    (g) => g.genre.toLowerCase() === name.toLowerCase()
  );
  if (genre) {
    res.json(genre);
  } else {
    res.status(404).send("Genre not found");
  }
});

app.get("/directors", (req, res) => {
  res.json(directors);
});

app.get("/directors/:name", (req, res) => {
  const { name } = req.params;
  const director = directors.find(
    (d) => d.name.toLowerCase() === name.toLowerCase()
  );
  if (director) {
    res.json(director);
  } else {
    res.status(404).send("Director not found");
  }
});

// User management endpoints

// User, Register with Email and Username
app.post("/users/register", (req, res) => {
  const { email, username } = req.body;
  if (users.find((user) => user.email === email)) {
    return res.status(400).send("Email is already registered");
  }
  const newUser = { email, username, favorites: [] };
  users.push(newUser);
  res.status(201).json(newUser); //Return newly created User
});

//Update User's Information
app.put("/users/:email", (req, res) => {
  const { email } = req.params;
  const { username } = req.body;
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(404).send("User not found");
  }
  user.username = username;
  res.send("Username updated successfully");
});

//How to get all users
app.get("/users", (req, res) => {
  res.json(users); // Return all users
});

// User - Adding a Movie to Favourites
app.post("/users/:userId/movies/:title", (req, res) => {
  const { userId, title } = req.params;

  // Find the movie by title
  const movie = movies.find((m) => m.title === title);
  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  // Find the user by userId
  let user = users.find((u) => u.userId === userId);
  if (!user) {
    // If the user doesn't exist, create a new one
    user = { userId, favorites: [] };
    users.push(user);
  }

  // Add the movie to the user's list of favorites if not already added
  if (!user.favorites.includes(title)) {
    user.favorites.push(title);
    return res.status(200).json({ message: "Movie added to favorites" });
  } else {
    return res.status(400).json({ message: "Movie is already in favorites" });
  }
});

// User - Delete Movie from Favourites
app.delete("/users/:userId/movies/:title", (req, res) => {
  const { userId, title } = req.params;

  // Find the user by userId
  let user = users.find((u) => u.userId === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Remove the movie from the user's list of favorites if it exists
  const movieIndex = user.favorites.indexOf(title);
  if (movieIndex > -1) {
    user.favorites.splice(movieIndex, 1);
    return res.status(200).json({ message: "Movie removed from favorites" });
  } else {
    return res.status(400).json({ message: "Movie not in favorites" });
  }
});

// User - Deregister a User
app.delete("/users/:email", (req, res) => {
  const { email } = req.params;
  const index = users.findIndex((user) => user.email === email);
  if (index === -1) {
    return res.status(404).send("User not found");
  }
  users.splice(index, 1);
  res.send("User deregistered successfully");
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
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
