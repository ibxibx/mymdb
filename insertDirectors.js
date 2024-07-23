const mongoose = require("mongoose");
const { Director } = require("./models");

const mongoURI = "mongodb://localhost:27017/test";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const directors = [
  {
    name: "Sam Mendes",
    bio: "Sam Mendes was born in 1965 in Reading, England. He is known for directing films such as American Beauty and the James Bond films Skyfall and Spectre.",
    birth: new Date("1965-08-01"),
    death: null,
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

async function insertDirectors() {
  try {
    for (let director of directors) {
      await Director.create({
        Name: director.name,
        Bio: director.bio,
        Birth: director.birth,
        Death: director.death,
      });
      console.log(`Inserted director: ${director.name}`);
    }
    console.log("All directors have been inserted.");
  } catch (error) {
    console.error("Error inserting directors:", error);
  } finally {
    mongoose.disconnect();
  }
}

insertDirectors();
