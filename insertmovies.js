const mongoose = require('mongoose');
const { Movie, Genre, Director } = require('./models');  // Adjust the path if necessary

// Your MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/test';  // Replace with your actual database name

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const movies = [{
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

async function insertMovies() {
  try {
    console.log(`Attempting to insert ${movies.length} movies`);
    for (let movie of movies) {
      console.log(`Processing movie: ${movie.title}`);
      
      // Find the corresponding genre
      let genreDoc = await Genre.findOne({ Name: Array.isArray(movie.genre) ? movie.genre[0] : movie.genre });
      if (!genreDoc) {
        console.log(`Genre not found for ${movie.title}, skipping...`);
        continue;
      }

      // Find the corresponding director
      let directorDoc = await Director.findOne({ Name: movie.director });
      if (!directorDoc) {
        console.log(`Director not found for ${movie.title}, skipping...`);
        continue;
      }

      const newMovie = new Movie({
        Title: movie.title,
        Description: `A ${movie.year} ${Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre} film directed by ${movie.director}.`,
        GenreId: genreDoc._id,
        DirectorId: directorDoc._id,
        ImagePath: movie.image,
        Featured: false,  // You can set this as needed
        Actors: movie.actors,
      });

      console.log(`Saving movie: ${movie.title}`);
      await newMovie.save();
      console.log(`Successfully inserted: ${movie.title}`);
    }
    console.log('All movies have been inserted.');
  } catch (error) {
    console.error('Error inserting movies:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

insertMovies();


