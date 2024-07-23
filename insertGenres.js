const mongoose = require("mongoose");
const { Genre } = require("./models");

const mongoURI = "mongodb://localhost:27017/test";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

async function insertGenres() {
  try {
    for (let genre of genres) {
      await Genre.create({
        Name: genre.genre,
        Description: genre.description,
      });
      console.log(`Inserted genre: ${genre.genre}`);
    }
    console.log("All genres have been inserted.");
  } catch (error) {
    console.error("Error inserting genres:", error);
  } finally {
    mongoose.disconnect();
  }
}

insertGenres();
